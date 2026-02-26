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
        className="absolute -inset-10 md:-inset-12 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244,244,240,0.04) 0%, rgba(244,244,240,0.015) 45%, transparent 72%)",
        }}
        animate={prefersReducedMotion ? {} : { scale: [1, 1.02, 1] }}
        transition={{
          duration: 7,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Phone device frame */}
      <motion.div
        className="relative w-[260px] md:w-[320px] lg:w-[360px] aspect-[9/19.5] rounded-[2.5rem] border border-border bg-surface overflow-hidden shadow-[0_0_70px_rgba(244,244,240,0.035)]"
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
          sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 360px"
        />
      </motion.div>
    </div>
  );
}
