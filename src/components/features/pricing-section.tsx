"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { fadeUp } from "@/lib/animations";

export function PricingSection() {
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
                The Model
              </Text>

              <Heading as="h2">
                No Subscriptions.{"\n"}No Trials. No Tricks.
              </Heading>

              <Text
                variant="muted"
                className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Momentum is free. Not freemium. Not &ldquo;free for 7 days.&rdquo;
                Free. When we launch Pro, you&rsquo;ll choose: a yearly subscription
                or one single purchase. Your call, not ours.
              </Text>

              <Text variant="muted" className="max-w-lg mx-auto lg:mx-0">
                Pro unlocks things like deeper insights and custom themes, but
                the core experience stays yours forever.
              </Text>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 lg:p-10">
                <div className="space-y-6">
                  <div>
                    <Text
                      variant="small"
                      className="uppercase tracking-[0.25em] mb-2"
                    >
                      Today
                    </Text>
                    <Heading as="h4">Free Core Experience</Heading>
                    <Text variant="muted" className="mt-2">
                      Habits, streaks, and the essential Momentum flow.
                    </Text>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <Text
                      variant="small"
                      className="uppercase tracking-[0.25em] mb-2"
                    >
                      At Launch
                    </Text>
                    <Heading as="h4">Optional Pro</Heading>
                    <Text variant="muted" className="mt-2">
                      Choose yearly or one-time. No traps, no forced upgrades.
                    </Text>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
