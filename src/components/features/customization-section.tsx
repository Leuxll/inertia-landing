import { FeatureSection } from "@/components/ui/feature-section";

export function CustomizationSection() {
  return (
    <FeatureSection
      headline="Make It"
      headlineAccent="Yours."
      description="Dark themes, custom accents, your layout — because a tool should feel like it belongs to you."
      screenshotSrc="/screenshots/placeholder-customize.svg"
      screenshotAlt="Momentum customization options showing theme and appearance settings"
      imagePosition="left"
    />
  );
}
