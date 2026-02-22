import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Privacy Policy | Inertia",
  description: "Privacy policy for Inertia.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Section fullHeight={false} className="pt-32 pb-20 md:pb-24">
        <Container size="narrow" className="space-y-12">
          <header className="space-y-4">
            <Text variant="small" className="uppercase tracking-[0.3em]">
              Legal
            </Text>
            <Heading as="h1" className="text-4xl md:text-5xl lg:text-6xl">
              Privacy Policy
            </Heading>
            <Text variant="muted">Effective Date: February 24, 2026</Text>
          </header>

          <section className="space-y-4">
            <Heading as="h3">1. Introduction</Heading>
            <Text variant="muted">
              Inertia (&apos;we,&apos; &apos;our,&apos; or &apos;us&apos;) is designed as a local-first
              application. Your habit data, journal entries, and health metrics
              are stored on your device. We do not run a central sync server for
              your personal health data.
            </Text>
          </section>

          <section className="space-y-4">
            <Heading as="h3">2. Data Collection and Storage</Heading>
            <Heading as="h4">A. Local Data (Stored on Your Device)</Heading>
            <ul className="list-disc pl-6 space-y-2 font-body text-text-muted text-base md:text-lg leading-relaxed">
              <li>
                Habit data: habits created, completion history, and streak data.
              </li>
              <li>Journal entries: text input for reflections.</li>
              <li>
                Health data: steps, sleep, and mindfulness minutes synced via
                Apple HealthKit or Google Health Connect.
              </li>
            </ul>
            <Heading as="h4">B. On-Device AI Processing</Heading>
            <Text variant="muted">
              Inertia uses local AI processing on your device to analyze
              behavior and generate reflections. Your personal data is not sent
              to cloud AI providers for these in-app features.
            </Text>
            <Heading as="h4">C. Data We Collect Through Third Parties</Heading>
            <ul className="list-disc pl-6 space-y-2 font-body text-text-muted text-base md:text-lg leading-relaxed">
              <li>Device information (model, OS version, region).</li>
              <li>Usage events (for example, viewed paywall).</li>
              <li>Transaction data (for example, subscription or lifetime unlock).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <Heading as="h3">3. Third-Party Service Providers</Heading>
            <Text variant="muted">
              We share limited data with service providers to operate the app:
            </Text>
            <ul className="list-disc pl-6 space-y-2 font-body text-text-muted text-base md:text-lg leading-relaxed">
              <li>
                RevenueCat for subscription and purchase validation.
              </li>
              <li>
                PostHog for product analytics and experimentation. Health data is
                excluded.
              </li>
              <li>
                TikTok Event SDK for marketing attribution. We do not share
                HealthKit or Health Connect data with TikTok.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <Heading as="h3">4. HealthKit and Health Connect Privacy</Heading>
            <ul className="list-disc pl-6 space-y-2 font-body text-text-muted text-base md:text-lg leading-relaxed">
              <li>
                Health data is used only to support product functionality (for
                example, automatic habit completion).
              </li>
              <li>Health data is not used for advertising.</li>
              <li>
                Health data is not sold to data brokers, advertisers, or
                information resellers.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <Heading as="h3">5. Data Retention and Backup</Heading>
            <ul className="list-disc pl-6 space-y-2 font-body text-text-muted text-base md:text-lg leading-relaxed">
              <li>
                No cloud backup: Inertia does not maintain a remote backup of
                your personal records.
              </li>
              <li>
                Export support: You can export data through Settings &gt; Export
                JSON.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <Heading as="h3">6. Children&apos;s Privacy</Heading>
            <Text variant="muted">
              Inertia is intended for users 18 years and older. We do not
              knowingly collect personal data from children under 18.
            </Text>
          </section>

          <section className="space-y-4">
            <Heading as="h3">7. Contact Us</Heading>
            <Text variant="muted">Yue Fung Lee</Text>
            <Text variant="muted">
              Email: <a className="underline" href="mailto:hello@getinertia.app">hello@getinertia.app</a>
            </Text>
            <Text variant="muted">Burnaby, British Columbia, Canada</Text>
          </section>
        </Container>
      </Section>
    </main>
  );
}
