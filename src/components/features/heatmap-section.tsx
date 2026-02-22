import { FeatureSection } from "@/components/ui/feature-section";

export function HeatmapSection() {
  return (
    <FeatureSection
      headline="Decode the Patterns"
      headlineAccent="That Define You."
      description="Heatmaps and insights that reveal what your consistency actually looks like — no sugar-coating."
      screenshotSrc="/screenshots/habit-detail.png"
      screenshotAlt="Inertia habit detail showing 13-day streak, 85% weekly consistency, and activity heatmap"
      imagePosition="right"
    />
  );
}
