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
  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -4, 0],
        rotateZ: [0, 0.25, 0],
      };

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
        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <motion.div
          className="relative w-[230px] md:w-[250px] lg:w-[270px] xl:w-[290px] 2xl:w-[320px] max-h-[60vh] aspect-[9/19.5] rounded-[2.5rem] border border-border bg-surface overflow-hidden shadow-[0_0_70px_rgba(244,244,240,0.035)]"
          animate={floatAnimation}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 6.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }
          }
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
            sizes="(max-width: 768px) 230px, (max-width: 1024px) 250px, (max-width: 1280px) 270px, (max-width: 1536px) 290px, 320px"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
