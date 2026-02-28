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

  // Parallax: large orb drifts 80px up as user scrolls
  const y1Raw = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Parallax: small orb drifts 40px up (slower = feels closer)
  const y2Raw = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Fade out as user scrolls away from hero
  const opacityRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Use static values when reduced-motion
  const y1 = prefersReducedMotion ? 0 : y1Raw;
  const y2 = prefersReducedMotion ? 0 : y2Raw;
  const opacity = prefersReducedMotion ? 1 : opacityRaw;

  return (
    <motion.div
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden",
        className
      )}
      style={{ opacity }}
    >
      {/* Centered but contained ambient glow — doesn't reach phone area */}
      <motion.div
        className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] rounded-full"
        style={{
          y: y1,
          background:
            "radial-gradient(circle, rgba(244,244,240,0.03) 0%, rgba(244,244,240,0.015) 40%, transparent 70%)",
        }}
        animate={prefersReducedMotion ? {} : { scale: [1, 1.02, 1] }}
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Thin rotating ring — subtle geometric accent */}
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-text/[0.05]"
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        style={{ y: y2 }}
        transition={{
          duration: 120,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
