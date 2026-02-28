import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const coreBullets = [
  "Track habits fast without bloated flows or gamified clutter.",
  "See streaks and patterns in a clean, honest layout.",
  "Built for builders who want control over data and pricing.",
];

export function CoreExperienceSection() {
  return (
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
  );
}
