/**
 * Branded welcome email template for Momentum waitlist signups.
 *
 * Design: dark background, minimal layout, no images — feels like a
 * quiet, confident message from Co-Star. Inline styles only (email
 * clients strip <style> blocks).
 */

export const WELCOME_EMAIL_SUBJECT = "You're in.";

/**
 * Returns the full HTML string for the welcome email.
 * Uses inline styles exclusively for maximum email client compatibility.
 */
export function getWelcomeEmailHtml(_email: string): string {
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
      MOMENTUM
    </p>

    <!-- Main message -->
    <h1 style="font-size: 24px; font-weight: 400; line-height: 1.4; color: #f4f4f0; margin: 0 0 24px 0;">
      You&rsquo;re on the list.
    </h1>

    <p style="font-size: 16px; line-height: 1.6; color: #a1a1a1; margin: 0 0 32px 0;">
      Most habit trackers sell you consistency as a subscription. We think the
      truth is simpler&mdash;and worth owning outright. When Momentum is ready,
      you&rsquo;ll be the first to know.
    </p>

    <!-- Sign-off -->
    <p style="font-size: 14px; color: #666666; border-top: 1px solid rgba(244,244,240,0.08); padding-top: 24px; margin: 48px 0 0 0;">
      Momentum &mdash; The Anti-Subscription Habit Tracker
    </p>
  </div>
</body>
</html>`;
}
