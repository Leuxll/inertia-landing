#!/usr/bin/env node

import { spawn } from "node:child_process";

const port = Number(process.env.WAITLIST_SMOKE_PORT ?? 4010);
const smokeEmail = process.env.WAITLIST_SMOKE_EMAIL;
const baseUrl = `http://127.0.0.1:${port}`;

if (!smokeEmail) {
  console.error("Missing WAITLIST_SMOKE_EMAIL. Set it before running smoke test.");
  process.exit(1);
}

if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
  console.error(
    "Missing RESEND_API_KEY or RESEND_AUDIENCE_ID. Smoke test requires real signup config.",
  );
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(maxAttempts = 40) {
  for (let i = 0; i < maxAttempts; i += 1) {
    try {
      const res = await fetch(`${baseUrl}/api/health`);
      if (res.ok) {
        const health = await res.json();
        if (
          health?.checks?.resend_api === true &&
          health?.checks?.resend_audience === true
        ) {
          return;
        }
        throw new Error("health checks not ready");
      }
    } catch {
      // keep polling
    }
    await sleep(500);
  }
  throw new Error("Timed out waiting for local server health check");
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

  if (!["new", "existing"].includes(payload.contactStatus)) {
    throw new Error(
      `Signup smoke returned invalid contactStatus: ${JSON.stringify(payload)}`,
    );
  }

  console.log(`Waitlist smoke passed (${payload.contactStatus}) for ${smokeEmail}`);
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
