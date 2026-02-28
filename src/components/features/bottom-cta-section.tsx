import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { CtaBlock } from "@/components/ui/cta-block";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WaitlistCounter } from "@/components/waitlist-counter";
import { Footer } from "@/components/footer";

export function BottomCtaSection() {
  return (
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
  );
}
