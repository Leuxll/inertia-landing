import { NextRequest, NextResponse } from "next/server";
import { track } from "@vercel/analytics/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import {
  getWelcomeEmailHtml,
  WELCOME_EMAIL_SUBJECT,
} from "@/lib/email/welcome-template";
import {
  getWaitlistAttributionEventData,
  sanitizeWaitlistAttribution,
} from "@/lib/waitlist-attribution";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WAITLIST_EVENT_NAME = "waitlist_signup";
const ALLOWED_PLACEMENTS = new Set(["hero", "bottom"]);
const WAITLIST_COUNT_TTL_MS = 10 * 60 * 1000;
const WAITLIST_COUNT_PAGE_LIMIT = 50;
const WAITLIST_COUNT_PAGE_SIZE = 100;

type WaitlistEventValue = string | number | boolean | null;
type WaitlistEventData = Record<string, WaitlistEventValue>;

type ResendOperationResult = {
  error?: unknown;
};

let waitlistCountCache:
  | {
      count: number;
      updatedAt: number;
    }
  | null = null;
let waitlistCountInflight: Promise<number> | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "re_your_api_key_here") return null;
  return new Resend(key);
}

function getAudienceId(): string | null {
  const id = process.env.RESEND_AUDIENCE_ID;
  if (!id || id === "your_audience_id_here") return null;
  return id;
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function sanitizePlacement(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (!ALLOWED_PLACEMENTS.has(normalized)) return null;
  return normalized;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

function isRateLimitedResendError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const record = error as Record<string, unknown>;
  const name = String(record.name ?? "").toLowerCase();
  const message = String(record.message ?? "").toLowerCase();
  const statusCode = Number(record.statusCode ?? 0);

  return (
    statusCode === 429 ||
    name.includes("rate_limit") ||
    message.includes("too many requests")
  );
}

function getRateLimitBackoffMs(attempt: number): number {
  const base = 300 * Math.pow(2, attempt);
  const jitter = Math.floor(Math.random() * 120);
  return Math.min(base + jitter, 2_500);
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryResendRateLimitedCall<T extends ResendOperationResult>(
  label: string,
  operation: () => Promise<T>,
  maxRetries = 3,
): Promise<T> {
  let attempt = 0;

  while (true) {
    const result = await operation();
    if (!isRateLimitedResendError(result.error) || attempt >= maxRetries) {
      return result;
    }

    const waitMs = getRateLimitBackoffMs(attempt);
    console.warn(
      `${label} rate limited. Retrying in ${waitMs}ms (attempt ${attempt + 1}/${maxRetries + 1})`,
    );
    await sleep(waitMs);
    attempt += 1;
  }
}

function getCachedWaitlistCount(): number | null {
  if (!waitlistCountCache) return null;
  const age = Date.now() - waitlistCountCache.updatedAt;
  if (age > WAITLIST_COUNT_TTL_MS) return null;
  return waitlistCountCache.count;
}

function setCachedWaitlistCount(count: number): void {
  waitlistCountCache = {
    count,
    updatedAt: Date.now(),
  };
}

function invalidateCachedWaitlistCount(): void {
  waitlistCountCache = null;
}

async function trackWaitlistSignup(
  outcome: string,
  data: WaitlistEventData,
): Promise<void> {
  try {
    await track(WAITLIST_EVENT_NAME, { outcome, ...data });
  } catch (error) {
    console.error("Waitlist analytics track error:", error);
  }
}

function extractAudienceContactCount(data: unknown): number | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;

  const directCandidates = [
    record.count,
    record.contacts_count,
    record.contact_count,
    record.total_contacts,
    record.total,
  ];

  for (const candidate of directCandidates) {
    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      return candidate;
    }
  }

  if (record.data && record.data !== data) {
    return extractAudienceContactCount(record.data);
  }

  return null;
}

async function getUniqueWaitlistCountFromAudience(
  resend: Resend,
  audienceId: string,
): Promise<number> {
  try {
    const audience = await retryResendRateLimitedCall("Resend audience get", () =>
      resend.audiences.get(audienceId),
    );
    const audienceCount = extractAudienceContactCount(audience.data);
    if (typeof audienceCount === "number") return audienceCount;
  } catch (error) {
    console.error("Resend audience count fallback to contacts pagination:", error);
  }

  const seen = new Set<string>();
  let after: string | undefined;
  let hasMore = true;
  let pageGuard = 0;

  while (hasMore && pageGuard < WAITLIST_COUNT_PAGE_LIMIT) {
    pageGuard += 1;

    const page = await retryResendRateLimitedCall("Resend contact list", () =>
      resend.contacts.list({
        audienceId,
        limit: WAITLIST_COUNT_PAGE_SIZE,
        ...(after ? { after } : {}),
      }),
    );

    if (page.error) {
      throw page.error;
    }

    const rows = page.data?.data ?? [];
    for (const row of rows) {
      const key =
        typeof row.email === "string" && row.email.length > 0
          ? normalizeEmail(row.email)
          : row.id;
      if (key) seen.add(key);
    }

    hasMore = page.data?.has_more === true;
    const last = rows[rows.length - 1];
    after = typeof last?.id === "string" ? last.id : undefined;

    if (hasMore && !after) break;
  }

  return seen.size;
}

async function getUniqueWaitlistCountFromEmailHistory(
  resend: Resend,
): Promise<number> {
  const seen = new Set<string>();
  let after: string | undefined;
  let hasMore = true;
  let pageGuard = 0;

  while (hasMore && pageGuard < WAITLIST_COUNT_PAGE_LIMIT) {
    pageGuard += 1;

    const page = await retryResendRateLimitedCall("Resend email list", () =>
      resend.emails.list({
        limit: WAITLIST_COUNT_PAGE_SIZE,
        ...(after ? { after } : {}),
      }),
    );

    if (page.error) {
      throw page.error;
    }

    const rows = page.data?.data ?? [];
    for (const row of rows) {
      if (row.subject !== WELCOME_EMAIL_SUBJECT) continue;
      for (const recipient of row.to ?? []) {
        if (typeof recipient === "string" && recipient.length > 0) {
          seen.add(normalizeEmail(recipient));
        }
      }
    }

    hasMore = page.data?.has_more === true;
    const last = rows[rows.length - 1];
    after = typeof last?.id === "string" ? last.id : undefined;

    // Avoid infinite loop if API returns has_more without a usable cursor.
    if (hasMore && !after) break;
  }

  return seen.size;
}

async function getWaitlistCountWithCache(
  resend: Resend,
  audienceId: string | null,
): Promise<number> {
  const cached = getCachedWaitlistCount();
  if (cached !== null) return cached;

  if (waitlistCountInflight) {
    try {
      return await waitlistCountInflight;
    } catch {
      const stale = waitlistCountCache?.count ?? null;
      if (stale !== null) return stale;
      throw new Error("waitlist_count_refresh_failed");
    }
  }

  waitlistCountInflight = (async () => {
    const fresh = audienceId
      ? await getUniqueWaitlistCountFromAudience(resend, audienceId)
      : await getUniqueWaitlistCountFromEmailHistory(resend);
    setCachedWaitlistCount(fresh);
    return fresh;
  })();

  try {
    return await waitlistCountInflight;
  } catch (error) {
    const stale = waitlistCountCache?.count ?? null;
    if (stale !== null) return stale;
    throw error;
  } finally {
    waitlistCountInflight = null;
  }
}

/* -------------------------------------------------------------------------- */
/*  POST /api/waitlist — signup handler                                        */
/* -------------------------------------------------------------------------- */

export async function POST(request: NextRequest) {
  try {
    /* ---- Parse body ---- */
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      void trackWaitlistSignup("invalid_json", {
        source: "direct",
      });
      return NextResponse.json(
        { error: "Invalid request body", code: "invalid_json" },
        { status: 400 },
      );
    }

    const payload =
      typeof body === "object" && body !== null
        ? (body as Record<string, unknown>)
        : {};
    const attribution = sanitizeWaitlistAttribution(payload.attribution);
    const placement = sanitizePlacement(payload.placement);
    const eventData: WaitlistEventData = {
      ...getWaitlistAttributionEventData(attribution),
      placement,
    };

    const rawEmail =
      typeof payload.email === "string" ? payload.email : null;
    const email = rawEmail ? normalizeEmail(rawEmail) : null;

    if (!email) {
      void trackWaitlistSignup("missing_email", eventData);
      return NextResponse.json(
        { error: "Email is required", code: "missing_email" },
        { status: 400 },
      );
    }

    /* ---- Validate format ---- */
    if (!EMAIL_REGEX.test(email)) {
      void trackWaitlistSignup("invalid_email", eventData);
      return NextResponse.json(
        { error: "Please enter a valid email address", code: "invalid_email" },
        { status: 400 },
      );
    }

    /* ---- Rate limit by IP ---- */
    const ip = getClientIp(request);
    const limiter = rateLimit({ key: ip, limit: 3, windowMs: 3_600_000 });

    if (!limiter.success) {
      void trackWaitlistSignup("rate_limited", eventData);
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          code: "rate_limited",
        },
        { status: 429 },
      );
    }

    /* ---- Resend: audience upsert + welcome email ---- */
    const resend = getResend();
    const audienceId = getAudienceId();

    if (!resend || !audienceId) {
      console.error("Resend not configured: missing API key or audience ID");
      void trackWaitlistSignup("resend_not_configured", eventData);
      return NextResponse.json(
        { error: "Something went wrong. Please try again.", code: "server_error" },
        { status: 500 },
      );
    }

    let audienceSynced = false;

    const contactResult = await retryResendRateLimitedCall(
      "Resend contact upsert",
      () =>
        resend.contacts.create({
          email,
          audienceId,
        }),
    );

    if (contactResult.error) {
      const msg = String(contactResult.error.message ?? "").toLowerCase();
      const duplicate =
        msg.includes("already") || msg.includes("exists") || msg.includes("duplicate");

      if (duplicate) {
        audienceSynced = true;
      } else {
        console.error("Contact upsert error (continuing to send email):", contactResult.error);
      }
    } else {
      audienceSynced = true;
    }

    const emailResult = await retryResendRateLimitedCall(
      "Resend welcome email",
      () =>
        resend.emails.send({
          from: `Inertia <${getFromEmail()}>`,
          to: email,
          subject: WELCOME_EMAIL_SUBJECT,
          html: getWelcomeEmailHtml(email),
        }),
    );

    if (emailResult.error) {
      console.error("Welcome email send error:", emailResult.error);
      void trackWaitlistSignup("resend_email_error", eventData);
      return NextResponse.json(
        { error: "Something went wrong. Please try again.", code: "signup_failed" },
        { status: 500 },
      );
    }

    invalidateCachedWaitlistCount();

    void trackWaitlistSignup("success_sent", {
      ...eventData,
      audience_synced: audienceSynced,
    });

    return NextResponse.json({
      success: true,
      contactStatus: "sent",
      audienceSynced,
    });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    void trackWaitlistSignup("unexpected_error", {
      source: "direct",
    });
    return NextResponse.json(
      { error: "Something went wrong. Please try again.", code: "server_error" },
      { status: 500 },
    );
  }
}

/* -------------------------------------------------------------------------- */
/*  GET /api/waitlist — waitlist count                                         */
/* -------------------------------------------------------------------------- */

export async function GET() {
  try {
    const resend = getResend();
    const audienceId = getAudienceId();

    if (!resend) {
      return NextResponse.json({ count: 0 });
    }

    const count = await getWaitlistCountWithCache(resend, audienceId);

    return NextResponse.json(
      { count },
      {
        headers: {
          "Cache-Control": "s-maxage=600, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("Waitlist GET error:", error);
    return NextResponse.json({ count: 0 });
  }
}
