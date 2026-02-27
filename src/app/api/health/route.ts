import { NextRequest, NextResponse } from "next/server";

/* -------------------------------------------------------------------------- */
/*  GET /api/health — check system status                                      */
/* -------------------------------------------------------------------------- */

function isAuthorizedHealthRequest(request: NextRequest): boolean {
  const token = process.env.HEALTHCHECK_TOKEN;
  if (!token) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("x-healthcheck-token") === token;
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedHealthRequest(request)) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;

    const hasResendApiKey =
      Boolean(resendApiKey) && resendApiKey !== "re_your_api_key_here";
    const hasResendFromEmail = Boolean(resendFromEmail);

    const isHealthy = hasResendApiKey && hasResendFromEmail;
    return NextResponse.json(
      {
        status: isHealthy ? "ok" : "degraded",
        timestamp: new Date().toISOString(),
      },
      { status: isHealthy ? 200 : 503 },
    );
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
