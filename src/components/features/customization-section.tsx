import { FeatureSection } from "@/components/ui/feature-section";

export function CustomizationSection() {
  return (
    <FeatureSection
      headline="Make It"
      headlineAccent="Yours."
      description="Choose from curated templates or build from scratch. Your habits, your categories, your system — designed around how you actually live."
      screenshotSrc="/screenshots/templates.png"
      screenshotAlt="Inertia pattern selection showing customizable habit templates for hydration, exercise, sleep, and meditation"
      imagePosition="left"
    />
  );
}
