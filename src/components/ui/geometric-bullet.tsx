"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GeometricBulletProps {
  className?: string;
  variant?: "circle" | "square" | "line";
  size?: "sm" | "md" | "lg";
}

export function GeometricBullet({ 
  className, 
  variant = "circle",
  size = "md" 
}: GeometricBulletProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3", 
    lg: "w-4 h-4"
  };

  const baseClasses = cn(
    "flex-shrink-0",
    sizeClasses[size],
    className
  );

  if (variant === "square") {
    return (
      <motion.div
        className={cn(baseClasses, "border border-text/30")}
        initial={{ scale: 0, rotate: 45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    );
  }

  if (variant === "line") {
    return (
      <motion.div
        className={cn("flex-shrink-0 w-6 h-px bg-text/30 mt-2", className)}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    );
  }

  // Default: circle
  return (
    <motion.div
      className={cn(baseClasses, "rounded-full border border-text/30")}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
  );
}