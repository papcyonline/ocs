import { Check } from "@phosphor-icons/react/dist/ssr";
import { AnimatedArrow } from "@/components/icons";

const tiers = [
  {
    name: "1–2 Bedrooms",
    price: "$89",
    note: "starting",
    features: ["Kitchen, baths, common areas", "Standard or deep clean"],
    cta: "Book this",
    href: "#contact",
    popular: false,
  },
  {
    name: "3–4 Bedrooms",
    price: "$129",
    note: "starting",
    features: ["All standard rooms", "Recurring saves 20%"],
    cta: "Book this",
    href: "#contact",
    popular: true,
  },
  {
    name: "5+ Bedrooms",
    price: "$169",
    note: "starting",
    features: ["All standard rooms", "Custom add-ons available"],
    cta: "Book this",
    href: "#contact",
    popular: false,
  },
  {
    name: "Commercial · Post-Build",
    price: "Custom",
    note: "free walkthrough",
    features: ["On-site assessment", "Recurring contracts available"],
    cta: "Get quote",
    href: "#contact",
    popular: false,
  },
];

const addons = [
  { name: "Inside oven", price: "+$25" },
  { name: "Inside fridge", price: "+$20" },
  { name: "Basement", price: "+$40" },
  { name: "Windows", price: "+$30" },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative z-[60] bg-white md:sticky md:top-0 md:min-h-[150svh]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-20">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            Pricing
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-black sm:mt-5 sm:text-5xl md:text-5xl">
            Straight pricing.
          </h2>
          <p className="mt-4 max-w-xl text-base text-neutral-600">
            Residential starts here. Commercial is quoted on-site. No hidden
            fees.
          </p>
        </div>

        <div className="mt-10 h-px w-full bg-neutral-200 md:mt-12" />

        <div className="grid gap-8 sm:grid-cols-2 md:mt-12 md:grid-cols-4 md:gap-0 md:divide-x md:divide-neutral-200">
          {tiers.map((tier, i) => {
            const isFirst = i === 0;
            const isLast = i === tiers.length - 1;
            return (
              <article
                key={tier.name}
                className={`flex flex-col py-8 md:py-10 ${
                  isFirst
                    ? "md:pr-8 md:pl-0"
                    : isLast
                      ? "md:pl-8 md:pr-0"
                      : "md:px-8"
                }`}
              >
                {tier.popular && (
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-oranje-600">
                    Most popular
                  </p>
                )}

                <h3 className="font-display text-xl text-black md:text-2xl">
                  {tier.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl text-black md:text-6xl">
                    {tier.price}
                  </span>
                  <span className="text-sm text-neutral-500">{tier.note}</span>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-neutral-800"
                    >
                      <Check
                        weight="bold"
                        className="mt-0.5 h-4 w-4 shrink-0 text-oranje-600"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={`group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                    tier.popular
                      ? "bg-oranje-500 text-white hover:bg-oranje-600"
                      : "bg-neutral-100 text-black hover:bg-neutral-200"
                  }`}
                >
                  {tier.cta}
                  <AnimatedArrow className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-10 h-px w-full bg-neutral-200 md:mt-12" />

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
              Popular add-ons
            </p>
            <p className="mt-3 font-display text-2xl text-black md:text-3xl">
              Stack what you need.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-8 md:grid-cols-4">
            {addons.map((a) => (
              <div
                key={a.name}
                className="flex flex-col rounded-2xl bg-neutral-100 px-5 py-4"
              >
                <span className="text-sm text-neutral-700">{a.name}</span>
                <span className="mt-1 font-display text-2xl text-oranje-600">
                  {a.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
