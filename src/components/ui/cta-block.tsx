import { ctaMode, isWaitlistMode } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface CtaBlockProps {
  className?: string;
}

export function CtaBlock({ className }: CtaBlockProps) {
  if (isWaitlistMode) {
    return (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-md">
          <input
            type="email"
            disabled
            placeholder="you@example.com"
            className="flex-1 bg-surface text-text border border-border rounded-none px-4 py-4 font-body text-base placeholder:text-text-muted/50 disabled:opacity-70"
          />
          <Button>Get Early Access</Button>
        </div>
        <Text variant="small">Currently in {ctaMode} mode</Text>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <Button href="https://apps.apple.com">Download on App Store</Button>
      <Text variant="small">Currently in {ctaMode} mode</Text>
    </div>
  );
}
