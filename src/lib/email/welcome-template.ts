/**
 * Branded welcome email template for Inertia waitlist signups.
 *
 * Design: dark background, minimal layout, no images — feels like a
 * quiet, confident message from Co-Star. Inline styles only (email
 * clients strip <style> blocks).
 */

export const WELCOME_EMAIL_SUBJECT = "You're in.";
const INERTIA_URL = "https://getinertia.app";

/**
 * Returns the full HTML string for the welcome email.
 * Uses inline styles exclusively for maximum email client compatibility.
 */
export function getWelcomeEmailHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <title>${WELCOME_EMAIL_SUBJECT}</title>
</head>
<body style="background-color: #0a0a0a; color: #f4f4f0; font-family: Georgia, 'Times New Roman', serif; padding: 48px 24px; margin: 0; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 480px; margin: 0 auto;">
    <!-- Brand label -->
    <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #a1a1a1; margin: 0 0 32px 0;">
      INERTIA
    </p>

    <!-- Main message -->
    <h1 style="font-size: 24px; font-weight: 400; line-height: 1.4; color: #f4f4f0; margin: 0 0 24px 0;">
      You&rsquo;re on the list.
    </h1>

    <p style="font-size: 16px; line-height: 1.6; color: #a1a1a1; margin: 0 0 32px 0;">
      Most habit trackers sell you consistency as a subscription. We think the
      truth is simpler&mdash;and worth owning outright. When Inertia is ready,
      you&rsquo;ll be the first to know.
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #8a8a8a; margin: 0 0 24px 0;">
      If you don&rsquo;t see future updates, check your Spam or Promotions tab and
      move this email to your primary inbox.
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #9a9a9a; margin: 0;">
      ${INERTIA_URL}
    </p>

    <!-- Sign-off -->
    <p style="font-size: 14px; color: #666666; border-top: 1px solid rgba(244,244,240,0.08); padding-top: 24px; margin: 48px 0 0 0;">
      Inertia &mdash; The Anti-Subscription Habit Tracker
    </p>
  </div>
</body>
</html>`;
}

export function getWelcomeEmailText(): string {
  return [
    "INERTIA",
    "",
    "You're on the list.",
    "",
    "Most habit trackers sell you consistency as a subscription.",
    "We think the truth is simpler and worth owning outright.",
    "When Inertia is ready, you'll be the first to know.",
    "",
    "If you don't see future updates, check Spam or Promotions and move this email to your primary inbox.",
    "",
    INERTIA_URL,
    "",
    "Inertia - The Anti-Subscription Habit Tracker",
  ].join("\n");
}
