import { Quotes, Star } from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { GoogleLogo, YelpLogo, BBBLogo } from "@/components/BrandLogos";

type Testimonial = {
  quote: string;
  author: string;
  location: string;
  logo: ComponentType<{ className?: string }>;
  logoClass: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Professional, thorough, and left my place sparkling clean. Highly recommend.",
    author: "Sara Johnson",
    location: "Downtown",
    logo: GoogleLogo,
    logoClass: "h-6 w-6",
  },
  {
    quote:
      "Reliable janitorial for our office. Same crew every week, never a missed detail.",
    author: "Marcus Reed",
    location: "Suburban Hills · Office Manager",
    logo: BBBLogo,
    logoClass: "h-6 w-9",
  },
  {
    quote:
      "Booked a move-out clean Friday, done by Saturday. Spotless. Got my deposit back.",
    author: "Priya Patel",
    location: "Riverside",
    logo: YelpLogo,
    logoClass: "h-6 w-6",
  },
  {
    quote:
      "Post-construction cleanup was perfect. Move-in ready the next morning.",
    author: "David Kim",
    location: "Westside",
    logo: GoogleLogo,
    logoClass: "h-6 w-6",
  },
  {
    quote:
      "Eco-friendly products, professional team. Great with kids and pets at home.",
    author: "Mariana López",
    location: "North Valley",
    logo: GoogleLogo,
    logoClass: "h-6 w-6",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          weight="fill"
          className="h-3.5 w-3.5 text-oranje-500"
        />
      ))}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  const Logo = t.logo;
  return (
    <article className="flex w-[320px] shrink-0 flex-col rounded-3xl bg-white p-7 sm:w-[360px]">
      <Quotes weight="fill" className="h-7 w-7 text-oranje-500" />
      <div className="mt-4">
        <Stars />
      </div>
      <p className="mt-5 flex-1 font-display text-lg leading-snug text-black sm:text-xl">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-black">{t.author}</p>
          <p className="text-xs text-neutral-600">{t.location}</p>
        </div>
        <Logo className={`shrink-0 ${t.logoClass}`} />
      </div>
    </article>
  );
}

export function Testimonials() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative z-50 bg-neutral-100 md:sticky md:top-0 md:min-h-[150svh]"
    >
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-6 md:pt-20">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            Testimonials
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-black sm:mt-5 sm:text-5xl md:text-5xl">
            What clients say.
          </h2>
        </div>

        <div className="mt-10 h-px w-full bg-neutral-200 md:mt-12" />
      </div>

      <div className="group relative mt-10 overflow-hidden pb-16 md:pb-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-neutral-100 to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-neutral-100 to-transparent sm:w-20" />

        <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <Card key={`${t.author}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
