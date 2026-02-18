"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { fadeUp, staggerContainer, cardHover } from "@/lib/animations";

const upcomingFeatures = [
  {
    label: "Intelligence",
    title: "AI Reflections",
    description:
      "Patterns you can't see yourself. AI-powered insights that surface what your habits actually mean — when it's ready.",
  },
  {
    label: "Motivation",
    title: "Rest Tokens",
    description:
      "Earn rest days through consistency. A reward system that understands recovery is part of the process.",
  },
  {
    label: "Integration",
    title: "HealthKit Sync",
    description:
      "Your habits alongside your health data. Steps, sleep, and streaks in one honest picture.",
  },
];

export function WhatsNextSection() {
  return (
    <Section fullHeight={false} className="py-24 md:py-32 lg:py-40">
      <Container>
        <ScrollReveal className="flex flex-col items-center text-center gap-6">
          <Text variant="small" className="uppercase tracking-[0.3em]">
            What&rsquo;s Next
          </Text>

          <Heading as="h2">The Road Ahead</Heading>

          <Text variant="muted" className="max-w-lg text-lg md:text-xl">
            We&rsquo;re not done. Here&rsquo;s what we&rsquo;re building.
          </Text>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16"
        >
          {upcomingFeatures.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <motion.div
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="bg-surface rounded-2xl p-6 md:p-8 border border-border text-left"
              >
                <Text
                  variant="small"
                  className="uppercase tracking-[0.25em] mb-4"
                >
                  {feature.label}
                </Text>

                <Heading as="h4" className="mb-3">
                  {feature.title}
                </Heading>

                <Text variant="muted">{feature.description}</Text>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
