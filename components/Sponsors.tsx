import Image from "next/image";
import buildingConnected from "@/Images/sponsor/Building-Connected-Logo.png";
import metropolis from "@/Images/sponsor/Metropolis-SP-header-logo.png";
import partner1 from "@/Images/sponsor/partner1.webp";
import partner5 from "@/Images/sponsor/partner5.webp";

const sponsors = [
  { name: "BuildingConnected", logo: buildingConnected },
  { name: "Metropolis", logo: metropolis },
  { name: "Partner", logo: partner1 },
  { name: "Partner", logo: partner5 },
];

export function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative z-[60] bg-white md:sticky md:top-0 md:min-h-[150svh]"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            Our sponsors
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-black sm:mt-4 sm:text-4xl md:text-5xl">
            In good company.
          </h2>
          <p className="mt-4 text-base text-neutral-600">
            Trusted by the platforms and partners that move our industry.
          </p>
        </div>

        <div className="mt-10 h-px w-full bg-neutral-200 md:mt-12" />

        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-10 py-12 md:grid-cols-4 md:gap-x-12 md:py-16">
          {sponsors.map((s, i) => (
            <div
              key={`${s.name}-${i}`}
              className="flex items-center justify-center"
            >
              <Image
                src={s.logo}
                alt={s.name}
                placeholder="blur"
                sizes="(max-width: 768px) 40vw, 20vw"
                className="h-12 w-auto max-w-full object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-14"
              />
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-neutral-200" />
      </div>
    </section>
  );
}
