"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { fadeUp, cardHover } from "@/lib/animations";

const upcomingFeatures = [
  {
    label: "Intelligence",
    title: "AI Reflections",
    description:
      "AI-generated pattern summaries that turn streak data into honest feedback.",
  },
  {
    label: "Motivation",
    title: "Rest Tokens",
    description:
      "Earn recovery days through consistency so rest is built into the system.",
  },
  {
    label: "Integration",
    title: "HealthKit Sync",
    description:
      "See habits beside sleep, steps, and recovery in one clear timeline.",
  },
];

export function WhatsNextSection() {
  return (
    <Section fullHeight className="justify-center py-24 md:py-28 lg:py-32">
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
                We&rsquo;re building the next layer of Momentum around insight,
                recovery, and context.
              </Text>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-4">
              {upcomingFeatures.map((feature) => (
                <motion.div key={feature.title} variants={fadeUp}>
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={cardHover}
                    className="bg-surface rounded-2xl p-5 md:p-6 border border-border text-left"
                  >
                    <Text
                      variant="small"
                      className="uppercase tracking-[0.25em] mb-3"
                    >
                      {feature.label}
                    </Text>

                    <Heading as="h4" className="mb-2">
                      {feature.title}
                    </Heading>

                    <Text variant="muted">{feature.description}</Text>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
