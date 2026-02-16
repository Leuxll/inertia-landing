export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6">
      <main className="flex flex-col items-center gap-12 text-center max-w-2xl">
        {/* Headline — Playfair Display */}
        <h1 className="font-display text-6xl md:text-8xl tracking-tight text-text">
          Momentum
        </h1>

        {/* Subtitle — Inter */}
        <p className="font-body text-xl md:text-2xl tracking-wide uppercase text-text">
          The Anti-Subscription Habit Tracker
        </p>

        {/* Divider */}
        <div className="w-24 h-px bg-border" />

        {/* Body text — muted */}
        <p className="font-body text-base md:text-lg leading-relaxed text-text-muted max-w-lg">
          A brutally honest, beautifully designed habit tracker that respects
          your wallet. Stop guessing. Start tracking.
        </p>

        {/* CTA Button — solid white, sharp corners */}
        <button className="bg-cta text-cta-text font-body text-base font-medium px-8 py-4 tracking-wide uppercase transition-opacity hover:opacity-90">
          Get Early Access
        </button>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-border" />

        {/* Footer note */}
        <p className="font-body text-sm text-text-muted">
          Free forever. No credit card required.
        </p>
      </main>
    </div>
  );
}
