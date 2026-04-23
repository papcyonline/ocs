import {
  Certificate,
  ShieldCheck,
  IdentificationBadge,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

const credentials = [
  {
    title: "DBE Certified",
    icon: Certificate,
    description: "State-recognized Disadvantaged Business Enterprise.",
  },
  {
    title: "Insured & Bonded",
    icon: ShieldCheck,
    description: "Full coverage on every job site.",
  },
  {
    title: "Background-Checked",
    icon: IdentificationBadge,
    description: "Vetted, trained, professional crew.",
  },
  {
    title: "Locally Owned",
    icon: MapPin,
    description: "Founded and operated in Louisville, KY.",
  },
];

const stats = [
  { value: "2,450+", label: "Cleans completed" },
  { value: "4.9★", label: "Average rating" },
  { value: "6", label: "Metros served" },
  { value: "24h", label: "Response window" },
];

export function WhyOCS() {
  return (
    <section id="about" className="relative z-40 bg-white md:sticky md:top-0 md:min-h-[150svh]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-20">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            Why OCS
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-black sm:mt-5 sm:text-5xl md:text-5xl">
            Built for trust.
          </h2>
        </div>

        <div className="mt-10 h-px w-full bg-neutral-200 md:mt-12" />

        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-0 md:divide-x md:divide-neutral-200">
          <div className="md:col-span-7 md:pr-10 lg:pr-16">
            <div className="space-y-8">
              {credentials.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="flex items-start gap-5">
                    <Icon
                      weight="bold"
                      className="mt-1 h-9 w-9 shrink-0 text-oranje-500"
                    />
                    <div>
                      <h3 className="font-display text-2xl text-black md:text-3xl">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-base text-neutral-600">
                        {c.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 md:pl-10 lg:pl-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
              By the numbers
            </p>
            <div className="mt-6 divide-y divide-neutral-200">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between py-5 first:pt-0"
                >
                  <span className="font-display text-5xl text-black md:text-6xl">
                    {s.value}
                  </span>
                  <span className="text-sm font-medium text-neutral-600">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-neutral-200 md:mt-14" />

        <div className="mt-6 flex flex-col gap-2 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Locally owned and operated by{" "}
            <span className="font-medium text-neutral-900">George Ngi</span> ·
            Louisville, KY
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
            UEI JBE5GCLMAP74 · NAICS 561720 / 561790
          </p>
        </div>
      </div>
    </section>
  );
}
