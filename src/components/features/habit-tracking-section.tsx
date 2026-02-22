import { FeatureSection } from "@/components/ui/feature-section";

export function HabitTrackingSection() {
  return (
    <FeatureSection
      id="features"
      headline="It Hurts."
      headlineAccent="It Helps."
      description="Track what matters. Skip the gamification. Just you and your streaks, beautifully laid bare."
      screenshotSrc="/screenshots/home.png"
      screenshotAlt="Inertia daily habit tracker showing Exercise completed, Hydration and Sleep tracking"
      imagePosition="left"
      screenshotPriority={true}
    />
  );
}
