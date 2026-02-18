"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface GeometricAccentProps {
  className?: string;
}

export function GeometricAccent({ className }: GeometricAccentProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  // Track scroll progress through the hero section (hooks must be called unconditionally)
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  // Parallax: large circle drifts 60px up as user scrolls
  const y1Raw = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Parallax: small circle drifts 30px up (slower = feels closer)
  const y2Raw = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Use static 0 when reduced-motion
  const y1 = prefersReducedMotion ? 0 : y1Raw;
  const y2 = prefersReducedMotion ? 0 : y2Raw;

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden",
        className
      )}
    >
      {/* Large slowly rotating circle — ambient depth */}
      <motion.div
        className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full border border-text/[0.04]"
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        style={{ y: y1 }}
        transition={{
          duration: 90,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Smaller offset arc for layered depth */}
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-text/[0.03]"
        animate={prefersReducedMotion ? {} : { rotate: -360 }}
        style={{ y: y2, translate: "10% -5%" }}
        transition={{
          duration: 120,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
