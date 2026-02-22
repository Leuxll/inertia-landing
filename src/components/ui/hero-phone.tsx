"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface HeroPhoneProps {
  src: string;
  alt: string;
  className?: string;
}

export function HeroPhone({ src, alt, className }: HeroPhoneProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <div className={cn("relative", className)}>
      {/* Ambient glow behind the phone */}
      <motion.div
        className="absolute -inset-12 md:-inset-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244,244,240,0.05) 0%, rgba(244,244,240,0.02) 40%, transparent 70%)",
        }}
        animate={prefersReducedMotion ? {} : { scale: [1, 1.04, 1] }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Phone device frame */}
      <motion.div
        className="relative w-[240px] md:w-[280px] lg:w-[320px] aspect-[9/19.5] rounded-[2.5rem] border border-border bg-surface overflow-hidden shadow-[0_0_80px_rgba(244,244,240,0.04)]"
        initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.3 }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[24px] rounded-full bg-bg z-10" />

        {/* Screenshot */}
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
        />
      </motion.div>
    </div>
  );
}
