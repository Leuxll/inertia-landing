"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { track } from "@vercel/analytics";
import { isWaitlistMode } from "@/lib/config";
import { smoothTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

const APP_STORE_URL = "https://apps.apple.com/app/inertia-habit-tracker/id1234567890"; // Replace with your actual App Store URL

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Inertia"
    >
      {/* Inertia logo: circle with three foundation lines below */}
      <circle
        cx="16"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="10"
        y1="26"
        x2="10"
        y2="22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="28"
        x2="16"
        y2="22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="26"
        x2="22"
        y2="22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Nav() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [trackedScroll50, setTrackedScroll50] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const threshold = window.innerHeight * 0.8;
      setScrolledPastHero(window.scrollY > threshold);

      if (!trackedScroll50) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable > 0) {
          const pct = window.scrollY / scrollable;
          if (pct >= 0.5) {
            try {
              track("scroll_50", {
                path: window.location.pathname,
              });
            } catch {
              // Best effort only.
            }
            setTrackedScroll50(true);
          }
        }
      }
    }

    // Check initial position (in case user refreshes mid-page)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackedScroll50]);

  function handleCtaClick() {
    if (!isWaitlistMode) return; // download mode uses href
    try {
      track("nav_cta_click", { path: window.location.pathname });
    } catch {
      // Best effort only.
    }
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
        scrolledPastHero ? "bg-bg" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-8 lg:px-12 py-4">
        {/* Logo — always visible */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("hero")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-text hover:opacity-80 transition-opacity"
        >
          <LogoMark />
        </a>

        {/* CTA — only visible after scrolling past hero */}
        <AnimatePresence>
          {scrolledPastHero && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={smoothTransition}
            >
              {isWaitlistMode ? (
                <button
                  onClick={handleCtaClick}
                  className="font-body font-bold text-sm px-5 py-2.5 tracking-wide uppercase bg-cta text-cta-text hover:opacity-90 transition-opacity"
                >
                  <span className="hidden sm:inline">Get Early Access</span>
                  <span className="sm:hidden">Join</span>
                </button>
              ) : (
                <a
                  href={APP_STORE_URL}
                  className="font-body font-bold text-sm px-5 py-2.5 tracking-wide uppercase bg-cta text-cta-text hover:opacity-90 transition-opacity inline-block"
                >
                  Download
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
