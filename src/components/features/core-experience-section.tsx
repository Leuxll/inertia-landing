import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function FastFlowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 3L3 21" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function HonestLayoutIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function DataControlIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16" />
      <path d="M10 4v16" />
    </svg>
  );
}

const coreCards = [
  {
    title: "Fast Flows",
    description: "Track habits fast without bloated flows or gamified clutter.",
    icon: FastFlowIcon,
  },
  {
    title: "Honest Layout",
    description: "See streaks and patterns in a clean, honest layout.",
    icon: HonestLayoutIcon,
  },
  {
    title: "Data Control",
    description: "Built for builders who want control over data and pricing.",
    icon: DataControlIcon,
  },
];

export function CoreExperienceSection() {
  return (
    <Section id="features" fullHeight density="airy" className="justify-center">
      <Container size="wide">
        <ScrollReveal variant="stagger">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div className="flex justify-center lg:justify-start lg:pt-2">
              <PhoneFrame
                src="/screenshots/home.png"
                alt="Inertia habit tracker home screen showing habits and streak progress"
                priority
              />
            </div>

            <div className="flex flex-col gap-8 text-left">
              <div className="flex flex-col gap-5">
                <Text variant="small" className="uppercase tracking-[0.3em]">
                  Core Experience
                </Text>
                <Heading as="h2" className="max-w-[15ch]">
                  Simple Habit Tracking for Builders Who Hate{" "}
                  <span className="text-text-muted/70">App Bloat.</span>
                </Heading>
                <Text variant="muted" className="max-w-[37ch] text-base md:text-lg">
                  Build consistency without renting another productivity tool.
                  Inertia is fast, quiet, and built around real use instead of
                  feature checklists.
                </Text>
              </div>

              <ul className="grid gap-4">
                {coreCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <li
                      key={card.title}
                      className="rounded-2xl border border-border bg-surface/50 px-5 py-4 md:px-6 md:py-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 text-text-muted/75">
                          <Icon />
                        </div>
                        <div>
                        <h3 className="font-body text-sm uppercase tracking-[0.22em] text-text-muted">
                          {card.title}
                        </h3>
                          <Text variant="muted" className="mt-1 text-base">
                            {card.description}
                          </Text>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
