"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface GeometricSectionProps {
  children: React.ReactNode;
  className?: string;
  accent?: "top-right" | "bottom-left" | "center" | "none";
}

export function GeometricSection({ 
  children, 
  className,
  accent = "none" 
}: GeometricSectionProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const getAccentElement = () => {
    if (accent === "none") return null;

    const positions = {
      "top-right": "top-8 right-8 md:top-16 md:right-16",
      "bottom-left": "bottom-8 left-8 md:bottom-16 md:left-16", 
      "center": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    };

    return (
      <motion.div
        className={cn(
          "absolute pointer-events-none",
          positions[accent]
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-text/[0.05]"
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute inset-4 md:inset-6 rounded-full border border-text/[0.08]"
          animate={prefersReducedMotion ? {} : { rotate: -360 }}
          transition={{
            duration: 40,
            ease: "linear", 
            repeat: Infinity,
          }}
        />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-text/20" />
        </div>
      </motion.div>
    );
  };

  return (
    <div className={cn("relative", className)}>
      {getAccentElement()}
      {children}
    </div>
  );
}