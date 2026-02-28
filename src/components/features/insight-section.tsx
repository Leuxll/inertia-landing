import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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

export function InsightSection() {
  return (
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
  );
}
