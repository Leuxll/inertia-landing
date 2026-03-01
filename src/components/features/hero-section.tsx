import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { CtaBlock } from "@/components/ui/cta-block";
import { GeometricAccent } from "@/components/ui/geometric-accent";
import { HeroPhone } from "@/components/ui/hero-phone";
import { WaitlistCounter } from "@/components/waitlist-counter";

export function HeroSection() {
  return (
    <Section
      id="hero"
      fullHeight
      density="hero"
      className="relative overflow-x-hidden justify-center py-6 md:py-8 lg:py-10 xl:py-10 2xl:py-10"
    >
      <GeometricAccent />

      <Container size="hero" className="relative z-10 w-full">
        <div className="flex w-full flex-col justify-center">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-[auto_auto] lg:gap-x-14 lg:gap-y-8">
            <div className="flex flex-col items-start gap-5 text-left lg:col-start-1 lg:row-start-1">
            <div className="hero-polish-float inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 font-body text-[11px] uppercase tracking-[0.16em] text-text-muted/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Coming to iOS
            </div>

            <Text
              variant="small"
              className="hero-polish-float uppercase tracking-[0.3em]"
              style={{ ["--hero-delay" as string]: "0.15s" }}
            >
              Inertia
            </Text>

            <Heading
              as="h1"
              className="hero-polish-title max-w-[18ch] text-[clamp(3rem,7.2vw,5.95rem)] leading-[0.93] tracking-[-0.02em]"
            >
              A Habit Tracker for Builders Who Hate{" "}
              <span className="italic text-text-muted/70">Subscription Bloat.</span>
            </Heading>

            <Text
              variant="muted"
              className="hero-polish-float max-w-[50ch] text-[clamp(1.05rem,2.1vw,1.4rem)] leading-[1.45]"
              style={{ ["--hero-delay" as string]: "0.35s" }}
            >
              Free core features. Optional one-time Pro later. No ads. No data
              harvesting. Just pure focus.
            </Text>

            <div className="hero-polish-cta-zone w-full max-w-lg" style={{ ["--hero-delay" as string]: "0.55s" }}>
              <WaitlistCounter placement="hero" tone="chip" minCount={10} />
              <CtaBlock placement="hero" inline className="mt-3" />
            </div>

            {/* Trust signals — compact inline row */}
            <div
              className="hero-polish-float flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-[11px] uppercase tracking-[0.14em] text-text-muted/60"
              style={{ ["--hero-delay" as string]: "0.85s" }}
            >
              <span className="inline-flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-text-muted/70"
                  aria-hidden="true"
                >
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>
                Local-first
              </span>
              <span className="inline-flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-text-muted/70"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M5 19L19 5" />
                </svg>
                No ads
              </span>
              <span className="inline-flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-text-muted/70"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
                </svg>
                Private
              </span>
            </div>
            </div>

            <div className="flex items-center justify-center lg:col-start-2 lg:row-span-2 lg:justify-end">
              <HeroPhone
                src="/screenshots/insights.png"
                alt="Inertia insights dashboard showing daily metrics, consistency score, and heatmap"
              />
            </div>

            <div className="w-full max-w-[34rem] lg:col-start-1 lg:row-start-2">
              <div className="gradient-border rounded-2xl border border-border bg-surface/45 p-3 backdrop-blur-sm md:p-4">
                <p className="font-display italic text-[clamp(0.88rem,1.35vw,1.02rem)] leading-[1.45] text-text-muted/78">
                  &ldquo;I built Inertia after paying $12/month to log basic habits. I
                  wanted something simpler, private, and fairly priced.&rdquo;
                </p>
                <div className="mt-2 font-body text-[9px] tracking-[0.12em] text-text-muted/65">
                  ~@leuxll
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
