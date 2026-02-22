"use client";

import { motion, useReducedMotion } from "motion/react";

export function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span className="font-body text-xs text-text-muted/50 uppercase tracking-[0.2em]">
        Scroll
      </span>
      <motion.div
        className="w-px h-8 bg-gradient-to-b from-text-muted/40 to-transparent"
        animate={
          prefersReducedMotion
            ? {}
            : { scaleY: [1, 0.5, 1], opacity: [0.6, 0.3, 0.6] }
        }
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
