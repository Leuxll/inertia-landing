"use client";

import { track } from "@vercel/analytics";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqItems = [
  {
    question: "When will invites go out?",
    answer:
      "We invite in small weekly waves so we can support early users directly and iterate quickly.",
  },
  {
    question: "Will the core product stay free?",
    answer:
      "Yes. Core habit tracking stays free. Optional Pro will add advanced tools without locking basic habits behind a paywall.",
  },
  {
    question: "What happens after I join the waitlist?",
    answer:
      "You get a confirmation email first, then launch and invite updates. We keep emails low-volume and relevant.",
  },
  {
    question: "Is this iOS only?",
    answer:
      "Initial launch is iOS. We are designing the core system so expansion to other platforms stays possible.",
  },
  {
    question: "What data do you collect?",
    answer:
      "We only ask for your email for waitlist and invite updates. Product analytics are minimal and focused on improving core UX.",
  },
  {
    question: "Can I leave the list later?",
    answer:
      "Yes. Every email includes a one-click unsubscribe link.",
  },
];

export function FaqSection() {
  return (
    <Section fullHeight density="dense" className="justify-center">
      <Container size="narrow">
        <ScrollReveal className="flex flex-col gap-6 md:gap-8">
          <div className="text-center">
            <Text variant="small" className="uppercase tracking-[0.3em]">
              FAQ
            </Text>
            <Heading as="h3" className="mt-3">
              Questions Before You Join
            </Heading>
            <Text variant="muted" className="mx-auto mt-3 max-w-2xl text-sm md:text-base">
              Quick answers on pricing, invites, and privacy so you can decide with
              confidence.
            </Text>
          </div>

          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border bg-surface/60 px-5 py-4"
                onToggle={(event) => {
                  const target = event.currentTarget;
                  if (!target.open) return;

                  track("faq_item_open", {
                    question_index: index + 1,
                    question: item.question,
                  });
                }}
              >
                <summary className="cursor-pointer list-none pr-8 font-body text-sm uppercase tracking-[0.12em] text-text/90 marker:hidden">
                  {item.question}
                </summary>
                <p className="mt-3 font-body text-sm leading-relaxed text-text-muted md:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
