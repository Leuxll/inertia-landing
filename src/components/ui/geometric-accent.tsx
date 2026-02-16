"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GeometricAccentProps {
  className?: string;
}

export function GeometricAccent({ className }: GeometricAccentProps) {
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
        animate={{ rotate: 360 }}
        transition={{
          duration: 90,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Smaller offset arc for layered depth */}
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-text/[0.03]"
        animate={{ rotate: -360 }}
        transition={{
          duration: 120,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ translate: "10% -5%" }}
      />
    </div>
  );
}
