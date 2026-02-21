import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  snap?: boolean;
}

export function Section({
  children,
  className,
  id,
  fullHeight = true,
  snap = fullHeight,
}: SectionProps) {
  return (
    <section
      id={id}
      data-lenis-snap={snap ? "true" : "false"}
      className={cn(
        "flex flex-col items-center py-24 px-6 md:px-8 lg:px-12",
        fullHeight && "min-h-dvh",
        className,
      )}
    >
      {children}
    </section>
  );
}
