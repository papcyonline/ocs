import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Privacy Policy | OCS — Ottri Cleaning Services",
  description:
    "How Ottri Cleaning Services collects, uses, and protects information you share through ottri.net.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-5 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-28">
          <PageHeader
            eyebrow="Privacy"
            title="Privacy Policy."
            updated="April 24, 2026"
          />

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-700 md:mt-10 md:text-lg">
            This Privacy Policy describes how Ottri Cleaning Services LLC
            (&ldquo;OCS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects,
            uses, and protects information you provide through ottri.net.
          </p>

          <div className="mt-12 md:mt-16">
            <div className="h-px w-full bg-neutral-200" />
            <div className="divide-y divide-neutral-200">
              <LegalSection number="01" title="Information we collect">
                <p>
                  When you submit a quote request through our contact form, we
                  collect:
                </p>
                <ul>
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your phone number (optional)</li>
                  <li>The service type you&rsquo;re interested in</li>
                  <li>Any message you choose to send</li>
                </ul>
              </LegalSection>

              <LegalSection number="02" title="How we use your information">
                <p>We use this information to:</p>
                <ul>
                  <li>Respond to your quote request</li>
                  <li>Schedule and confirm service appointments</li>
                  <li>Communicate about ongoing service</li>
                  <li>Process payments and maintain service records</li>
                </ul>
                <p>
                  <strong>We do not sell your personal information.</strong>
                </p>
              </LegalSection>

              <LegalSection number="03" title="Third-party services">
                <p>
                  We use{" "}
                  <a
                    href="https://resend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resend
                  </a>{" "}
                  to deliver email on our behalf. Form submissions are processed
                  through their service.
                </p>
              </LegalSection>

              <LegalSection number="04" title="Cookies">
                <p>
                  This website does not currently use tracking cookies or
                  third-party analytics. See our{" "}
                  <a href="/cookies">Cookie Policy</a> for full details.
                </p>
              </LegalSection>

              <LegalSection number="05" title="Data retention">
                <p>
                  We retain quote request information for up to 24 months after
                  your last interaction with us, unless you ask us to delete it
                  sooner.
                </p>
              </LegalSection>

              <LegalSection number="06" title="Your rights">
                <p>You may request:</p>
                <ul>
                  <li>A copy of the personal information we hold about you</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your information</li>
                  <li>Restriction of further processing</li>
                </ul>
                <p>
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:info@ottri.net">info@ottri.net</a> or call
                  502-390-7925.
                </p>
              </LegalSection>

              <LegalSection number="07" title="Children">
                <p>
                  Our services are intended for adults. We do not knowingly
                  collect personal information from children under 13.
                </p>
              </LegalSection>

              <LegalSection number="08" title="Updates to this policy">
                <p>
                  We may update this policy from time to time. Material changes
                  will be posted here with a new &ldquo;Last updated&rdquo;
                  date.
                </p>
              </LegalSection>

              <LegalSection number="09" title="Contact">
                <p>
                  Ottri Cleaning Services LLC
                  <br />
                  Louisville, KY
                  <br />
                  <a href="mailto:info@ottri.net">info@ottri.net</a> ·{" "}
                  <a href="mailto:george@ottriorganics.com">
                    george@ottriorganics.com
                  </a>
                  <br />
                  502-390-7925
                </p>
              </LegalSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
