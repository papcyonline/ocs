export const site = {
  name: "Ottri Cleaning Services",
  shortName: "OCS",
  legalName: "Ottri Cleaning Services LLC",
  url: "https://ottri.net",
  description:
    "Residential, commercial, and post-construction cleaning across greater Louisville, KY. Insured, bonded, and DBE certified.",
  phone: "502-390-7925",
  phoneHref: "tel:+15023907925",
  emails: ["info@ottri.net", "george@ottriorganics.com"],
  city: "Louisville, KY",
  hours: "Mon–Sat · 8:00 AM – 6:00 PM",
  uei: "JBE5GCLMAP74",
  naics: "561720 / 561790",
  owner: "George Ngi",
  priceRange: "$$",
  // Postal address. Street is omitted until a public business address is
  // confirmed; locality/region still power local-pack and map matching.
  address: {
    locality: "Louisville",
    region: "KY",
    postalCode: "",
    country: "US",
  },
  // Approximate centroid of the Louisville, KY metro for geo signals.
  geo: { lat: 38.2527, lng: -85.7585 },
  // Primary market. Keep this in lockstep everywhere (NAP consistency).
  serviceArea: "Greater Louisville, KY",
  // Machine-readable opening hours for schema (Mon–Sat, 08:00–18:00).
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  // Aggregate review signals shown on-site and marked up in schema.
  // ratingValue/best are real; replace reviewCount with the verified total
  // from Google + Yelp before relying on it for rich results.
  rating: {
    value: 4.9,
    best: 5,
    count: 0, // TODO: set to the real combined review count
    google: 4.9,
    yelp: 4.8,
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how-it-works" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  social: {
    facebook: "#",
    instagram: "#",
    x: "#",
    linkedin: "#",
  },
};

// Absolute URL helper for canonicals, sitemap, and structured data.
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}
