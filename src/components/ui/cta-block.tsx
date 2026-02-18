"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { isWaitlistMode } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { smoothTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

interface CtaBlockProps {
  className?: string;
  compact?: boolean;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function CtaBlock({ className, compact = false }: CtaBlockProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Client-side validation
    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          data?.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (!isWaitlistMode) {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <Button href="https://apps.apple.com">Download on App Store</Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center w-full",
        compact ? "gap-3" : "gap-4",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={smoothTransition}
            className="flex flex-col items-center gap-2 py-4"
          >
            <Heading as="h4" className="text-center">
              You&rsquo;re in.
            </Heading>
            <Text variant="muted" className="text-center">
              Check your inbox.
            </Text>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={smoothTransition}
            className={cn(
              "flex flex-col items-center w-full",
              compact ? "gap-3" : "gap-4"
            )}
          >
            <div
              className={cn(
                "flex flex-col w-full max-w-md",
                compact ? "gap-2" : "gap-3"
              )}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorMessage("");
                  }
                }}
                disabled={status === "loading"}
                placeholder="you@example.com"
                className="w-full bg-surface text-text border border-border rounded-none px-4 py-4 font-body text-base placeholder:text-text-muted/50 focus:border-text/30 focus:ring-1 focus:ring-text/20 focus:outline-none disabled:opacity-50 transition-all duration-300"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full text-center"
              >
                {status === "loading" ? "Joining..." : "Get Early Access"}
              </Button>
            </div>

            {status === "error" && errorMessage && (
              <Text variant="small" className="text-text-muted/80">
                {errorMessage}
              </Text>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
