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

type WaitlistEventValue = string | number | boolean | null;
type WaitlistEventData = Record<string, WaitlistEventValue>;

const WAITLIST_COUNT_TTL_MS = 10 * 60 * 1000;

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

  // Some SDK responses nest the payload under `data`.
  if (record.data && record.data !== data) {
    return extractAudienceContactCount(record.data);
  }

  return null;
}

async function getUniqueWaitlistCountFromResend(
  resend: Resend,
  audienceId: string,
): Promise<number> {
  try {
    const audience = await resend.audiences.get(audienceId);
    const audienceCount = extractAudienceContactCount(audience.data);
    if (typeof audienceCount === "number") return audienceCount;
  } catch (error) {
    console.error("Resend audience count fallback to pagination:", error);
  }

  const seen = new Set<string>();
  let after: string | undefined;
  let hasMore = true;
  let pageGuard = 0;

  while (hasMore && pageGuard < 50) {
    pageGuard += 1;
    const page = await resend.contacts.list({
      audienceId,
      limit: 100,
      ...(after ? { after } : {}),
    });

    if (page.error) {
      throw page.error;
    }

    const rows = page.data?.data ?? [];
    for (const row of rows) {
      const key =
        typeof row.email === "string" && row.email.length > 0
          ? row.email.toLowerCase()
          : row.id;
      if (key) seen.add(key);
    }

    hasMore = page.data?.has_more === true;
    const last = rows[rows.length - 1];
    after = typeof last?.id === "string" ? last.id : undefined;

    // Avoid infinite loop if Resend returns has_more without a usable cursor.
    if (hasMore && !after) break;
  }

  return seen.size;
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

function bumpCachedWaitlistCount(): void {
  if (!waitlistCountCache) return;
  waitlistCountCache = {
    count: waitlistCountCache.count + 1,
    updatedAt: Date.now(),
  };
}

async function getWaitlistCountWithCache(
  resend: Resend,
  audienceId: string,
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
    const fresh = await getUniqueWaitlistCountFromResend(resend, audienceId);
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

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

function sanitizePlacement(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (!ALLOWED_PLACEMENTS.has(normalized)) return null;
  return normalized;
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
    const email =
      typeof payload.email === "string"
        ? payload.email.trim().toLowerCase()
        : null;

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

    /* ---- Resend: create contact ---- */
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

    let isNewContact = true;

    const contactResult = await resend.contacts.create({
      email,
      audienceId,
    });

    if (contactResult.error) {
      // Treat "already exists" as success — user is already signed up
      const msg = contactResult.error.message?.toLowerCase() ?? "";
      if (msg.includes("already") || msg.includes("exists") || msg.includes("duplicate")) {
        isNewContact = false;
      } else {
        console.error("Resend contact creation error:", contactResult.error);
        void trackWaitlistSignup("resend_contact_error", eventData);
        return NextResponse.json(
          { error: "Something went wrong. Please try again.", code: "signup_failed" },
          { status: 500 },
        );
      }
    }

    /* ---- Send welcome email (only for new contacts) ---- */
    if (isNewContact) {
      bumpCachedWaitlistCount();

      const emailResult = await resend.emails.send({
        from: `Inertia <${getFromEmail()}>`,
        to: email,
        subject: WELCOME_EMAIL_SUBJECT,
        html: getWelcomeEmailHtml(email),
      });

      if (emailResult.error) {
        // Log but don't fail — the contact was created, that's what matters
        console.error("Welcome email send error:", emailResult.error);
      }
    }

    void trackWaitlistSignup(
      isNewContact ? "success_new" : "success_existing",
      eventData,
    );

    return NextResponse.json({
      success: true,
      contactStatus: isNewContact ? "new" : "existing",
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

    if (!resend || !audienceId) {
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
