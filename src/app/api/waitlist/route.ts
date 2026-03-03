import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { track } from "@vercel/analytics/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import {
  getWelcomeEmailHtml,
  getWelcomeEmailText,
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
const WAITLIST_EMAIL_RATE_LIMIT = {
  limit: 3,
  windowMs: 60 * 60 * 1000,
};
const WAITLIST_GLOBAL_RATE_LIMIT = {
  limit: 500,
  windowMs: 10 * 60 * 1000,
};

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

function getReplyToEmail(): string {
  return process.env.RESEND_REPLY_TO_EMAIL ?? process.env.RESEND_FROM_EMAIL ?? "hello@getinertia.app";
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

function getHashedRateLimitKey(value: string): string {
  return createHash("sha256").update(value).digest("hex");
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

function errorResponse(
  error: string,
  code: string,
  status: number,
): NextResponse {
  return NextResponse.json({ error, code }, { status });
}

function serverErrorResponse(): NextResponse {
  return errorResponse(
    "Something went wrong. Please try again.",
    "server_error",
    500,
  );
}

function rateLimitedResponse(): NextResponse {
  return errorResponse(
    "Too many requests. Please try again later.",
    "rate_limited",
    429,
  );
}

function serviceUnavailableResponse(): NextResponse {
  return errorResponse(
    "Something went wrong. Please try again.",
    "server_error",
    503,
  );
}

/**
 * Check a rate limiter result and return an error response if blocked,
 * or null if the request should proceed.
 */
function checkRateLimit(
  result: { success: boolean; reason?: string },
  eventData: WaitlistEventData,
): NextResponse | null {
  if (result.success) return null;

  if (result.reason === "unavailable") {
    void trackWaitlistSignup("rate_limit_unavailable", eventData);
    return serviceUnavailableResponse();
  }

  void trackWaitlistSignup("rate_limited", eventData);
  return rateLimitedResponse();
}

type ParsedRequest = {
  email: string;
  eventData: WaitlistEventData;
  placement: string | null;
};

async function parseAndValidateRequest(
  request: NextRequest,
): Promise<{ parsed: ParsedRequest } | { error: NextResponse }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    void trackWaitlistSignup("invalid_json", { source: "direct" });
    return {
      error: errorResponse("Invalid request body", "invalid_json", 400),
    };
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
    return {
      error: errorResponse("Email is required", "missing_email", 400),
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    void trackWaitlistSignup("invalid_email", eventData);
    return {
      error: errorResponse(
        "Please enter a valid email address",
        "invalid_email",
        400,
      ),
    };
  }

  return { parsed: { email, eventData, placement } };
}

async function upsertContactAndSendWelcome(
  resend: Resend,
  audienceId: string,
  email: string,
  eventData: WaitlistEventData,
): Promise<
  | { audienceSynced: boolean; isNewSignup: boolean }
  | { error: NextResponse }
> {
  let audienceSynced = false;
  let isNewSignup = true;

  const contactResult = await retryResendRateLimitedCall(
    "Resend contact upsert",
    () => resend.contacts.create({ email, audienceId }),
  );

  if (contactResult.error) {
    const msg = String(contactResult.error.message ?? "").toLowerCase();
    const duplicate =
      msg.includes("already") ||
      msg.includes("exists") ||
      msg.includes("duplicate");

    if (duplicate) {
      audienceSynced = true;
      isNewSignup = false;
    } else {
      console.error(
        "Contact upsert error (continuing to send email):",
        contactResult.error,
      );
    }
  } else {
    audienceSynced = true;
  }

  if (isNewSignup) {
    const unsubscribeAddress = getReplyToEmail();
    const emailResult = await retryResendRateLimitedCall(
      "Resend welcome email",
      () =>
        resend.emails.send({
          from: `Inertia <${getFromEmail()}>`,
          to: email,
          replyTo: unsubscribeAddress,
          subject: WELCOME_EMAIL_SUBJECT,
          html: getWelcomeEmailHtml(),
          text: getWelcomeEmailText(),
          headers: {
            "List-Unsubscribe": `<mailto:${unsubscribeAddress}?subject=unsubscribe>`,
          },
        }),
    );

    if (emailResult.error) {
      console.error("Welcome email send error:", emailResult.error);
      void trackWaitlistSignup("resend_email_error", eventData);
      return {
        error: errorResponse(
          "Something went wrong. Please try again.",
          "signup_failed",
          500,
        ),
      };
    }
  }

  return { audienceSynced, isNewSignup };
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
    /* ---- Parse & validate ---- */
    const parseResult = await parseAndValidateRequest(request);
    if ("error" in parseResult) return parseResult.error;
    const { email, eventData } = parseResult.parsed;

    /* ---- Rate limit by email + global traffic ---- */
    const emailLimiter = await rateLimit({
      key: `waitlist:signup:email:${getHashedRateLimitKey(email)}`,
      ...WAITLIST_EMAIL_RATE_LIMIT,
    });
    const emailBlock = checkRateLimit(emailLimiter, eventData);
    if (emailBlock) return emailBlock;

    const globalLimiter = await rateLimit({
      key: "waitlist:signup:global",
      ...WAITLIST_GLOBAL_RATE_LIMIT,
    });
    const globalBlock = checkRateLimit(globalLimiter, eventData);
    if (globalBlock) return globalBlock;

    /* ---- Resend: audience upsert + welcome email ---- */
    const resend = getResend();
    const audienceId = getAudienceId();

    if (!resend || !audienceId) {
      console.error("Resend not configured: missing API key or audience ID");
      void trackWaitlistSignup("resend_not_configured", eventData);
      return serverErrorResponse();
    }

    const signupResult = await upsertContactAndSendWelcome(
      resend,
      audienceId,
      email,
      eventData,
    );
    if ("error" in signupResult) return signupResult.error;

    invalidateCachedWaitlistCount();

    void trackWaitlistSignup("success", {
      ...eventData,
      audience_synced: signupResult.audienceSynced,
      was_new_signup: signupResult.isNewSignup,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    void trackWaitlistSignup("unexpected_error", { source: "direct" });
    return serverErrorResponse();
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
