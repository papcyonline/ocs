import { Check } from "@phosphor-icons/react/dist/ssr";
import { AnimatedArrow } from "@/components/icons";
import { QuoteButton } from "@/components/QuoteButton";

const tiers = [
  {
    name: "1–2 Bedrooms",
    price: "$89",
    note: "starting",
    features: ["Kitchen, baths, common areas", "Standard or deep clean"],
    cta: "Book this",
    popular: false,
  },
  {
    name: "3–4 Bedrooms",
    price: "$129",
    note: "starting",
    features: ["All standard rooms", "Recurring saves 20%"],
    cta: "Book this",
    popular: true,
  },
  {
    name: "5+ Bedrooms",
    price: "$169",
    note: "starting",
    features: ["All standard rooms", "Custom add-ons available"],
    cta: "Book this",
    popular: false,
  },
  {
    name: "Commercial · Post-Build",
    price: "Custom",
    note: "free walkthrough",
    features: ["On-site assessment", "Recurring contracts available"],
    cta: "Get quote",
    popular: false,
  },
];

const addons = [
  { name: "Oven", price: "+$25" },
  { name: "Fridge", price: "+$20" },
  { name: "Basement", price: "+$40" },
  { name: "Windows", price: "+$30" },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative z-[60] bg-white md:sticky md:top-0 md:min-h-[150svh]"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
              Pricing
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-black sm:mt-4 sm:text-4xl md:text-5xl">
              Straight pricing.
            </h2>
          </div>

          <p className="max-w-sm text-sm text-neutral-600">
            Residential starts here. Commercial is quoted on-site. No hidden
            fees.
          </p>
        </div>

        <div className="mt-8 h-px w-full bg-neutral-200 md:mt-10" />

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-0 md:divide-x md:divide-neutral-200">
          {tiers.map((tier, i) => {
            const isFirst = i === 0;
            const isLast = i === tiers.length - 1;
            return (
              <article
                key={tier.name}
                className={`flex flex-col py-6 md:py-8 ${
                  isFirst
                    ? "md:pr-6 md:pl-0"
                    : isLast
                      ? "md:pl-6 md:pr-0"
                      : "md:px-6"
                }`}
              >
                {tier.popular && (
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-oranje-600">
                    Most popular
                  </p>
                )}

                <h3 className="font-display text-lg text-black md:text-xl">
                  {tier.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-black md:text-5xl">
                    {tier.price}
                  </span>
                  <span className="text-xs text-neutral-500">{tier.note}</span>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
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

                <QuoteButton
                  className={`group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                    tier.popular
                      ? "bg-oranje-500 text-white hover:bg-oranje-600"
                      : "bg-neutral-100 text-black hover:bg-neutral-200"
                  }`}
                >
                  {tier.cta}
                  <AnimatedArrow className="h-4 w-4" />
                </QuoteButton>
              </article>
            );
          })}
        </div>

        <div className="mt-8 h-px w-full bg-neutral-200 md:mt-10" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 md:mt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            Add-ons
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {addons.map((a, i) => (
              <div key={a.name} className="flex items-center gap-2">
                <span className="text-neutral-700">{a.name}</span>
                <span className="font-display text-base font-medium text-oranje-600">
                  {a.price}
                </span>
                {i < addons.length - 1 && (
                  <span className="ml-3 h-3 w-px bg-neutral-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
