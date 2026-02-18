"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer, noMotion, noMotionStagger } from "@/lib/animations";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "fadeUp" | "stagger";
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // When reduced-motion: use instant-visible variants, no viewport gating needed
  const variants = prefersReducedMotion
    ? (variant === "stagger" ? noMotionStagger : noMotion)
    : (variant === "stagger" ? staggerContainer : fadeUp);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
      style={delay && !prefersReducedMotion ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </motion.div>
  );
}
