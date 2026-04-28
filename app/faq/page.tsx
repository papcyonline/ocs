import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "FAQ | OCS — Ottri Cleaning Services",
  description:
    "Common questions about booking, supplies, pets, pricing, and our satisfaction guarantee.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-5 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-28">
          <PageHeader eyebrow="FAQ" title="Frequently asked." />

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-700 md:mt-10 md:text-lg">
            Quick answers about booking, supplies, pets, pricing, and our
            satisfaction guarantee. Don&rsquo;t see what you need?{" "}
            <a
              href="/#contact"
              className="font-medium text-oranje-600 underline underline-offset-2 hover:text-oranje-700"
            >
              Get in touch.
            </a>
          </p>

          <div className="mt-12 md:mt-16">
            <div className="h-px w-full bg-neutral-200" />
            <div className="divide-y divide-neutral-200">
              <LegalSection number="01" title="Booking & scheduling">
                <h3>How quickly can I book a clean?</h3>
                <p>
                  Same-day bookings are available depending on your area. Most
                  quotes are returned within 2 business days. For commercial and
                  post-construction work, we&rsquo;ll schedule a free on-site
                  walkthrough first.
                </p>

                <h3>What&rsquo;s your cancellation policy?</h3>
                <p>
                  We ask for at least 24 hours notice for cancellations or
                  rescheduling. Cancellations inside that window may incur a $25
                  fee.
                </p>

                <h3>Do you work weekends?</h3>
                <p>
                  Yes — we&rsquo;re available Mon–Sat, 8:00 AM to 6:00 PM.
                </p>
              </LegalSection>

              <LegalSection number="02" title="On the day">
                <h3>Do I need to be home?</h3>
                <p>
                  No. Most clients give us a key, code, or arrange entry through
                  a building manager. We&rsquo;re insured, bonded, and
                  background-checked for your peace of mind.
                </p>

                <h3>What supplies do you bring?</h3>
                <p>
                  We bring all standard cleaning supplies — eco-friendly by
                  default. If you have specific products you&rsquo;d like us to
                  use (allergies, surface preferences), let us know at booking.
                </p>

                <h3>How long does a typical clean take?</h3>
                <p>
                  A 1–2 bedroom standard clean usually takes 1–2 hours. Larger
                  homes and deep cleans take longer. We&rsquo;ll give you an
                  estimate when we quote.
                </p>
              </LegalSection>

              <LegalSection number="03" title="Pets & family">
                <h3>Are you OK with pets in the home?</h3>
                <p>
                  Yes — we love pets. Just let us know at booking so we plan
                  accordingly.
                </p>

                <h3>Are your products safe for kids and pets?</h3>
                <p>
                  Yes — we use eco-friendly, low-VOC supplies as standard.
                  Surfaces are safe to use shortly after we leave.
                </p>
              </LegalSection>

              <LegalSection number="04" title="Pricing & payment">
                <h3>What&rsquo;s included in the base price?</h3>
                <p>
                  Kitchen, bathrooms, and all common areas. Add-ons like inside
                  oven, fridge, basement, or windows are available a la carte.
                  Current rates are shown inside our quote request flow.
                </p>

                <h3>Do you offer discounts for recurring service?</h3>
                <p>
                  Yes — recurring bookings (weekly, bi-weekly, or monthly) save
                  20% off our one-time rates.
                </p>

                <h3>How do I pay?</h3>
                <p>
                  We accept major credit cards, ACH, and check. Payment is due
                  within 7 days of service completion.
                </p>
              </LegalSection>

              <LegalSection number="05" title="Satisfaction">
                <h3>What if I&rsquo;m not happy with the clean?</h3>
                <p>
                  Contact us within 24 hours and we&rsquo;ll return at no charge
                  to make it right.
                </p>

                <h3>Are you insured?</h3>
                <p>
                  Yes — fully insured and bonded. We carry general liability
                  insurance covering our work.
                </p>
              </LegalSection>

              <LegalSection number="06" title="Service areas">
                <h3>Where do you serve?</h3>
                <p>
                  Greater Louisville, Kentucky — including Downtown, Suburban
                  Hills, Riverside, Westside, North Valley, and surrounding
                  areas. New neighborhoods are added regularly.
                </p>

                <h3>Do you do commercial work?</h3>
                <p>
                  Yes — offices, retail, churches, hospitals, shopping centers,
                  and post-construction. We&rsquo;re DBE Certified for
                  government-eligible contracts.
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
