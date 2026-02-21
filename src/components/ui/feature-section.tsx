"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { fadeUp } from "@/lib/animations";
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
  screenshotPriority?: boolean;
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
  screenshotPriority,
}: FeatureSectionProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to feature section (hooks must be called unconditionally)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: phone frame drifts 20px up as section scrolls through viewport
  const phoneYRaw = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Use static 0 when reduced-motion
  const phoneY = prefersReducedMotion ? 0 : phoneYRaw;

  return (
    <div ref={sectionRef}>
      <Section
        id={id}
        fullHeight
        className={cn("justify-center py-24 md:py-28 lg:py-32", className)}
      >
        <Container>
          <ScrollReveal variant="stagger">
            <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              {/* Phone frame column */}
              <motion.div
                variants={fadeUp}
                style={{ y: phoneY }}
                className={cn(
                  "flex justify-center order-2 lg:order-none",
                  imagePosition === "right" && "lg:order-2",
                )}
              >
                <PhoneFrame
                  src={screenshotSrc}
                  alt={screenshotAlt}
                  priority={screenshotPriority}
                />
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
    </div>
  );
}
