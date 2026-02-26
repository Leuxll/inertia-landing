import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "hero";
}

const sizes = {
  default: "max-w-5xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
  hero: "max-w-6xl",
};

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full", sizes[size], className)}>
      {children}
    </div>
  );
}
