import { FeatureSection } from "@/components/ui/feature-section";

export function HabitTrackingSection() {
  return (
    <FeatureSection
      id="features"
      headline="It Hurts."
      headlineAccent="It Helps."
      description="Track what matters. Skip the gamification. Just you and your streaks, beautifully laid bare."
      screenshotSrc="/screenshots/placeholder-habits.svg"
      screenshotAlt="Momentum habit tracking interface showing daily habits with completion status"
      imagePosition="left"
      screenshotPriority={true}
    />
  );
}
