import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing services provided by Ottri Cleaning Services LLC in the greater Louisville, KY area.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-5 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-28">
          <PageHeader
            eyebrow="Terms"
            title="Terms of Service."
            updated="April 24, 2026"
          />

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-700 md:mt-10 md:text-lg">
            These Terms govern your use of services provided by Ottri Cleaning
            Services LLC (&ldquo;OCS&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;). By booking a service with us, you agree to these
            Terms.
          </p>

          <div className="mt-12 md:mt-16">
            <div className="h-px w-full bg-neutral-200" />
            <div className="divide-y divide-neutral-200">
              <LegalSection number="01" title="Services">
                <p>
                  OCS provides residential cleaning, commercial cleaning,
                  post-construction cleaning, and related janitorial services in
                  the greater Louisville, Kentucky area. Services are scheduled
                  subject to availability and confirmed in writing.
                </p>
              </LegalSection>

              <LegalSection number="02" title="Quotes and pricing">
                <p>
                  Residential pricing is shown inside our quote request flow.
                  Final pricing depends on home size, condition, and selected
                  add-ons. Commercial and post-construction work is quoted
                  on-site after a free walkthrough.
                </p>
              </LegalSection>

              <LegalSection number="03" title="Booking and payment">
                <p>
                  Bookings are confirmed once we receive your acceptance of the
                  quote. Payment is due within 7 days of service completion
                  unless otherwise agreed. We accept major credit cards, ACH,
                  and check.
                </p>
              </LegalSection>

              <LegalSection number="04" title="Cancellation">
                <p>
                  Please give us at least 24 hours notice for cancellations or
                  rescheduling. Cancellations within 24 hours of the scheduled
                  service may be subject to a $25 fee.
                </p>
              </LegalSection>

              <LegalSection number="05" title="Satisfaction guarantee">
                <p>
                  If you&rsquo;re not satisfied with a clean, contact us within
                  24 hours and we will return at no additional cost to address
                  the issue.
                </p>
              </LegalSection>

              <LegalSection number="06" title="Property access">
                <p>
                  You agree to provide reasonable access to the property at the
                  scheduled time. If our crew cannot access the property, a $50
                  lockout fee may apply.
                </p>
              </LegalSection>

              <LegalSection number="07" title="Liability">
                <p>
                  OCS carries general liability insurance and is bonded. We are
                  responsible for damage caused by our negligence up to the
                  limits of our coverage. We are not liable for:
                </p>
                <ul>
                  <li>Pre-existing damage or normal wear</li>
                  <li>
                    Damage to items not disclosed as fragile, antique, or
                    high-value
                  </li>
                  <li>Loss of items not in their original location</li>
                </ul>
              </LegalSection>

              <LegalSection number="08" title="Eco-friendly products">
                <p>
                  We use eco-friendly cleaning supplies as standard. If you
                  require specific products (e.g. for allergies), please notify
                  us at booking.
                </p>
              </LegalSection>

              <LegalSection number="09" title="Background checks">
                <p>
                  All OCS technicians pass background checks before
                  client-facing work.
                </p>
              </LegalSection>

              <LegalSection number="10" title="Changes to terms">
                <p>
                  We may update these Terms from time to time. Continued use of
                  our services after changes are posted constitutes acceptance.
                </p>
              </LegalSection>

              <LegalSection number="11" title="Governing law">
                <p>
                  These Terms are governed by the laws of the Commonwealth of
                  Kentucky.
                </p>
              </LegalSection>

              <LegalSection number="12" title="Contact">
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
