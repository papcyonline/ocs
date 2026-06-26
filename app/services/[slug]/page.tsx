import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, Phone } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { QuoteButton } from "@/components/QuoteButton";
import { AnimatedArrow } from "@/components/icons";
import { services, getService } from "@/lib/services";
import { site } from "@/lib/site";
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return {};
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    alternates: { canonical: `/services/${svc.slug}` },
    openGraph: {
      title: `${svc.metaTitle} | ${site.shortName}`,
      description: svc.metaDescription,
      url: `/services/${svc.slug}`,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const others = services.filter((s) => s.slug !== svc.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: svc.name,
            slug: svc.slug,
            description: svc.metaDescription,
            included: svc.included,
          }),
          faqPageSchema(svc.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/#services" },
            { name: svc.name, path: `/services/${svc.slug}` },
          ]),
        ]}
      />
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 pt-32 pb-12 sm:px-6 md:pt-40 md:pb-16">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
                {svc.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-4xl tracking-tight text-black sm:mt-5 sm:text-5xl md:text-6xl">
                {svc.h1}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 md:text-lg">
                {svc.lead}
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
                  src={svc.image}
                  alt={svc.imageAlt}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-64 w-full object-cover md:h-96"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What's included + Ideal for */}
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16">
          <div className="h-px w-full bg-neutral-200" />
          <div className="grid gap-12 py-12 md:grid-cols-12 md:gap-12 md:py-16">
            <div className="md:col-span-7">
              <h2 className="font-display text-3xl tracking-tight text-black sm:text-4xl">
                What&rsquo;s included.
              </h2>
              <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {svc.included.map((item) => (
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

            <div className="md:col-span-5">
              <h2 className="font-display text-3xl tracking-tight text-black sm:text-4xl">
                Ideal for.
              </h2>
              <ul className="mt-8 space-y-3.5">
                {svc.idealFor.map((item) => (
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
          </div>
          <div className="h-px w-full bg-neutral-200" />
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-5xl px-5 pb-4 sm:px-6">
          <h2 className="font-display text-3xl tracking-tight text-black sm:text-4xl">
            Common questions.
          </h2>
          <div className="mt-10 h-px w-full bg-neutral-200" />
          <dl className="divide-y divide-neutral-200">
            {svc.faqs.map((f) => (
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

        {/* Related services */}
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16">
          <div className="h-px w-full bg-neutral-200" />
          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            More services
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-6 py-5 transition-colors hover:bg-oranje-50"
              >
                <span className="font-display text-xl text-black md:text-2xl">
                  {o.name}
                </span>
                <AnimatedArrow className="h-6 w-6 text-oranje-600" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
