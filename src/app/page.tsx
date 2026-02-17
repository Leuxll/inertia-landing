import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { CtaBlock } from "@/components/ui/cta-block";
import { GeometricAccent } from "@/components/ui/geometric-accent";
import { WaitlistCounter } from "@/components/waitlist-counter";
import { Footer } from "@/components/footer";
import { HabitTrackingSection } from "@/components/features/habit-tracking-section";
import { HeatmapSection } from "@/components/features/heatmap-section";
import { CustomizationSection } from "@/components/features/customization-section";

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

        <Container size="narrow" className="relative z-10">
          <ScrollReveal className="flex flex-col items-center gap-8 text-center">
            <Text
              variant="small"
              className="uppercase tracking-[0.3em]"
            >
              Momentum
            </Text>

            <Heading as="h1">
              The Anti-Subscription{"\n"}Habit Tracker
            </Heading>

            <Text variant="muted" className="max-w-lg text-lg md:text-xl">
              Beautifully designed. Brutally honest. One purchase, no strings.
              Track your habits without tracking your wallet.
            </Text>

            <CtaBlock className="mt-2" />
          </ScrollReveal>
        </Container>
      </Section>

      {/* Features */}
      <HabitTrackingSection />
      <HeatmapSection />
      <CustomizationSection />

      {/* Bottom CTA — minimal closing nudge */}
      <Section id="bottom-cta" fullHeight={false} className="py-32">
        <Container size="narrow">
          <ScrollReveal className="flex flex-col items-center gap-8 text-center">
            <Heading as="h3">Ready?</Heading>
            <CtaBlock compact />
            <WaitlistCounter />
          </ScrollReveal>
        </Container>
      </Section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
