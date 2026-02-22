"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { fadeUp, cardHover } from "@/lib/animations";

function BrainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-3 3v1a3 3 0 0 0 1 5.83V18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.17A3 3 0 0 0 19 11v-1a3 3 0 0 0-3-3V6a4 4 0 0 0-4-4z" />
      <path d="M12 2v20" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function HeartPulseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
      <path d="M3 12h4l2-4l4 8l2-4h6" />
    </svg>
  );
}

const upcomingFeatures = [
  {
    label: "Intelligence",
    title: "AI Reflections",
    description:
      "AI-generated pattern summaries that turn streak data into honest feedback.",
    icon: BrainIcon,
  },
  {
    label: "Motivation",
    title: "Rest Tokens",
    description:
      "Earn recovery days through consistency so rest is built into the system.",
    icon: MoonIcon,
  },
  {
    label: "Integration",
    title: "HealthKit Sync",
    description:
      "See habits beside sleep, steps, and recovery in one clear timeline.",
    icon: HeartPulseIcon,
  },
];

export function WhatsNextSection() {
  return (
    <Section className="justify-center py-20 md:py-28 lg:py-32">
      <Container>
        <ScrollReveal variant="stagger">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-6 text-center lg:text-left"
            >
              <Text variant="small" className="uppercase tracking-[0.3em]">
                What&rsquo;s Next
              </Text>

              <Heading as="h2">The Road Ahead</Heading>

              <Text
                variant="muted"
                className="max-w-lg text-lg md:text-xl mx-auto lg:mx-0"
              >
                We&rsquo;re building the next layer of Inertia around insight,
                recovery, and context.
              </Text>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-4">
              {upcomingFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={feature.title} variants={fadeUp}>
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      variants={cardHover}
                      className="gradient-border bg-surface/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-border text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-text-muted mt-0.5 flex-shrink-0">
                          <Icon />
                        </div>
                        <div>
                          <Text
                            variant="small"
                            className="uppercase tracking-[0.25em] mb-2"
                          >
                            {feature.label}
                          </Text>

                          <Heading as="h4" className="mb-2">
                            {feature.title}
                          </Heading>

                          <Text variant="muted">{feature.description}</Text>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
