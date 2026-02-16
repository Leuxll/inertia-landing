import { ctaMode, isWaitlistMode } from "@/lib/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Home() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="min-h-dvh flex flex-col items-center justify-center px-6">
        <ScrollReveal className="flex flex-col items-center gap-12 text-center max-w-2xl">
          {/* Headline — Playfair Display */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-text">
            Momentum
          </h1>

          {/* Subtitle — Inter */}
          <p className="font-body text-lg sm:text-xl md:text-2xl tracking-wide uppercase text-text">
            The Anti-Subscription Habit Tracker
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-border" />

          {/* Body text — muted */}
          <p className="font-body text-base md:text-lg leading-relaxed text-text-muted max-w-lg">
            A brutally honest, beautifully designed habit tracker that respects
            your wallet. Stop guessing. Start tracking.
          </p>

          {/* CTA Button — state-driven */}
          <div className="flex flex-col items-center gap-3">
            <button className="bg-cta text-cta-text font-body text-base font-medium px-8 py-4 tracking-wide uppercase transition-opacity hover:opacity-90">
              {isWaitlistMode ? "Get Early Access" : "Download on App Store"}
            </button>
            <span className="font-body text-xs text-text-muted uppercase tracking-widest">
              {isWaitlistMode ? "Waitlist mode active" : "Download mode active"}
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* Divider */}
      <div className="flex justify-center px-6">
        <div className="w-full max-w-xs h-px bg-border" />
      </div>

      {/* Section 2 — Scroll-reveal demo */}
      <section className="min-h-dvh flex flex-col items-center justify-center px-6 py-24">
        <ScrollReveal
          variant="stagger"
          className="flex flex-col items-center gap-16 text-center max-w-2xl"
        >
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-text">
              Built Different
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="font-body text-base md:text-lg leading-relaxed text-text-muted max-w-lg">
              No subscriptions. No dark patterns. No guilt trips. Just a clean,
              honest tool that helps you build the habits that matter.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="w-24 h-px bg-border" />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-body text-sm text-text-muted">
              Free forever. No credit card required.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="font-body text-xs text-text-muted uppercase tracking-widest">
              CTA mode: {ctaMode}
            </p>
          </ScrollReveal>
        </ScrollReveal>
      </section>
    </>
  );
}
