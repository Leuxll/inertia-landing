"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { track } from "@vercel/analytics";
import { smoothTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface WaitlistCounterProps {
  className?: string;
  placement?: "hero" | "bottom";
  minCount?: number;
  rounded?: boolean;
  tone?: "default" | "chip";
}

let sharedCount: number | null | undefined;
let sharedCountRequest: Promise<number | null> | null = null;

async function fetchWaitlistCountOnce(): Promise<number | null> {
  if (sharedCount !== undefined) return sharedCount;
  if (sharedCountRequest) return sharedCountRequest;

  sharedCountRequest = (async () => {
    try {
      const res = await fetch("/api/waitlist");
      if (!res.ok) return null;
      const data = await res.json();
      const next = typeof data.count === "number" ? data.count : null;
      sharedCount = next;
      return next;
    } catch {
      return null;
    } finally {
      sharedCountRequest = null;
    }
  })();

  return sharedCountRequest;
}

function formatRoundedCount(count: number): string {
  if (count < 10) return `${count}`;
  if (count < 100) return `${Math.floor(count / 5) * 5}+`;
  if (count < 1000) return `${count.toLocaleString()}`;
  return `${Math.floor(count / 10) * 10}+`;
}

export function WaitlistCounter({
  className,
  placement = "hero",
  minCount = 10,
  rounded = true,
  tone = "default",
}: WaitlistCounterProps) {
  const [count, setCount] = useState<number | null>(() =>
    sharedCount === undefined ? null : sharedCount,
  );
  const trackedVisibleRef = useRef(false);

  useEffect(() => {
    if (sharedCount !== undefined) {
      return;
    }

    fetchWaitlistCountOnce().then((next) => {
      if (typeof next === "number") {
        setCount(next);
      }
    });
  }, []);

  const visible = count !== null && count >= minCount;
  const displayCount = useMemo(() => {
    if (count === null) return null;
    return rounded ? formatRoundedCount(count) : count.toLocaleString();
  }, [count, rounded]);

  useEffect(() => {
    if (!visible || trackedVisibleRef.current || count === null) return;
    trackedVisibleRef.current = true;
    try {
      track("waitlist_count_visible", {
        placement,
        count_bucket:
          count < 10 ? "<10" : count < 25 ? "10-24" : count < 50 ? "25-49" : count < 100 ? "50-99" : "100+",
      });
    } catch {
      // Best effort only.
    }
  }, [visible, count, placement]);

  if (!visible || displayCount === null) return null;

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={smoothTransition}
      className={cn(
        tone === "chip"
          ? "inline-flex items-center rounded-full border border-border bg-surface/70 px-3 py-1.5 font-body text-xs uppercase tracking-[0.14em] text-text-muted/80"
          : "font-body text-sm text-text-muted leading-relaxed",
        className
      )}
    >
      {displayCount} builders joined early access
    </motion.p>
  );
}
