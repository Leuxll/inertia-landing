import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function PhoneFrame({ src, alt, className, priority }: PhoneFrameProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Ambient glow behind phone */}
      <div
        className="absolute -inset-8 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(244,244,240,0.03) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative w-[260px] md:w-[280px] lg:w-[300px] aspect-[9/19.5] rounded-[2.5rem] border border-border bg-surface overflow-hidden shadow-[0_0_60px_rgba(244,244,240,0.03)]"
      >
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[24px] rounded-full bg-bg z-10" />

        {/* Screenshot */}
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 260px, (max-width: 1024px) 280px, 300px"
        />
      </div>
    </div>
  );
}
