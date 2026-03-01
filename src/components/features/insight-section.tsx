import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const secondaryCards = [
  {
    title: "Insights That Help, Not Perform",
    accent: "Decode the pattern.",
    description:
      "See why habits break with heatmaps and consistency signals, not vanity streak theater.",
    screenshotSrc: "/screenshots/details.png",
    screenshotAlt:
      "Inertia habit detail view with consistency percentage and heatmap pattern",
    screenshotPosition: "center center",
  },
  {
    title: "Make It Fit Your System",
    accent: "Keep the ritual simple.",
    description:
      "Use templates or custom categories so the app fits your life, not a preset workflow.",
    screenshotSrc: "/screenshots/habits.png",
    screenshotAlt:
      "Inertia templates screen showing customizable habit patterns and categories",
    screenshotPosition: "center center",
  },
];

export function InsightSection() {
  return (
    <Section fullHeight density="airy" className="justify-center">
      <Container size="wide">
        <ScrollReveal variant="stagger">
          <div className="flex flex-col gap-6 md:gap-7">
            <div className="text-center md:text-left">
              <Text variant="small" className="uppercase tracking-[0.3em]">
                More Than Streaks
              </Text>
              <Heading as="h2" className="mt-2.5 max-w-none lg:whitespace-nowrap">
                Insight and Customization Without the{" "}
                <span className="italic text-text-muted/72">Noise.</span>
              </Heading>
              <Text
                variant="muted"
                className="mt-3.5 max-w-none text-base md:text-lg lg:whitespace-nowrap"
              >
                Flexible where it matters, constrained where it helps. You
                get useful signal, not UI theater.
              </Text>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {secondaryCards.map((card) => (
                <div
                  key={card.title}
                  className="gradient-border overflow-hidden rounded-3xl border border-border bg-surface/60 p-4 md:p-5"
                >
                  <div className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:items-stretch">
                    <div className="rounded-2xl border border-border bg-surface-elevated/40 p-3.5 md:p-4">
                      <div className="relative mx-auto aspect-[9/19.5] w-full max-w-[190px] overflow-hidden rounded-[1.25rem] border border-border/60 bg-bg/90">
                        <Image
                          src={card.screenshotSrc}
                          alt={card.screenshotAlt}
                          fill
                          className="object-contain"
                          style={{ objectPosition: card.screenshotPosition }}
                          sizes="(max-width: 767px) 210px, 210px"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-2.5 text-left">
                      <Text variant="small" className="uppercase tracking-[0.22em]">
                        {card.accent}
                      </Text>
                      <Heading as="h4" className="text-2xl leading-[1.08] md:text-3xl">
                        {card.title}
                      </Heading>
                      <Text variant="muted" className="max-w-[31ch] text-base md:text-lg">
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
  );
}
