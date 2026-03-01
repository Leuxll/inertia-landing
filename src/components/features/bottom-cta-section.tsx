import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { CtaBlock } from "@/components/ui/cta-block";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function BottomCtaSection() {
  return (
    <Section
      id="bottom-cta"
      density="dense"
      className="min-h-[calc(100dvh-11rem)] justify-center pt-8 pb-8 md:min-h-[calc(100dvh-13rem)] md:pt-10 md:pb-10 lg:min-h-[calc(100dvh-14rem)] lg:pt-10 lg:pb-10"
    >
      <Container size="narrow" className="relative z-10">
        <ScrollReveal className="flex flex-col items-center gap-4 text-center md:gap-5">
          <Text variant="small" className="uppercase tracking-[0.3em]">
            Early Access
          </Text>
          <Heading as="h3" className="max-w-[14ch] text-5xl leading-[0.95] md:text-6xl">
            Join before we open the doors wider.
          </Heading>
          <Text variant="muted" className="max-w-[31ch] text-base md:text-lg">
            Free core at launch. Optional Pro later with yearly or lifetime
            pricing.
          </Text>
          <CtaBlock centered placement="bottom" className="mt-1 w-full max-w-xl" />
        </ScrollReveal>
      </Container>
    </Section>
  );
}
