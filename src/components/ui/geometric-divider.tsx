"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GeometricDividerProps {
  className?: string;
  variant?: "dots" | "lines" | "circle";
}

export function GeometricDivider({ className, variant = "dots" }: GeometricDividerProps) {
  if (variant === "circle") {
    return (
      <div className={cn("flex justify-center py-8 md:py-12", className)}>
        <motion.div
          className="w-16 h-16 rounded-full border border-text/10"
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (variant === "lines") {
    return (
      <div className={cn("flex justify-center items-center gap-4 py-8 md:py-12", className)}>
        <motion.div
          className="w-12 h-px bg-text/20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-text/20"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        />
        <motion.div
          className="w-12 h-px bg-text/20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    );
  }

  // Default: dots
  return (
    <div className={cn("flex justify-center items-center gap-2 py-8 md:py-12", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-text/30"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.4, 
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}