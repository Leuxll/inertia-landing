import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { CtaBlock } from "@/components/ui/cta-block";
import { GeometricAccent } from "@/components/ui/geometric-accent";
import { GeometricDivider } from "@/components/ui/geometric-divider";
import { GeometricSection } from "@/components/ui/geometric-section";
import { HeroPhone } from "@/components/ui/hero-phone";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { WaitlistCounter } from "@/components/waitlist-counter";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/features/pricing-section";
import { WhatsNextSection } from "@/components/features/whats-next-section";

const trustItems = [
  "Local-first",
  "Free core",
  "Optional yearly or lifetime Pro",
  "No ads",
  "No data harvesting",
];

const coreBullets = [
  "Track habits fast without bloated flows or gamified clutter.",
  "See streaks and patterns in a clean, honest layout.",
  "Built for builders who want control over data and pricing.",
];

const secondaryCards = [
  {
    title: "Insights That Help, Not Perform",
    accent: "Decode the pattern.",
    description:
      "See why habits break with heatmaps and consistency signals, not vanity streak theater.",
    screenshotSrc: "/screenshots/habit-detail.png",
    screenshotAlt:
      "Inertia habit detail view with consistency percentage and heatmap pattern",
  },
  {
    title: "Make It Fit Your System",
    accent: "Keep the ritual simple.",
    description:
      "Use templates or custom categories so the app fits your life, not a preset workflow.",
    screenshotSrc: "/screenshots/templates.png",
    screenshotAlt:
      "Inertia templates screen showing customizable habit patterns and categories",
  },
];

export default function Home() {
  return (
    <main>
      <Section
        id="hero"
        fullHeight
        density="hero"
        className="relative justify-center overflow-hidden"
      >
        <GeometricAccent />

        <Container size="hero" className="relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-12">
            <ScrollReveal className="flex flex-col items-start text-left">
              <Text variant="small" className="uppercase tracking-[0.3em]">
                Inertia
              </Text>

              <Heading
                as="h1"
                className="mt-4 max-w-[13ch] text-4xl leading-[0.93] md:text-6xl lg:text-7xl"
              >
                A Habit Tracker for Builders Who Hate Subscription Bloat
              </Heading>

              <Text
                variant="muted"
                className="mt-5 max-w-[52ch] text-base md:text-lg"
              >
                Free core. Optional Pro later with yearly or lifetime pricing.
                No ads. No data harvesting. No forced subscription.
              </Text>

              <div className="mt-5 w-full max-w-xl rounded-2xl border border-border bg-surface/65 px-4 py-3 backdrop-blur-sm">
                <Text
                  variant="small"
                  className="uppercase tracking-[0.18em] text-text-muted/70"
                >
                  Founder note
                </Text>
                <Text variant="muted" className="mt-1 text-sm md:text-base">
                  I built Inertia after paying $12/month to log basic habits. I
                  wanted something simpler, private, and fairly priced.
                </Text>
              </div>

              <div className="mt-6 flex w-full max-w-md flex-col items-start gap-3">
                <WaitlistCounter placement="hero" tone="chip" minCount={10} />
                <CtaBlock placement="hero" />
              </div>

              <div className="mt-2 flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-text-muted/60"
                >
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.56C5.55 8.1 7.02 7.17 8.63 7.15C9.92 7.13 11.13 8.01 11.93 8.01C12.73 8.01 14.2 6.95 15.77 7.11C16.42 7.14 18.09 7.38 19.17 8.95C19.08 9.01 16.88 10.28 16.91 12.97C16.94 16.19 19.68 17.23 19.71 17.24C19.68 17.33 19.25 18.81 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                <Text
                  variant="small"
                  className="uppercase tracking-[0.15em] text-text-muted/60"
                >
                  Coming to iOS
                </Text>
              </div>
            </ScrollReveal>

            <ScrollReveal className="flex items-center justify-center lg:justify-end" delay={0.15}>
              <div className="relative flex w-full max-w-[420px] flex-col items-center gap-4 lg:max-w-[460px]">
                <HeroPhone
                  src="/screenshots/insights.png"
                  alt="Inertia insights dashboard showing daily metrics, consistency score, and heatmap"
                  className="scale-[0.95] md:scale-100"
                />
                <Text
                  variant="small"
                  className="max-w-sm text-center uppercase tracking-[0.14em] text-text-muted/70"
                >
                  Local-first • Free core • Optional yearly or lifetime Pro
                </Text>
              </div>
            </ScrollReveal>
          </div>
        </Container>

        <ScrollIndicator />
      </Section>

      <GeometricDivider variant="lines" className="py-6 md:py-8" />

      <Section density="dense" className="py-0">
        <Container size="wide">
          <ScrollReveal className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {trustItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-surface/50 px-3 py-1.5 font-body text-xs uppercase tracking-[0.14em] text-text-muted/80 backdrop-blur-sm md:px-4"
              >
                {item}
              </span>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      <GeometricSection accent="top-right">
        <Section id="features" density="airy" className="justify-center">
          <Container size="wide">
            <ScrollReveal variant="stagger">
              <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
                <div className="flex justify-center lg:justify-start">
                  <PhoneFrame
                    src="/screenshots/home.png"
                    alt="Inertia habit tracker home screen showing habits and streak progress"
                    priority
                    className="scale-[0.95] md:scale-100"
                  />
                </div>

                <div className="flex flex-col gap-6 text-left">
                  <Text variant="small" className="uppercase tracking-[0.3em]">
                    Core Experience
                  </Text>
                  <Heading as="h2" className="max-w-[14ch]">
                    Simple Habit Tracking for Builders Who Hate App Bloat
                  </Heading>
                  <Text variant="muted" className="max-w-[56ch]">
                    Build consistency without renting another productivity tool.
                    Inertia is fast, quiet, and built around real use instead of
                    feature checklists.
                  </Text>

                  <ul className="grid gap-3">
                    {coreBullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-xl border border-border bg-surface/45 px-4 py-3"
                      >
                        <Text variant="muted" className="text-sm md:text-base">
                          {bullet}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      </GeometricSection>

      <GeometricDivider variant="dots" className="py-4 md:py-6" />

      <GeometricSection accent="bottom-left">
        <Section density="airy" className="justify-center">
          <Container size="wide">
            <ScrollReveal variant="stagger">
              <div className="flex flex-col gap-8 md:gap-10">
                <div className="text-center md:text-left">
                  <Text variant="small" className="uppercase tracking-[0.3em]">
                    More Than Streaks
                  </Text>
                  <Heading as="h2" className="mt-3 max-w-[16ch]">
                    Insight and Customization Without the Noise
                  </Heading>
                  <Text variant="muted" className="mt-4 max-w-2xl">
                    Flexible where it matters, constrained where it helps. You
                    get useful signal, not UI theater.
                  </Text>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {secondaryCards.map((card, index) => (
                    <div
                      key={card.title}
                      className="gradient-border rounded-2xl border border-border bg-surface/60 p-5 md:p-6"
                    >
                      <div className="grid items-center gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
                        <div className="flex justify-center md:justify-start">
                          <PhoneFrame
                            src={card.screenshotSrc}
                            alt={card.screenshotAlt}
                            className={index === 0 ? "scale-[0.82]" : "scale-[0.82]"}
                          />
                        </div>
                        <div className="flex flex-col gap-3 text-left">
                          <Text
                            variant="small"
                            className="uppercase tracking-[0.22em]"
                          >
                            {card.accent}
                          </Text>
                          <Heading as="h4" className="text-xl md:text-2xl">
                            {card.title}
                          </Heading>
                          <Text variant="muted" className="text-sm md:text-base">
                            {card.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      </GeometricSection>

      <GeometricDivider variant="circle" className="py-6 md:py-8" />

      <GeometricSection accent="center">
        <PricingSection />
      </GeometricSection>

      <GeometricDivider variant="lines" className="py-6 md:py-8" />

      <GeometricSection accent="bottom-left">
        <WhatsNextSection />
      </GeometricSection>

      <GeometricDivider variant="dots" className="py-6 md:py-8" />

      <GeometricSection accent="center">
        <Section id="bottom-cta" density="dense" className="justify-between pt-10 md:pt-14">
          <Container size="narrow" className="relative z-10">
            <ScrollReveal className="flex flex-col items-center gap-5 text-center">
              <Text variant="small" className="uppercase tracking-[0.3em]">
                Early Access
              </Text>
              <Heading as="h3" className="max-w-[14ch]">
                Join before we open the doors wider.
              </Heading>
              <Text variant="muted" className="max-w-md text-sm md:text-base">
                Free core at launch. Optional Pro later with yearly or lifetime
                pricing.
              </Text>
              <WaitlistCounter placement="bottom" minCount={10} rounded={false} />
              <CtaBlock compact centered placement="bottom" />
            </ScrollReveal>
          </Container>

          <Footer className="mt-8 w-full px-0" />
        </Section>
      </GeometricSection>
    </main>
  );
}
