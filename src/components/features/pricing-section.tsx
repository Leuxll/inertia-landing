"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GeometricBullet } from "@/components/ui/geometric-bullet";
import { fadeUp } from "@/lib/animations";

export function PricingSection() {
  return (
    <Section density="airy" className="justify-center">
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
                Fair Pricing.{"\n"}No Forced Subscription.
              </Heading>

              <Text
                variant="muted"
                className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Start with a free core experience. If you want more later,
                choose optional Pro with yearly or lifetime pricing.
              </Text>

              <Text variant="muted" className="max-w-lg mx-auto lg:mx-0">
                The core stays useful on its own. Pro adds deeper insights and
                extras, not basic paywalls.
              </Text>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="gradient-border bg-surface/80 backdrop-blur-sm rounded-2xl border border-border p-6 md:p-8 lg:p-10">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Text
                        variant="small"
                        className="uppercase tracking-[0.25em]"
                      >
                        At Launch
                      </Text>
                      <span className="font-body text-xs uppercase tracking-wider px-2.5 py-1 rounded-full border border-text/10 text-text/70">
                        Free forever
                      </span>
                    </div>
                    <Heading as="h4">Free Core Experience</Heading>
                    <Text variant="muted" className="mt-2 mb-4">
                      Habits, streaks, and the essential Inertia flow. No ads.
                      No data harvesting.
                    </Text>
                    <ul className="space-y-3">
                      {[
                        "Unlimited habit tracking",
                        "Streak counting & consistency insights",
                        "Clean, minimal interface",
                        "No ads, ever",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <GeometricBullet variant="circle" size="sm" />
                          <Text variant="muted" className="text-sm">
                            {feature}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Text
                        variant="small"
                        className="uppercase tracking-[0.25em]"
                      >
                        Coming Soon
                      </Text>
                      <span className="font-body text-xs uppercase tracking-wider px-2.5 py-1 rounded-full border border-text/10 text-text/70">
                        Optional Pro
                      </span>
                    </div>
                    <Heading as="h4">Advanced Features</Heading>
                    <Text variant="muted" className="mt-2 mb-4">
                      Choose yearly or lifetime. Upgrades stay optional.
                    </Text>
                    <ul className="space-y-3">
                      {[
                        "AI Reflections",
                        "Rest Tokens",
                        "HealthKit Sync",
                        "Custom themes & export"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <GeometricBullet variant="square" size="sm" />
                          <Text variant="muted" className="text-sm">
                            {feature}
                          </Text>
                        </li>
                      ))}
                    </ul>
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
