import { GeometricSection } from "@/components/ui/geometric-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/features/hero-section";
import { CoreExperienceSection } from "@/components/features/core-experience-section";
import { InsightSection } from "@/components/features/insight-section";
import { PricingSection } from "@/components/features/pricing-section";
import { FaqSection } from "@/components/features/faq-section";
import { WhatsNextSection } from "@/components/features/whats-next-section";
import { BottomCtaSection } from "@/components/features/bottom-cta-section";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <GeometricSection accent="top-right">
        <CoreExperienceSection />
      </GeometricSection>

      <GeometricSection accent="bottom-left">
        <InsightSection />
      </GeometricSection>

      <GeometricSection accent="center">
        <PricingSection />
      </GeometricSection>

      <GeometricSection accent="top-right">
        <FaqSection />
      </GeometricSection>

      <GeometricSection accent="bottom-left">
        <WhatsNextSection />
      </GeometricSection>

      <GeometricSection accent="center">
        <BottomCtaSection />
      </GeometricSection>

      <Footer className="w-full px-0" />
    </main>
  );
}
