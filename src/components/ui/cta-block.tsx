"use client";

import { motion, AnimatePresence } from "motion/react";
import { isWaitlistMode } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { smoothTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useWaitlistForm } from "@/lib/use-waitlist-form";

interface CtaBlockProps {
  className?: string;
  compact?: boolean;
  centered?: boolean;
  inline?: boolean;
  placement?: "hero" | "bottom";
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function SuccessMessage({ centered }: { centered: boolean }) {
  return (
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
  );
}

interface WaitlistFormProps {
  form: ReturnType<typeof useWaitlistForm>;
  centered: boolean;
  compact: boolean;
  inline: boolean;
  placement: "hero" | "bottom";
}

function WaitlistForm({
  form,
  centered,
  compact,
  inline,
  placement,
}: WaitlistFormProps) {
  return (
    <motion.form
      key="form"
      onSubmit={form.handleSubmit}
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
          htmlFor={form.emailInputId}
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
          id={form.emailInputId}
          type="email"
          value={form.email}
          onFocus={form.handleInputFocus}
          onChange={form.handleInputChange}
          disabled={form.isLoading}
          placeholder="you@example.com"
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-invalid={form.isError}
          aria-describedby={
            form.isError && form.errorMessage
              ? `${form.emailHintId} ${form.emailErrorId}`
              : form.emailHintId
          }
          className={cn("bg-surface text-text border border-border rounded-none px-4 py-3 font-body text-base placeholder:text-text-muted/50 focus:border-text/30 focus:ring-1 focus:ring-text/20 focus:outline-none disabled:opacity-50 transition-all duration-300", inline ? "w-full sm:flex-1" : "w-full")}
        />
        <Button
          type="submit"
          onClick={() => form.trackFormEvent("waitlist_cta_click")}
          disabled={form.isLoading}
          className={cn(
            "text-center",
            inline ? "w-full sm:w-auto sm:shrink-0 sm:px-8" : "w-full",
            placement === "hero" && "cta-polish-button"
          )}
        >
          {form.isLoading
            ? "Joining..."
            : placement === "hero"
              ? "Get Access"
              : "Get Early Access"}
        </Button>
      </div>

      <p
        id={form.emailHintId}
        className={cn(
          "font-body text-sm leading-relaxed text-text-muted/70",
          centered ? "text-center" : "text-left",
        )}
      >
        Invite-only onboarding. No spam. Unsubscribe anytime.
      </p>

      {form.isError && form.errorMessage && (
        <p
          id={form.emailErrorId}
          className="font-body text-sm leading-relaxed text-text-muted/80"
        >
          {form.errorMessage}
        </p>
      )}
    </motion.form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export function CtaBlock({
  className,
  compact = false,
  centered = false,
  placement = "hero",
  inline = false,
}: CtaBlockProps) {
  const form = useWaitlistForm({ placement });

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
        {form.isSuccess ? (
          <SuccessMessage centered={centered} />
        ) : (
          <WaitlistForm
            form={form}
            centered={centered}
            compact={compact}
            inline={inline}
            placement={placement}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
