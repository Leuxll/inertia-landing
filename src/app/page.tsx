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
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { WaitlistCounter } from "@/components/waitlist-counter";
import { Footer } from "@/components/footer";
import { HabitTrackingSection } from "@/components/features/habit-tracking-section";
import { HeatmapSection } from "@/components/features/heatmap-section";
import { CustomizationSection } from "@/components/features/customization-section";
import { PricingSection } from "@/components/features/pricing-section";
import { WhatsNextSection } from "@/components/features/whats-next-section";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <Section
        id="hero"
        fullHeight
        className="justify-center relative overflow-hidden"
      >
        <GeometricAccent />

        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text + CTA column */}
            <ScrollReveal className="flex flex-col items-start gap-8 text-left flex-1">
              <Text
                variant="small"
                className="uppercase tracking-[0.3em]"
              >
                Inertia
              </Text>

              <Heading as="h1">
                Stop Renting{"\n"}Your Habits
              </Heading>

              <Text variant="muted" className="max-w-lg text-lg md:text-xl">
                The anti-subscription tracker. $0 forever. No ads. No harvesting.
                Just you and your discipline.
              </Text>

              <CtaBlock className="mt-2" />
              <WaitlistCounter />

              {/* App Store availability badge */}
              <div className="flex items-center gap-2 mt-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-muted/60">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.56C5.55 8.1 7.02 7.17 8.63 7.15C9.92 7.13 11.13 8.01 11.93 8.01C12.73 8.01 14.2 6.95 15.77 7.11C16.42 7.14 18.09 7.38 19.17 8.95C19.08 9.01 16.88 10.28 16.91 12.97C16.94 16.19 19.68 17.23 19.71 17.24C19.68 17.33 19.25 18.81 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                <span className="font-body text-xs text-text-muted/60 uppercase tracking-[0.15em]">
                  Coming to iOS
                </span>
              </div>
            </ScrollReveal>

            {/* Hero phone mockup */}
            <ScrollReveal className="flex-shrink-0" delay={0.2}>
              <HeroPhone
                src="/screenshots/insights.png"
                alt="Inertia insights dashboard showing daily metrics, heatmap, and AI-generated reflections"
              />
            </ScrollReveal>
          </div>
        </Container>

        <ScrollIndicator />
      </Section>

      {/* Geometric transition to features */}
      <GeometricDivider variant="circle" />

      {/* Features */}
      <GeometricSection accent="top-right">
        <HabitTrackingSection />
      </GeometricSection>
      
      <GeometricDivider variant="lines" />
      
      <GeometricSection accent="bottom-left">
        <HeatmapSection />
      </GeometricSection>
      
      <GeometricDivider variant="dots" />
      
      <GeometricSection accent="top-right">
        <CustomizationSection />
      </GeometricSection>

      <GeometricDivider variant="circle" />

      {/* Pricing */}
      <GeometricSection accent="center">
        <PricingSection />
      </GeometricSection>

      <GeometricDivider variant="lines" />

      {/* What's Next */}
      <GeometricSection accent="bottom-left">
        <WhatsNextSection />
      </GeometricSection>

      <GeometricDivider variant="dots" />

      {/* Bottom CTA + Footer */}
      <GeometricSection accent="center">
        <Section
          id="bottom-cta"
          className="justify-between py-16 md:py-20 lg:py-24"
        >
          <div className="flex flex-1 w-full items-center relative pb-10 md:pb-14 lg:pb-16">
            {/* Geometric rings around final CTA */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                <div className="w-[400px] h-[400px] rounded-full border border-text/[0.03]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[300px] h-[300px] rounded-full border border-text/[0.05]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[200px] h-[200px] rounded-full border border-text/[0.08]" />
                </div>
              </div>
            </div>
            
            <Container size="narrow" className="relative z-10">
              <ScrollReveal className="flex flex-col items-center gap-6 text-center">
                <Heading as="h3">Join the rebellion.</Heading>
                <Text variant="muted" className="max-w-md">
                  Free forever. Optional Pro later. Never a subscription.
                </Text>
                <CtaBlock compact centered />
                <WaitlistCounter />
              </ScrollReveal>
            </Container>
          </div>

          <Footer className="w-full px-0 mt-6" />
        </Section>
      </GeometricSection>
    </main>
  );
}
