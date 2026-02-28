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
      className="relative overflow-x-hidden justify-center py-6 md:py-8 lg:py-10"
    >
      <GeometricAccent />

      <Container size="hero" className="relative z-10 w-full">
        <div className="flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center gap-6 md:min-h-[calc(100dvh-5.5rem)] md:gap-8 lg:min-h-[calc(100dvh-6rem)]">
          <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 2xl:gap-12">
          {/* Copy */}
          <div className="flex flex-col items-start text-left">
            <Text
              variant="small"
              className="hero-polish-float uppercase tracking-[0.3em]"
              style={{ ["--hero-delay" as string]: "0.15s" }}
            >
              Inertia
            </Text>

            <Heading
              as="h1"
              className="hero-polish-title mt-4 text-4xl leading-[0.93] md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl"
            >
              A Habit Tracker for Builders Who Hate Subscription Bloat
            </Heading>

            <Text
              variant="muted"
              className="hero-polish-float mt-4 max-w-[52ch] text-base md:text-lg"
              style={{ ["--hero-delay" as string]: "0.35s" }}
            >
              Free core. Optional Pro later with yearly or lifetime pricing.
              No ads. No data harvesting. No forced subscription.
            </Text>

            <div
              className="hero-polish-cta-zone mt-6 w-full max-w-lg"
              style={{ ["--hero-delay" as string]: "0.55s" }}
            >
              <WaitlistCounter placement="hero" tone="chip" minCount={10} />
              <CtaBlock placement="hero" inline className="mt-3" />
            </div>

            {/* Trust signals — compact inline row */}
            <div
              className="hero-polish-float mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-body text-[11px] uppercase tracking-[0.12em] text-text-muted/50"
              style={{ ["--hero-delay" as string]: "0.85s" }}
            >
              <span className="flex items-center gap-1.5">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-text-muted/40"
                >
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.56C5.55 8.1 7.02 7.17 8.63 7.15C9.92 7.13 11.13 8.01 11.93 8.01C12.73 8.01 14.2 6.95 15.77 7.11C16.42 7.14 18.09 7.38 19.17 8.95C19.08 9.01 16.88 10.28 16.91 12.97C16.94 16.19 19.68 17.23 19.71 17.24C19.68 17.33 19.25 18.81 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                Coming to iOS
              </span>
              <span className="text-text-muted/20">·</span>
              <span>Local-first</span>
              <span className="text-text-muted/20">·</span>
              <span>Free core</span>
              <span className="text-text-muted/20">·</span>
              <span>No ads</span>
              <span className="text-text-muted/20">·</span>
              <span>No data harvesting</span>
            </div>
          </div>

          {/* Phone */}
            <div className="flex items-center justify-center lg:justify-end">
              <HeroPhone
                src="/screenshots/insights.png"
                alt="Inertia insights dashboard showing daily metrics, consistency score, and heatmap"
              />
            </div>
          </div>

          <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-surface/50 px-5 py-4 backdrop-blur-sm">
            <Text
              variant="small"
              className="uppercase tracking-[0.18em] text-text-muted/60"
            >
              Founder note
            </Text>
            <Text variant="muted" className="mt-1.5 text-sm md:text-base">
              I built Inertia after paying $12/month to log basic habits. I wanted
              something simpler, private, and fairly priced.
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
