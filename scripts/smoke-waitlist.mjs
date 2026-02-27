#!/usr/bin/env node

import { spawn } from "node:child_process";

const port = Number(process.env.WAITLIST_SMOKE_PORT ?? 4010);
const smokeEmail = process.env.WAITLIST_SMOKE_EMAIL;
const baseUrl = `http://127.0.0.1:${port}`;

if (!smokeEmail) {
  console.error("Missing WAITLIST_SMOKE_EMAIL. Set it before running smoke test.");
  process.exit(1);
}

if (
  !process.env.RESEND_API_KEY ||
  !process.env.RESEND_AUDIENCE_ID ||
  !process.env.RESEND_FROM_EMAIL
) {
  console.error(
    "Missing RESEND_API_KEY, RESEND_AUDIENCE_ID, or RESEND_FROM_EMAIL. Smoke test requires real signup config.",
  );
  process.exit(1);
}

if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  console.error(
    "Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN. Production smoke test requires distributed rate limiting config.",
  );
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(maxAttempts = 40) {
  for (let i = 0; i < maxAttempts; i += 1) {
    try {
      // Readiness check should not consume external API quota.
      const res = await fetch(`${baseUrl}/`);
      if (res.ok) {
        return;
      }
    } catch {
      // keep polling
    }
    await sleep(500);
  }
  throw new Error("Timed out waiting for local server readiness");
}

async function runSmoke() {
  const response = await fetch(`${baseUrl}/api/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: smokeEmail,
      placement: "hero",
    }),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // Ignore parse error and fail below.
  }

  if (!response.ok) {
    throw new Error(
      `Signup smoke failed (${response.status}): ${JSON.stringify(payload)}`,
    );
  }

  if (!payload?.success) {
    throw new Error(`Signup smoke returned unexpected payload: ${JSON.stringify(payload)}`);
  }

  console.log(`Waitlist smoke passed for ${smokeEmail}`);
}

async function main() {
  const child = spawn("pnpm", ["next", "start", "-p", String(port)], {
    stdio: "pipe",
    env: process.env,
  });

  let settled = false;

  child.stdout.on("data", (data) => {
    process.stdout.write(data);
  });
  child.stderr.on("data", (data) => {
    process.stderr.write(data);
  });

  try {
    await waitForServer();
    await runSmoke();
    settled = true;
  } finally {
    child.kill("SIGTERM");
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (!child.killed) {
      child.kill("SIGKILL");
    }
  }

  if (!settled) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
