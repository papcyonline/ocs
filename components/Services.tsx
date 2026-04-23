import {
  House,
  Buildings,
  HardHat,
  Check,
} from "@phosphor-icons/react/dist/ssr";
import { AnimatedArrow } from "@/components/icons";

const services = [
  {
    title: "Residential",
    icon: House,
    description: "Homes that feel brand new.",
    items: [
      "One-time deep cleans",
      "Recurring (weekly, bi-weekly, monthly)",
      "Move-in & move-out",
      "Inside oven & fridge",
      "Carpets & windows",
    ],
    href: "#residential",
  },
  {
    title: "Commercial",
    icon: Buildings,
    description: "Offices, retail, shared spaces.",
    items: [
      "Office & janitorial",
      "Restroom services",
      "Strip & wax",
      "Pressure washing",
      "Daily disinfecting",
    ],
    href: "#commercial",
  },
  {
    title: "Post-Construction",
    icon: HardHat,
    description: "After-build polish, ready for handover.",
    items: [
      "New construction cleans",
      "Terminal cleaning",
      "Window & glass",
      "Debris removal",
      "Final disinfecting",
    ],
    href: "#post-construction",
  },
];

export function Services() {
  return (
    <section id="services" className="relative z-20 bg-oranje-50 md:sticky md:top-0 md:min-h-[150svh]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-20">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-700 sm:text-xs">
            Our services
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-black sm:mt-5 sm:text-5xl md:text-5xl">
            What we clean.
          </h2>
        </div>

        <div className="mt-10 h-px w-full bg-oranje-200 md:mt-12" />

        <div className="grid divide-y divide-oranje-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isFirst = i === 0;
            const isLast = i === services.length - 1;
            return (
              <article
                key={service.title}
                className={`py-8 md:py-10 ${
                  isFirst
                    ? "md:pr-10 md:pl-0"
                    : isLast
                      ? "md:pl-10 md:pr-0"
                      : "md:px-10"
                }`}
              >
                <Icon weight="bold" className="h-12 w-12 text-oranje-600" />
                <h3 className="mt-6 font-display text-3xl text-black md:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-base text-neutral-700">
                  {service.description}
                </p>

                <ul className="mt-7 space-y-3.5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base font-medium text-neutral-900"
                    >
                      <Check
                        weight="bold"
                        className="mt-0.5 h-5 w-5 shrink-0 text-oranje-600"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={service.href}
                  className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-oranje-700"
                >
                  Explore
                  <AnimatedArrow className="h-5 w-5" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
