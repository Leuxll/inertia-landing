// CTA mode is determined at build time via environment variable.
// Changing CTA_MODE requires a redeploy (by design — avoids caching issues).
// See: .env.local for local development, Vercel dashboard for production.

export type CtaMode = "waitlist" | "download";

export const ctaMode: CtaMode =
  (process.env.NEXT_PUBLIC_CTA_MODE as CtaMode) || "waitlist";

export const isWaitlistMode = ctaMode === "waitlist";
export const isDownloadMode = ctaMode === "download";
