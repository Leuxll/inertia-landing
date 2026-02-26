import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { CSSProperties } from "react";

interface TextProps {
  children: ReactNode;
  variant?: "default" | "muted" | "small";
  className?: string;
  as?: "p" | "span" | "div";
  style?: CSSProperties;
}

const variantMap = {
  default: "text-text text-base md:text-lg leading-relaxed",
  muted: "text-text-muted text-base md:text-lg leading-relaxed",
  small: "text-text-muted text-sm leading-relaxed",
};

export function Text({
  children,
  variant = "default",
  className,
  as: Tag = "p",
  style,
}: TextProps) {
  return (
    <Tag className={cn("font-body", variantMap[variant], className)} style={style}>
      {children}
    </Tag>
  );
}
