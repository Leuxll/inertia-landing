import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  density?: "hero" | "airy" | "standard" | "dense";
}

const densityMap = {
  hero: "py-12 md:py-16 lg:py-16 xl:py-20 2xl:py-24",
  airy: "py-16 md:py-20 lg:py-20 xl:py-24 2xl:py-32",
  standard: "py-16 md:py-20 lg:py-24",
  dense: "py-12 md:py-16 lg:py-20",
} as const;

export function Section({
  children,
  className,
  id,
  fullHeight = false,
  density = "standard",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col items-center px-6 md:px-8 lg:px-12",
        densityMap[density],
        fullHeight && "min-h-dvh",
        className,
      )}
    >
      {children}
    </section>
  );
}
