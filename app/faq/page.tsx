import type { Metadata } from "next";
import { Fragment } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { LegalSection } from "@/components/LegalSection";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about booking, supplies, pets, pricing, and our satisfaction guarantee — cleaning across greater Louisville, KY.",
  alternates: { canonical: "/faq" },
};

const faqGroups = [
  {
    number: "01",
    title: "Booking & scheduling",
    qa: [
      {
        question: "How quickly can I book a clean?",
        answer:
          "Same-day bookings are available depending on your area. Most quotes are returned within 2 business days. For commercial and post-construction work, we'll schedule a free on-site walkthrough first.",
      },
      {
        question: "What's your cancellation policy?",
        answer:
          "We ask for at least 24 hours notice for cancellations or rescheduling. Cancellations inside that window may incur a $25 fee.",
      },
      {
        question: "Do you work weekends?",
        answer: "Yes — we're available Mon–Sat, 8:00 AM to 6:00 PM.",
      },
    ],
  },
  {
    number: "02",
    title: "On the day",
    qa: [
      {
        question: "Do I need to be home?",
        answer:
          "No. Most clients give us a key, code, or arrange entry through a building manager. We're insured, bonded, and background-checked for your peace of mind.",
      },
      {
        question: "What supplies do you bring?",
        answer:
          "We bring all standard cleaning supplies — eco-friendly by default. If you have specific products you'd like us to use (allergies, surface preferences), let us know at booking.",
      },
      {
        question: "How long does a typical clean take?",
        answer:
          "A 1–2 bedroom standard clean usually takes 1–2 hours. Larger homes and deep cleans take longer. We'll give you an estimate when we quote.",
      },
    ],
  },
  {
    number: "03",
    title: "Pets & family",
    qa: [
      {
        question: "Are you OK with pets in the home?",
        answer:
          "Yes — we love pets. Just let us know at booking so we plan accordingly.",
      },
      {
        question: "Are your products safe for kids and pets?",
        answer:
          "Yes — we use eco-friendly, low-VOC supplies as standard. Surfaces are safe to use shortly after we leave.",
      },
    ],
  },
  {
    number: "04",
    title: "Pricing & payment",
    qa: [
      {
        question: "What's included in the base price?",
        answer:
          "Kitchen, bathrooms, and all common areas. Add-ons like inside oven, fridge, basement, or windows are available a la carte. Current rates are shown inside our quote request flow.",
      },
      {
        question: "Do you offer discounts for recurring service?",
        answer:
          "Yes — recurring bookings (weekly, bi-weekly, or monthly) save 20% off our one-time rates.",
      },
      {
        question: "How do I pay?",
        answer:
          "We accept major credit cards, ACH, and check. Payment is due within 7 days of service completion.",
      },
    ],
  },
  {
    number: "05",
    title: "Satisfaction",
    qa: [
      {
        question: "What if I'm not happy with the clean?",
        answer:
          "Contact us within 24 hours and we'll return at no charge to make it right.",
      },
      {
        question: "Are you insured?",
        answer:
          "Yes — fully insured and bonded. We carry general liability insurance covering our work.",
      },
    ],
  },
  {
    number: "06",
    title: "Service areas",
    qa: [
      {
        question: "Where do you serve?",
        answer:
          "Greater Louisville, Kentucky — including Downtown, the Highlands, St. Matthews, the East End, South Louisville, and surrounding areas. New neighborhoods are added regularly.",
      },
      {
        question: "Do you do commercial work?",
        answer:
          "Yes — offices, retail, churches, hospitals, shopping centers, and post-construction. We're DBE Certified for government-eligible contracts.",
      },
    ],
  },
];

export default function FaqPage() {
  const allQa = faqGroups.flatMap((g) => g.qa);

  return (
    <>
      <JsonLd
        data={[
          faqPageSchema(allQa),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
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
              {faqGroups.map((group) => (
                <LegalSection
                  key={group.number}
                  number={group.number}
                  title={group.title}
                >
                  {group.qa.map((item) => (
                    <Fragment key={item.question}>
                      <h3>{item.question}</h3>
                      <p>{item.answer}</p>
                    </Fragment>
                  ))}
                </LegalSection>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
