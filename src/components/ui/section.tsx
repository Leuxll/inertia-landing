import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
}

export function Section({
  children,
  className,
  id,
  fullHeight = false,
}: SectionProps) {
  return (
    <section
      id={id}
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
