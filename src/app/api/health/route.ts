import { NextResponse } from "next/server";
import { Resend } from "resend";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  // If key is missing or is the placeholder, we can't check Resend
  if (!key || key === "re_your_api_key_here") return null;
  return new Resend(key);
}

function getAudienceId(): string | null {
  const id = process.env.RESEND_AUDIENCE_ID;
  if (!id || id === "your_audience_id_here") return null;
  return id;
}

/* -------------------------------------------------------------------------- */
/*  GET /api/health — check system status                                      */
/* -------------------------------------------------------------------------- */

export async function GET() {
  const status = {
    status: "ok",
    env: process.env.NODE_ENV,
    checks: {
      resend_api: false,
      resend_audience: false,
    },
    timestamp: new Date().toISOString(),
  };

  try {
    const resend = getResend();
    const audienceId = getAudienceId();

    // Check 1: Is Resend configured?
    if (resend) {
      status.checks.resend_api = true;
      
      // Check 2: Can we actually talk to Resend and see the audience?
      // We try to list the specific audience. If it fails, creds are bad.
      if (audienceId) {
        try {
          // Attempt to fetch the specific audience details (lightweight call)
          const result = await resend.audiences.get(audienceId);
          
          if (result.error) {
            console.error("Health check failed: Resend audience error", result.error);
            status.status = "degraded"; // We are up, but email is broken
            status.checks.resend_audience = false;
          } else {
            status.checks.resend_audience = true;
          }
        } catch (e) {
          console.error("Health check failed: Resend exception", e);
          status.status = "degraded";
          status.checks.resend_audience = false;
        }
      } else {
        // Audience ID missing in ENV
        status.status = "degraded";
        status.checks.resend_audience = false;
      }
    } else {
      // API Key missing in ENV
      status.status = "degraded";
      status.checks.resend_api = false;
    }

    // Determine final HTTP status
    const httpStatus = status.status === "ok" ? 200 : 503;

    return NextResponse.json(status, { status: httpStatus });

  } catch (error) {
    console.error("Health check critical failure:", error);
    return NextResponse.json(
      { 
        status: "error", 
        message: "Internal Healthcheck Error", 
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}