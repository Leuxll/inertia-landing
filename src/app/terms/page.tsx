import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Terms of Service | Inertia",
  description: "Terms of service for Inertia.",
};

export default function TermsPage() {
  return (
    <main>
      <Section fullHeight={false} className="pt-32 pb-20 md:pb-24">
        <Container size="narrow" className="space-y-12">
          <header className="space-y-4">
            <Text variant="small" className="uppercase tracking-[0.3em]">
              Legal
            </Text>
            <Heading as="h1" className="text-4xl md:text-5xl lg:text-6xl">
              Terms of Service
            </Heading>
            <Text variant="muted">Last Updated: February 24, 2026</Text>
          </header>

          <section className="space-y-4">
            <Heading as="h3">1. Acceptance of Terms</Heading>
            <Text variant="muted">
              By downloading or using Inertia (&apos;the App&apos;), you agree to these
              Terms. If you do not agree, do not use the App. The App is
              operated by Yue Fung Lee (&apos;Provider&apos;).
            </Text>
          </section>

          <section className="space-y-4">
            <Heading as="h3">2. Medical Disclaimer</Heading>
            <Text className="uppercase tracking-wide">
              Inertia is not a medical device and does not provide medical
              advice.
            </Text>
            <Text variant="muted">
              The AI Coach and Reflection features are provided for
              informational and self-improvement purposes only and may be
              inaccurate.
            </Text>
            <ul className="list-disc pl-6 space-y-2 font-body text-text-muted text-base md:text-lg leading-relaxed">
              <li>
                Do not use the App to diagnose, prevent, monitor, or treat any
                medical condition.
              </li>
              <li>
                Consult qualified professionals before starting new fitness or
                health regimens.
              </li>
              <li>
                Provider disclaims liability for actions taken based on
                AI-generated suggestions.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <Heading as="h3">3. Ownership and License</Heading>
            <ul className="list-disc pl-6 space-y-2 font-body text-text-muted text-base md:text-lg leading-relaxed">
              <li>
                Limited license: a revocable, non-exclusive license for personal
                use.
              </li>
              <li>
                Lifetime access: access to the current Pro feature set for the
                lifetime of supported operation on your platform; does not
                guarantee access to future paid features.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <Heading as="h3">4. User Data and Backup</Heading>
            <Text variant="muted">
              Inertia is offline-first. You are responsible for maintaining your
              own backups.
            </Text>
            <ul className="list-disc pl-6 space-y-2 font-body text-text-muted text-base md:text-lg leading-relaxed">
              <li>
                Provider is not responsible for data loss caused by device
                theft, device failure, or operating-system issues.
              </li>
              <li>
                You are responsible for exporting JSON backups at intervals that
                work for you.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <Heading as="h3">5. Third-Party Services</Heading>
            <Text variant="muted">
              Inertia may integrate with Apple HealthKit, Google Health
              Connect, TikTok, and similar services. Your use of those services
              is governed by their own terms and privacy policies.
            </Text>
          </section>

          <section className="space-y-4">
            <Heading as="h3">6. Limitation of Liability</Heading>
            <Text className="uppercase tracking-wide">
              To the fullest extent permitted by law in British Columbia, the
              App is provided &quot;as is.&quot;
            </Text>
            <ul className="list-disc pl-6 space-y-2 font-body text-text-muted text-base md:text-lg leading-relaxed">
              <li>
                Provider is not liable for indirect, incidental, or
                consequential damages, including data loss.
              </li>
              <li>
                Total liability will not exceed the amount paid for the App.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <Heading as="h3">7. Governing Law</Heading>
            <Text variant="muted">
              These Terms are governed by the laws of British Columbia, Canada.
              Disputes will be resolved in the courts of Vancouver, British
              Columbia.
            </Text>
          </section>
        </Container>
      </Section>
    </main>
  );
}
