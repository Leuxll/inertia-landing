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
    <Section fullHeight={false} className="py-24 md:py-32 lg:py-40">
      <Container size="narrow">
        <ScrollReveal variant="stagger" className="flex flex-col items-center text-center gap-6">
          <motion.div variants={fadeUp}>
            <Text variant="small" className="uppercase tracking-[0.3em]">
              The Model
            </Text>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Heading as="h2">
              No Subscriptions.{"\n"}No Trials. No Tricks.
            </Heading>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-xl">
            <Text variant="muted" className="text-lg md:text-xl leading-relaxed">
              Momentum is free. Not freemium. Not &ldquo;free for 7 days.&rdquo;
              Free. When we launch Pro, you&rsquo;ll choose: a yearly subscription
              or one single purchase. Your call, not ours.
            </Text>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-lg mt-2">
            <Text variant="muted">
              Pro unlocks things like deeper insights and custom themes —
              but the core experience? That&rsquo;s yours. Forever.
            </Text>
          </motion.div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
