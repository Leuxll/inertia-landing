import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { CSSProperties } from "react";

interface HeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  accent?: boolean;
  style?: CSSProperties;
}

const sizeMap = {
  h1: "text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl tracking-tight",
  h2: "text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl tracking-tight",
  h3: "text-2xl md:text-3xl lg:text-4xl",
  h4: "text-xl md:text-2xl",
};

export function Heading({
  children,
  as: Tag = "h2",
  className,
  accent,
  style,
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-text leading-tight",
        sizeMap[Tag],
        accent && "italic",
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
