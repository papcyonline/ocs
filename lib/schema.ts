import { site, absoluteUrl } from "@/lib/site";

const ORG_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

// Service catalog mirrors the on-page Services section so answer engines can
// enumerate exactly what OCS offers.
const serviceCatalog = [
  {
    name: "Residential Cleaning",
    items: [
      "One-time deep cleans",
      "Recurring (weekly, bi-weekly, monthly)",
      "Move-in & move-out",
      "Inside oven & fridge",
    ],
  },
  {
    name: "Commercial Cleaning",
    items: [
      "Office & janitorial",
      "Restroom services",
      "Strip & wax",
      "Pressure washing",
    ],
  },
  {
    name: "Post-Construction Cleaning",
    items: [
      "New construction cleans",
      "Terminal cleaning",
      "Window & glass",
      "Debris removal",
    ],
  },
];

function sameAs(): string[] {
  return Object.values(site.social).filter((url) => url && url !== "#");
}

function aggregateRating() {
  // Only emit a rating when there is a real review count behind it; an
  // unsupported AggregateRating is a structured-data violation.
  if (!site.rating.count || site.rating.count < 1) return undefined;
  return {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    bestRating: site.rating.best,
    reviewCount: site.rating.count,
  };
}

// CleaningService is a LocalBusiness subtype — the strongest fit for OCS and
// the anchor node every other schema references via @id.
export function localBusinessSchema() {
  const rating = aggregateRating();
  const links = sameAs();
  return {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.shortName,
    url: site.url,
    description: site.description,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.emails[0],
    priceRange: site.priceRange,
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/icon"),
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      ...(site.address.postalCode
        ? { postalCode: site.address.postalCode }
        : {}),
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: {
      "@type": "City",
      name: "Louisville",
      "@id": "https://www.wikidata.org/wiki/Q43668",
    },
    openingHoursSpecification: site.openingHours.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: serviceCatalog.map((svc) => ({
        "@type": "OfferCatalog",
        name: svc.name,
        itemListElement: svc.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item },
        })),
      })),
    },
    ...(rating ? { aggregateRating: rating } : {}),
    ...(links.length ? { sameAs: links } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceSchema(svc: {
  name: string;
  slug: string;
  description: string;
  included: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${svc.slug}#service`),
    name: svc.name,
    serviceType: svc.name,
    description: svc.description,
    url: absoluteUrl(`/services/${svc.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Louisville" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: svc.name,
      itemListElement: svc.included.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

// Service offered in a specific neighborhood — ties the OCS business node to a
// named place so local search understands where we operate.
export function areaServiceSchema(area: {
  name: string;
  slug: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/cleaning/${area.slug}#service`),
    name: `Cleaning Services in ${area.name}`,
    serviceType: "Cleaning service",
    description: area.description,
    url: absoluteUrl(`/cleaning/${area.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "Place",
      name: area.name,
      containedInPlace: { "@type": "City", name: "Louisville" },
    },
  };
}

// Mirrors the on-page "How it works" steps so answer engines can surface the
// booking process. Keep in sync with components/HowItWorks.tsx.
export function howToSchema() {
  const steps = [
    {
      name: "Get a quote",
      text: "Tell us about your space. Free estimate, no commitment.",
    },
    {
      name: "Pick a time",
      text: "Same-day or scheduled. You choose what fits.",
    },
    {
      name: "We clean",
      text: "Insured, bonded crew. Eco-friendly supplies included.",
    },
    {
      name: "You approve",
      text: "Not perfect? We're back within 24 hours. Free.",
    },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to book a cleaning with Ottri Cleaning Services",
    description:
      "Book residential, commercial, or post-construction cleaning in greater Louisville in four steps.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
