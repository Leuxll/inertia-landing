"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { smoothTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface WaitlistCounterProps {
  className?: string;
}

export function WaitlistCounter({ className }: WaitlistCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/waitlist");
        if (!res.ok) return;
        const data = await res.json();
        if (typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        // Silently fail — counter is non-critical
      }
    }

    fetchCount();
  }, []);

  // Only display when count exceeds 25
  if (count === null || count <= 25) return null;

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={smoothTransition}
      className={cn(
        "font-body text-sm text-text-muted leading-relaxed",
        className
      )}
    >
      {count.toLocaleString()} people joined
    </motion.p>
  );
}
