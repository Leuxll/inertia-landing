import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";
import { CtaBlock } from "@/components/ui/cta-block";

export default function Home() {
  return (
    <>
      {/* Hero section — full-height editorial intro */}
      <Section fullHeight className="justify-center">
        <Container>
          <ScrollReveal className="flex flex-col items-center gap-12 text-center">
            <Heading as="h1">Momentum</Heading>
            <Text className="uppercase tracking-wide">
              The Anti-Subscription Habit Tracker
            </Text>
            <Divider className="max-w-xs mx-auto" />
            <Text variant="muted" className="max-w-lg">
              A brutally honest, beautifully designed habit tracker that respects
              your wallet. Stop guessing. Start tracking.
            </Text>
            <CtaBlock />
          </ScrollReveal>
        </Container>
      </Section>

      <Divider className="max-w-xs mx-auto" />

      {/* Philosophy section — narrow editorial text */}
      <Section fullHeight={false}>
        <Container size="narrow">
          <ScrollReveal className="flex flex-col items-center gap-10 text-center">
            <Heading as="h2" accent>
              It Hurts. It Helps.
            </Heading>
            <Text variant="muted" className="max-w-lg">
              Every habit you track is a mirror. Some reflections are
              uncomfortable. That&apos;s the point. Growth isn&apos;t comfortable
              — it&apos;s honest. Momentum doesn&apos;t sugarcoat your streaks
              or gamify your failures. It shows you exactly where you stand, and
              lets you decide what to do about it.
            </Text>
          </ScrollReveal>
        </Container>
      </Section>

      <Divider className="max-w-xs mx-auto" />

      {/* Component showcase — design system proof */}
      <Section fullHeight={false}>
        <Container>
          <ScrollReveal
            variant="stagger"
            className="flex flex-col items-center gap-16 w-full"
          >
            <ScrollReveal>
              <Heading as="h3">Design System</Heading>
            </ScrollReveal>

            {/* Button variants */}
            <ScrollReveal className="flex flex-col items-center gap-6">
              <Text variant="small" className="uppercase tracking-widest">
                Buttons
              </Text>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button>Primary CTA</Button>
                <Button variant="secondary">Secondary CTA</Button>
              </div>
            </ScrollReveal>

            {/* Heading scale */}
            <ScrollReveal className="flex flex-col items-center gap-6 w-full">
              <Text variant="small" className="uppercase tracking-widest">
                Heading Scale
              </Text>
              <div className="flex flex-col items-center gap-4">
                <Heading as="h1">Heading 1</Heading>
                <Heading as="h2">Heading 2</Heading>
                <Heading as="h3">Heading 3</Heading>
                <Heading as="h4">Heading 4</Heading>
              </div>
            </ScrollReveal>

            {/* Text variants */}
            <ScrollReveal className="flex flex-col items-center gap-6">
              <Text variant="small" className="uppercase tracking-widest">
                Text Variants
              </Text>
              <div className="flex flex-col items-center gap-3">
                <Text>Default body text (#f4f4f0 on #0a0a0a)</Text>
                <Text variant="muted">
                  Muted text variant (#a1a1a1 on #0a0a0a)
                </Text>
                <Text variant="small">
                  Small text variant for captions and labels
                </Text>
              </div>
            </ScrollReveal>

            {/* Divider demo */}
            <ScrollReveal className="flex flex-col items-center gap-6 w-full">
              <Text variant="small" className="uppercase tracking-widest">
                Divider
              </Text>
              <Divider className="max-w-sm" />
            </ScrollReveal>

            {/* Accent heading */}
            <ScrollReveal className="flex flex-col items-center gap-6">
              <Text variant="small" className="uppercase tracking-widest">
                Accent Heading
              </Text>
              <Heading as="h2" accent>
                Italic Accent Style
              </Heading>
            </ScrollReveal>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
