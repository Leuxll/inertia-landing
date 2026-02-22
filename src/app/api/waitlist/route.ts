import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import {
  getWelcomeEmailHtml,
  WELCOME_EMAIL_SUBJECT,
} from "@/lib/email/welcome-template";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const email =
      typeof body === "object" &&
      body !== null &&
      "email" in body &&
      typeof (body as Record<string, unknown>).email === "string"
        ? ((body as Record<string, unknown>).email as string).trim().toLowerCase()
        : null;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    /* ---- Validate format ---- */
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    /* ---- Rate limit by IP ---- */
    const ip = getClientIp(request);
    const limiter = rateLimit({ key: ip, limit: 3, windowMs: 3_600_000 });

    if (!limiter.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    /* ---- Resend: create contact ---- */
    const resend = getResend();
    const audienceId = getAudienceId();

    if (!resend || !audienceId) {
      console.error("Resend not configured: missing API key or audience ID");
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
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
        return NextResponse.json(
          { error: "Something went wrong. Please try again." },
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
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
