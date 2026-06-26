import type { StaticImageData } from "next/image";
import residentialImg from "@/Images/pexels-tima-miroshnichenko-6196677.jpg";
import commercialImg from "@/Images/pexels-tima-miroshnichenko-6195277.jpg";
import postBuildImg from "@/Images/pexels-tima-miroshnichenko-6195276.jpg";

export type ServiceContent = {
  slug: string;
  eyebrow: string;
  // schema serviceType + nav label
  name: string;
  // <title> and <h1>
  metaTitle: string;
  h1: string;
  metaDescription: string;
  lead: string;
  included: string[];
  idealFor: string[];
  image: StaticImageData;
  imageAlt: string;
  faqs: { question: string; answer: string }[];
};

export const services: ServiceContent[] = [
  {
    slug: "residential-cleaning",
    eyebrow: "Residential cleaning",
    name: "Residential Cleaning",
    metaTitle: "House Cleaning in Louisville, KY",
    h1: "House cleaning in Louisville.",
    metaDescription:
      "Professional house cleaning across greater Louisville, KY — one-time deep cleans, recurring service, and move-in/move-out. Insured, bonded, and background-checked. Get a free quote.",
    lead:
      "From a one-time refresh to weekly upkeep, our background-checked crews keep Louisville homes spotless. Same team every visit, eco-friendly supplies included, and a satisfaction guarantee on every clean.",
    included: [
      "One-time deep cleans",
      "Recurring service — weekly, bi-weekly, or monthly",
      "Move-in & move-out cleans",
      "Kitchens: counters, sinks, exterior of appliances",
      "Inside oven & refrigerator (add-on)",
      "Bathrooms: tubs, showers, toilets, mirrors",
      "Dusting, vacuuming, mopping all common areas",
      "Interior windows & glass (add-on)",
    ],
    idealFor: [
      "Busy households and working parents",
      "Tenants needing a deposit-back move-out clean",
      "New homeowners settling in",
      "Anyone wanting recurring upkeep at a 20% discount",
    ],
    image: residentialImg,
    imageAlt: "OCS crew cleaning a modern residential kitchen in Louisville",
    faqs: [
      {
        question: "How much does house cleaning cost in Louisville?",
        answer:
          "Pricing depends on the size of your home and the type of clean. Recurring bookings save 20% off our one-time rates. Get a free, no-commitment quote and we'll give you an exact estimate.",
      },
      {
        question: "Do I need to be home during the clean?",
        answer:
          "No. Most clients give us a key, code, or arrange entry. We're insured, bonded, and background-checked for your peace of mind.",
      },
      {
        question: "Are your products safe for kids and pets?",
        answer:
          "Yes — we use eco-friendly, low-VOC supplies as standard. Surfaces are safe to use shortly after we leave.",
      },
    ],
  },
  {
    slug: "commercial-cleaning",
    eyebrow: "Commercial cleaning",
    name: "Commercial Cleaning",
    metaTitle: "Commercial & Office Cleaning in Louisville, KY",
    h1: "Commercial cleaning in Louisville.",
    metaDescription:
      "Office, retail, and janitorial cleaning across greater Louisville, KY. Restroom service, strip & wax, pressure washing. Insured, bonded, and DBE certified for government-eligible contracts.",
    lead:
      "Reliable janitorial and office cleaning that keeps your business presentable and your team healthy. Flexible after-hours scheduling, consistent crews, and DBE certification for government-eligible contracts.",
    included: [
      "Office & general janitorial service",
      "Restroom cleaning & restocking",
      "Floor care — strip, wax, and buff",
      "Pressure washing for exteriors and walkways",
      "Common areas, break rooms, and lobbies",
      "Trash removal & recycling",
      "Day-porter and after-hours scheduling",
      "Retail, churches, hospitals & shopping centers",
    ],
    idealFor: [
      "Offices and coworking spaces",
      "Retail storefronts and shopping centers",
      "Churches, clinics, and medical offices",
      "Property managers needing recurring janitorial",
    ],
    image: commercialImg,
    imageAlt:
      "OCS team arriving on-site with professional commercial cleaning equipment",
    faqs: [
      {
        question: "Can you clean after business hours?",
        answer:
          "Yes — we schedule around your operations, including evenings and weekends, so cleaning never interrupts your team or customers.",
      },
      {
        question: "Are you certified for government contracts?",
        answer:
          "Yes — we're DBE Certified, which makes us eligible for government and prime-contractor work. Our UEI and NAICS codes are listed in the site footer.",
      },
      {
        question: "Do you offer recurring janitorial contracts?",
        answer:
          "Yes — daily, weekly, or custom schedules. We'll do a free on-site walkthrough first and build a scope and quote around your space.",
      },
    ],
  },
  {
    slug: "post-construction-cleaning",
    eyebrow: "Post-construction cleaning",
    name: "Post-Construction Cleaning",
    metaTitle: "Post-Construction Cleaning in Louisville, KY",
    h1: "Post-construction cleaning in Louisville.",
    metaDescription:
      "Post-construction and new-build cleaning across greater Louisville, KY — dust, debris, window, and terminal cleaning that turns a finished site over move-in ready. Insured, bonded, DBE certified.",
    lead:
      "We turn a finished build into a move-in-ready space — fine construction dust, debris haul-off, window and glass detailing, and final terminal cleaning. Built for GCs, builders, and developers on deadline.",
    included: [
      "Rough, final, and terminal cleaning phases",
      "Construction dust removal from all surfaces",
      "Window, frame, and glass detailing",
      "Debris removal & haul-off",
      "Floor prep — sweep, vacuum, mop, or buff",
      "Fixture, cabinet, and trim wipe-down",
      "Punch-list ready turnover",
      "New residential & commercial construction",
    ],
    idealFor: [
      "General contractors and builders",
      "Developers turning over new units",
      "Commercial fit-outs and renovations",
      "Anyone needing a move-in-ready handover",
    ],
    image: postBuildImg,
    imageAlt:
      "OCS technician cleaning a tall surface after construction in Louisville",
    faqs: [
      {
        question: "How fast can you turn around a post-construction clean?",
        answer:
          "We schedule around your handover date. For larger sites we'll do a free walkthrough first to scope the phases and give you a firm timeline.",
      },
      {
        question: "Do you handle debris removal?",
        answer:
          "Yes — debris haul-off and disposal are part of our post-construction scope, leaving the site punch-list ready.",
      },
      {
        question: "Are you insured for job-site work?",
        answer:
          "Yes — we're fully insured and bonded, carrying general liability coverage for on-site work.",
      },
    ],
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return services.find((s) => s.slug === slug);
}
