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

    const result = await resend.contacts.list({ audienceId });
    const count = result.data?.data?.length ?? 0;

    return NextResponse.json(
      { count },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
        },
      },
    );
  } catch (error) {
    console.error("Waitlist GET error:", error);
    return NextResponse.json({ count: 0 });
  }
}
