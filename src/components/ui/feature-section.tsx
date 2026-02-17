"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  headline: string;
  headlineAccent?: string;
  description: string;
  screenshotSrc: string;
  screenshotAlt: string;
  imagePosition?: "left" | "right";
  id?: string;
  className?: string;
}

export function FeatureSection({
  headline,
  headlineAccent,
  description,
  screenshotSrc,
  screenshotAlt,
  imagePosition = "left",
  id,
  className,
}: FeatureSectionProps) {
  return (
    <Section id={id} fullHeight={false} className={cn("py-24 md:py-32 lg:py-40", className)}>
      <Container>
        <ScrollReveal variant="stagger">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Phone frame column */}
            <motion.div
              variants={fadeUp}
              className={cn(
                "flex justify-center order-2 lg:order-none",
                imagePosition === "right" && "lg:order-2",
              )}
            >
              <PhoneFrame src={screenshotSrc} alt={screenshotAlt} />
            </motion.div>

            {/* Text column */}
            <motion.div
              variants={fadeUp}
              className={cn(
                "flex flex-col gap-6 order-1 lg:order-none",
                imagePosition === "right" && "lg:order-1",
              )}
            >
              <Heading as="h2">
                {headline}
                {headlineAccent && (
                  <>
                    {" "}
                    <span className="italic">{headlineAccent}</span>
                  </>
                )}
              </Heading>
              <Text variant="muted">{description}</Text>
            </motion.div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
