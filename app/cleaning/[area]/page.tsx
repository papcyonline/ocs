import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, Phone, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { QuoteButton } from "@/components/QuoteButton";
import { AnimatedArrow } from "@/components/icons";
import { locations, getLocation } from "@/lib/locations";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import {
  areaServiceSchema,
  faqPageSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export function generateStaticParams() {
  return locations.map((l) => ({ area: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const loc = getLocation(area);
  if (!loc) return {};
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `/cleaning/${loc.slug}` },
    openGraph: {
      title: `${loc.metaTitle} | ${site.shortName}`,
      description: loc.metaDescription,
      url: `/cleaning/${loc.slug}`,
      images: ["/opengraph-image"],
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const loc = getLocation(area);
  if (!loc) notFound();

  const others = locations.filter((l) => l.slug !== loc.slug);

  return (
    <>
      <JsonLd
        data={[
          areaServiceSchema({
            name: loc.name,
            slug: loc.slug,
            description: loc.metaDescription,
          }),
          faqPageSchema(loc.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/#contact" },
            { name: loc.name, path: `/cleaning/${loc.slug}` },
          ]),
        ]}
      />
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 pt-32 pb-12 sm:px-6 md:pt-40 md:pb-16">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-6">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
                <MapPin weight="bold" className="h-4 w-4" />
                {loc.name}
              </p>
              <h1 className="mt-4 font-display text-4xl tracking-tight text-black sm:mt-5 sm:text-5xl md:text-6xl">
                {loc.h1}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 md:text-lg">
                {loc.lead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <QuoteButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-oranje-500 px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-oranje-600">
                  Get Free Quote
                  <AnimatedArrow className="h-6 w-6" />
                </QuoteButton>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-100 px-6 py-3.5 text-base font-medium text-black transition-colors duration-200 hover:bg-neutral-200"
                >
                  <Phone weight="bold" className="h-5 w-5" />
                  {site.phone}
                </a>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src={loc.image}
                  alt={loc.imageAlt}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-64 w-full object-cover md:h-96"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16">
          <div className="h-px w-full bg-neutral-200" />
          <div className="py-12 md:py-16">
            <h2 className="font-display text-3xl tracking-tight text-black sm:text-4xl">
              How we help in {loc.inline}.
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {loc.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm font-medium text-neutral-900"
                >
                  <Check
                    weight="bold"
                    className="mt-0.5 h-4 w-4 shrink-0 text-oranje-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-px w-full bg-neutral-200" />
        </section>

        {/* Services offered here */}
        <section className="mx-auto max-w-7xl px-5 pb-4 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            Our services
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-black sm:text-4xl">
            What we clean in {loc.inline}.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-6 py-5 transition-colors hover:bg-oranje-50"
              >
                <span className="font-display text-lg text-black md:text-xl">
                  {s.name}
                </span>
                <AnimatedArrow className="h-5 w-5 text-oranje-600" />
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 md:py-16">
          <h2 className="font-display text-3xl tracking-tight text-black sm:text-4xl">
            Common questions.
          </h2>
          <div className="mt-10 h-px w-full bg-neutral-200" />
          <dl className="divide-y divide-neutral-200">
            {loc.faqs.map((f) => (
              <div key={f.question} className="py-7 md:py-8">
                <dt className="font-display text-xl text-black md:text-2xl">
                  {f.question}
                </dt>
                <dd className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-700">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Nearby areas */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-20">
          <div className="h-px w-full bg-neutral-200" />
          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            Nearby areas we serve
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/cleaning/${o.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-oranje-100"
              >
                <MapPin weight="bold" className="h-4 w-4 text-oranje-600" />
                {o.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
