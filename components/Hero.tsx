import Image from "next/image";
import { Phone, Star } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import heroImage1 from "@/Images/hero.jpg";
import heroImage2 from "@/Images/pexels-tima-miroshnichenko-6195136.jpg";
import heroImage3 from "@/Images/pexels-tima-miroshnichenko-6195125.jpg";
import { GoogleLogo, YelpLogo, BBBLogo } from "@/components/BrandLogos";
import { AnimatedArrow } from "@/components/icons";

const heroSlides = [
  {
    src: heroImage1,
    alt: "OCS team cleaning a modern residential kitchen",
    delay: "0s",
  },
  {
    src: heroImage2,
    alt: "OCS crew vacuuming and mopping a living room",
    delay: "-6s",
  },
  {
    src: heroImage3,
    alt: "OCS team portrait with cleaning equipment",
    delay: "-12s",
  },
];

function StarRow() {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} weight="fill" className="h-3.5 w-3.5 text-oranje-400" />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative z-10 isolate min-h-svh overflow-hidden md:sticky md:top-0 md:min-h-[150svh]">
      {heroSlides.map((slide, i) => (
        <Image
          key={slide.alt}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          placeholder="blur"
          className="-z-10 animate-hero-carousel object-cover"
          style={{ animationDelay: slide.delay }}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="flex min-h-svh flex-col justify-center">
        <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-12 sm:px-6 md:pt-36 md:pb-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-span-8">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-oranje-400 sm:mb-6 sm:text-xs sm:tracking-[0.2em]">
              {site.city} · Insured · Bonded · DBE Certified
            </p>

            <h1 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Cleanliness is our commitment to your well-being.
            </h1>

            <p className="mt-6 font-display text-xl text-white sm:mt-8 sm:text-2xl md:text-3xl">
              Homes. Offices. Post-build.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-oranje-500 px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-oranje-600"
              >
                Get Free Quote
                <AnimatedArrow className="h-6 w-6" />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-medium text-black transition-colors duration-200 hover:bg-neutral-100"
              >
                <Phone weight="bold" className="h-5 w-5" />
                {site.phone}
              </a>
            </div>
          </div>

          <div className="md:col-span-4 md:flex md:justify-end">
            <div className="w-full max-w-xs space-y-4 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                Trusted on
              </p>

              <div className="flex items-center gap-4">
                <GoogleLogo className="h-7 w-7 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Google</p>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRow />
                    <span className="text-xs text-white/80">4.9</span>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-white/20" />

              <div className="flex items-center gap-4">
                <YelpLogo className="h-7 w-7 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Yelp</p>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRow />
                    <span className="text-xs text-white/80">4.8</span>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-white/20" />

              <div className="flex items-center gap-4">
                <BBBLogo className="h-7 w-10 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">BBB Accredited</p>
                  <p className="mt-1 text-xs text-white/80">A+ rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
