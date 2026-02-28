import { GeometricDivider } from "@/components/ui/geometric-divider";
import { GeometricSection } from "@/components/ui/geometric-section";
import { HeroSection } from "@/components/features/hero-section";
import { CoreExperienceSection } from "@/components/features/core-experience-section";
import { InsightSection } from "@/components/features/insight-section";
import { PricingSection } from "@/components/features/pricing-section";
import { WhatsNextSection } from "@/components/features/whats-next-section";
import { BottomCtaSection } from "@/components/features/bottom-cta-section";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <GeometricDivider variant="lines" className="py-6 md:py-8" />

      <GeometricSection accent="top-right">
        <CoreExperienceSection />
      </GeometricSection>

      <GeometricDivider variant="dots" className="py-4 md:py-6" />

      <GeometricSection accent="bottom-left">
        <InsightSection />
      </GeometricSection>

      <GeometricDivider variant="circle" className="py-6 md:py-8" />

      <GeometricSection accent="center">
        <PricingSection />
      </GeometricSection>

      <GeometricDivider variant="lines" className="py-6 md:py-8" />

      <GeometricSection accent="bottom-left">
        <WhatsNextSection />
      </GeometricSection>

      <GeometricDivider variant="dots" className="py-6 md:py-8" />

      <GeometricSection accent="center">
        <BottomCtaSection />
      </GeometricSection>
    </main>
  );
}
