"use client";

import { useId, useState, useCallback } from "react";
import { track } from "@vercel/analytics";
import {
  getClientWaitlistAttribution,
  getWaitlistAttributionEventData,
} from "@/lib/waitlist-attribution";

type FormStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface UseWaitlistFormOptions {
  placement: "hero" | "bottom";
}

export function useWaitlistForm({ placement }: UseWaitlistFormOptions) {
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

  const handleInputFocus = useCallback(() => {
    if (!inputStartedTracked) {
      trackFormEvent("email_input_started");
      setInputStartedTracked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputStartedTracked]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (status === "error") {
        setStatus("idle");
        setErrorMessage("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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
      trackFormEvent("waitlist_error", { reason: "network_error" });
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return {
    email,
    status,
    errorMessage,
    emailInputId,
    emailHintId,
    emailErrorId,
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
    handleSubmit,
    handleInputFocus,
    handleInputChange,
    trackFormEvent,
  };
}