"use client";

import { motion } from "motion/react";
import { cinematicTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const variants = {
  primary: "bg-cta text-cta-text",
  secondary: "bg-transparent text-text border border-text/20",
};

const base =
  "font-body font-bold text-base px-8 py-4 tracking-wide uppercase rounded-none inline-block";

export function Button({
  children,
  href,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02, opacity: 0.9 }}
        whileTap={{ scale: 0.98 }}
        transition={cinematicTransition}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02, opacity: 0.9 }}
      whileTap={{ scale: 0.98 }}
      transition={cinematicTransition}
      {...props}
    >
      {children}
    </motion.button>
  );
}
