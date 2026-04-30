import Image from "next/image";
import {
  House,
  Buildings,
  HardHat,
  Check,
} from "@phosphor-icons/react/dist/ssr";
import residentialImg from "@/Images/pexels-tima-miroshnichenko-6196677.jpg";
import commercialImg from "@/Images/pexels-tima-miroshnichenko-6195277.jpg";
import postBuildImg from "@/Images/pexels-tima-miroshnichenko-6195276.jpg";

const services = [
  {
    title: "Residential",
    icon: House,
    items: [
      "One-time deep cleans",
      "Recurring (weekly, bi-weekly, monthly)",
      "Move-in & move-out",
      "Inside oven & fridge",
    ],
    image: residentialImg,
    imageAlt: "OCS crew working in a residential kitchen",
  },
  {
    title: "Commercial",
    icon: Buildings,
    items: [
      "Office & janitorial",
      "Restroom services",
      "Strip & wax",
      "Pressure washing",
    ],
    image: commercialImg,
    imageAlt: "OCS team arriving on-site with professional cleaning equipment",
  },
  {
    title: "Post-Construction",
    icon: HardHat,
    items: [
      "New construction cleans",
      "Terminal cleaning",
      "Window & glass",
      "Debris removal",
    ],
    image: postBuildImg,
    imageAlt:
      "OCS technician on a ladder cleaning a tall surface after construction",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative bg-oranje-50"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-700 sm:text-xs">
            Our services
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-black sm:mt-4 sm:text-4xl md:text-5xl">
            What we clean.
          </h2>
        </div>

        <div className="mt-8 h-px w-full bg-oranje-200 md:mt-10" />

        <div className="grid divide-y divide-oranje-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isFirst = i === 0;
            const isLast = i === services.length - 1;
            return (
              <article
                key={service.title}
                className={`py-6 md:py-8 ${
                  isFirst
                    ? "md:pr-6 md:pl-0"
                    : isLast
                      ? "md:pl-6 md:pr-0"
                      : "md:px-6"
                }`}
              >
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-32 w-full object-cover object-top md:h-36 lg:h-40"
                  />
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <Icon weight="bold" className="h-6 w-6 text-oranje-600" />
                  <h3 className="font-display text-xl text-black md:text-2xl">
                    {service.title}
                  </h3>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {service.items.map((item) => (
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
