import type { StaticImageData } from "next/image";
import downtownImg from "@/Images/pexels-tima-miroshnichenko-6195122.jpg";
import highlandsImg from "@/Images/pexels-tima-miroshnichenko-6196693.jpg";
import stMatthewsImg from "@/Images/pexels-tima-miroshnichenko-6196694.jpg";
import eastEndImg from "@/Images/pexels-tima-miroshnichenko-6197111.jpg";
import southImg from "@/Images/pexels-tima-miroshnichenko-6197117.jpg";

export type LocationContent = {
  slug: string;
  // neighborhood name, e.g. "The Highlands"
  name: string;
  // name used mid-sentence, e.g. "the Highlands"
  inline: string;
  metaTitle: string;
  h1: string;
  metaDescription: string;
  lead: string;
  highlights: string[];
  image: StaticImageData;
  imageAlt: string;
  faqs: { question: string; answer: string }[];
};

export const locations: LocationContent[] = [
  {
    slug: "downtown",
    name: "Downtown Louisville",
    inline: "Downtown",
    metaTitle: "Cleaning Services in Downtown Louisville, KY",
    h1: "Cleaning services in Downtown Louisville.",
    metaDescription:
      "Office, condo, and post-construction cleaning in Downtown Louisville and NuLu. Insured, bonded, DBE certified. After-hours scheduling for businesses. Free quote.",
    lead:
      "From high-rise offices and NuLu storefronts to riverfront condos, Downtown runs on a tight schedule. We clean around your business hours and keep shared spaces presentable for tenants, staff, and customers.",
    highlights: [
      "Office & janitorial for downtown businesses",
      "Condo and apartment turnovers",
      "After-hours and weekend scheduling",
      "Post-construction cleans for new developments",
    ],
    image: downtownImg,
    imageAlt: "Professional cleaning crew working in a downtown Louisville office",
    faqs: [
      {
        question: "Do you clean downtown offices after business hours?",
        answer:
          "Yes — we schedule evenings and weekends so cleaning never interrupts your team or customers. We can coordinate building access with property management.",
      },
    ],
  },
  {
    slug: "highlands",
    name: "The Highlands",
    inline: "the Highlands",
    metaTitle: "House Cleaning in the Highlands, Louisville KY",
    h1: "House cleaning in the Highlands.",
    metaDescription:
      "House cleaning for the Highlands and Bardstown Road area of Louisville, KY. Deep cleans, recurring service, and move-in/move-out for historic homes. Pet-friendly. Free quote.",
    lead:
      "The Highlands is full of character — historic bungalows, shotgun houses, and renovated Victorians along Bardstown Road. Older homes need a careful hand, and our background-checked crews bring eco-friendly, pet-safe supplies to every visit.",
    highlights: [
      "Deep cleans for older and historic homes",
      "Recurring weekly, bi-weekly, or monthly upkeep",
      "Move-in & move-out cleans for renters",
      "Pet- and kid-safe eco-friendly products",
    ],
    image: highlandsImg,
    imageAlt: "OCS crew deep-cleaning a historic Highlands home in Louisville",
    faqs: [
      {
        question: "Do you clean older homes in the Highlands?",
        answer:
          "Yes — we're experienced with historic bungalows, shotgun houses, and renovated Victorians common in the Highlands. We use surface-appropriate, low-VOC products throughout.",
      },
    ],
  },
  {
    slug: "st-matthews",
    name: "St. Matthews",
    inline: "St. Matthews",
    metaTitle: "House Cleaning in St. Matthews, Louisville KY",
    h1: "House cleaning in St. Matthews.",
    metaDescription:
      "Recurring and deep house cleaning in St. Matthews, Louisville KY. Family homes, condos, and move-out cleans. Same crew every visit, satisfaction guaranteed. Free quote.",
    lead:
      "St. Matthews families keep busy schedules, and recurring cleaning keeps the house handled without the hassle. Same trusted crew every visit, eco-friendly supplies included, and a 20% discount on recurring service.",
    highlights: [
      "Recurring service for busy households",
      "One-time deep cleans before guests or events",
      "Move-in & move-out cleans",
      "Same background-checked crew each visit",
    ],
    image: stMatthewsImg,
    imageAlt: "OCS team cleaning a family home in St. Matthews, Louisville",
    faqs: [
      {
        question: "Do you offer recurring cleaning in St. Matthews?",
        answer:
          "Yes — weekly, bi-weekly, or monthly. Recurring bookings save 20% off our one-time rates and keep the same crew assigned to your home.",
      },
    ],
  },
  {
    slug: "east-end",
    name: "East End",
    inline: "the East End",
    metaTitle: "House Cleaning in Louisville's East End, KY",
    h1: "House cleaning in the East End.",
    metaDescription:
      "House and new-construction cleaning across Louisville's East End, KY. Larger homes, recurring service, and move-in ready new-build cleans. Insured and bonded. Free quote.",
    lead:
      "The East End's larger and newer homes call for a crew that's thorough and dependable. From recurring upkeep to move-in-ready cleans on new construction, we handle the whole home so you don't have to.",
    highlights: [
      "Recurring upkeep for larger homes",
      "Move-in cleans for new construction",
      "Inside oven, fridge, and window add-ons",
      "Insured, bonded, background-checked crews",
    ],
    image: eastEndImg,
    imageAlt: "OCS crew cleaning a large East End home in Louisville",
    faqs: [
      {
        question: "Do you clean newly built homes in the East End?",
        answer:
          "Yes — we handle both move-in cleans for new homeowners and full post-construction cleaning for builders turning over new East End properties.",
      },
    ],
  },
  {
    slug: "south-louisville",
    name: "South Louisville",
    inline: "South Louisville",
    metaTitle: "House Cleaning in South Louisville, KY",
    h1: "House cleaning in South Louisville.",
    metaDescription:
      "Affordable, reliable house cleaning across South Louisville, KY. One-time deep cleans, recurring service, and move-out cleans. Locally owned, insured, and bonded. Free quote.",
    lead:
      "South Louisville's established neighborhoods deserve straightforward, dependable cleaning. We're locally owned, fairly priced, and back every clean with a satisfaction guarantee — if it's not right, we return within 24 hours.",
    highlights: [
      "One-time and recurring house cleaning",
      "Move-in & move-out cleans",
      "Fair, transparent pricing",
      "Locally owned with a 24-hour guarantee",
    ],
    image: southImg,
    imageAlt: "OCS crew cleaning a home in South Louisville",
    faqs: [
      {
        question: "What does house cleaning cost in South Louisville?",
        answer:
          "Pricing depends on the size of your home and the type of clean. We keep rates fair and transparent — get a free, no-commitment quote for an exact estimate.",
      },
    ],
  },
];

export function getLocation(slug: string): LocationContent | undefined {
  return locations.find((l) => l.slug === slug);
}
