import { NextResponse } from "next/server";

/* -------------------------------------------------------------------------- */
/*  GET /api/health — check system status                                      */
/* -------------------------------------------------------------------------- */

export async function GET() {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;

    const hasResendApiKey =
      Boolean(resendApiKey) && resendApiKey !== "re_your_api_key_here";
    const hasResendFromEmail = Boolean(resendFromEmail);

    const status = {
      status: hasResendApiKey && hasResendFromEmail ? "ok" : "degraded",
      env: process.env.NODE_ENV,
      checks: {
        resend_api: hasResendApiKey,
        resend_from_email: hasResendFromEmail,
      },
      timestamp: new Date().toISOString(),
    };

    const httpStatus = status.status === "ok" ? 200 : 503;
    return NextResponse.json(status, { status: httpStatus });
  } catch (error) {
    console.error("Health check critical failure:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal Healthcheck Error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
