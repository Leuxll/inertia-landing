"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { track } from "@vercel/analytics";
import { isWaitlistMode } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { smoothTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";
import {
  getClientWaitlistAttribution,
  getWaitlistAttributionEventData,
} from "@/lib/waitlist-attribution";

type FormStatus = "idle" | "loading" | "success" | "error";

interface CtaBlockProps {
  className?: string;
  compact?: boolean;
  centered?: boolean;
  inline?: boolean;
  placement?: "hero" | "bottom";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function CtaBlock({
  className,
  compact = false,
  centered = false,
  placement = "hero",
  inline = false,
}: CtaBlockProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputStartedTracked, setInputStartedTracked] = useState(false);
  const emailInputId = useId();
  const emailHintId = `${emailInputId}-hint`;
  const emailErrorId = `${emailInputId}-error`;

  function trackFormEvent(
    eventName: string,
    extra: Record<string, string | number | boolean | null> = {},
  ) {
    const attribution = getClientWaitlistAttribution();
    const attributionData = getWaitlistAttributionEventData(attribution);

    try {
      track(eventName, {
        placement,
        ...attributionData,
        ...extra,
      });
    } catch {
      // Best effort only.
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Client-side validation
    if (!isValidEmail(email)) {
      trackFormEvent("waitlist_error", { reason: "invalid_email" });
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const attribution = getClientWaitlistAttribution();

    trackFormEvent("waitlist_submit");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, placement, attribution }),
      });

      if (res.ok) {
        await res.json().catch(() => null);
        trackFormEvent("waitlist_success");

        setStatus("success");
      } else {
        const data = await res.json().catch(() => null);
        trackFormEvent("waitlist_error", {
          reason: typeof data?.code === "string" ? data.code : "api_error",
          status_code: res.status,
        });

        setStatus("error");
        setErrorMessage(
          data?.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      trackFormEvent("waitlist_error", {
        reason: "network_error",
      });

      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (!isWaitlistMode) {
    return (
      <div className={cn("flex flex-col", centered ? "items-center" : "items-start", className)}>
        <Button href="https://apps.apple.com/app/inertia-habit-tracker/id1234567890">Download on App Store</Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col w-full",
        centered ? "items-center" : "items-start",
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
            className={cn("flex flex-col gap-2 py-4", centered ? "items-center" : "items-start")}
          >
            <Heading as="h4" className={centered ? "text-center" : "text-left"}>
              You&rsquo;re in.
            </Heading>
            <Text variant="muted" className={centered ? "text-center" : "text-left"}>
              Check your inbox, spam, and promotions.
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
              "flex flex-col w-full",
              centered ? "items-center" : "items-start",
              compact ? "gap-3" : "gap-4"
            )}
          >
            <div className={cn("w-full", inline ? "max-w-none" : "max-w-md")}>
              <label
                htmlFor={emailInputId}
                className={cn(
                  "font-body text-xs uppercase tracking-[0.14em] text-text-muted/70",
                  centered ? "text-center" : "text-left",
                )}
              >
                Email address
              </label>
            </div>

            <div
              className={cn(
                "flex w-full",
                inline ? "flex-col sm:flex-row gap-2" : "flex-col max-w-md",
                !inline && (compact ? "gap-2" : "gap-3")
              )}
            >
              <input
                id={emailInputId}
                type="email"
                value={email}
                onFocus={() => {
                  if (!inputStartedTracked) {
                    trackFormEvent("email_input_started");
                    setInputStartedTracked(true);
                  }
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorMessage("");
                  }
                }}
                disabled={status === "loading"}
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                aria-invalid={status === "error"}
                aria-describedby={
                  status === "error" && errorMessage
                    ? `${emailHintId} ${emailErrorId}`
                    : emailHintId
                }
                className={cn("bg-surface text-text border border-border rounded-none px-4 py-3 font-body text-base placeholder:text-text-muted/50 focus:border-text/30 focus:ring-1 focus:ring-text/20 focus:outline-none disabled:opacity-50 transition-all duration-300", inline ? "w-full sm:flex-1" : "w-full")}
              />
              <Button
                type="submit"
                onClick={() => trackFormEvent("waitlist_cta_click")}
                disabled={status === "loading"}
                className={cn(
                  "text-center",
                  inline ? "w-full sm:w-auto sm:shrink-0 sm:px-8" : "w-full",
                  placement === "hero" && "cta-polish-button"
                )}
              >
                {status === "loading"
                  ? "Joining..."
                  : placement === "hero"
                    ? "Get Access"
                    : "Get Early Access"}
              </Button>
            </div>

            <p
              id={emailHintId}
              className={cn(
                "font-body text-sm leading-relaxed text-text-muted/70",
                centered ? "text-center" : "text-left",
              )}
            >
              Invite-only onboarding. No spam. Unsubscribe anytime.
            </p>

            {status === "error" && errorMessage && (
              <p
                id={emailErrorId}
                className="font-body text-sm leading-relaxed text-text-muted/80"
              >
                {errorMessage}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
