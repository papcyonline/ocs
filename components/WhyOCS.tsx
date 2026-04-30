import {
  Certificate,
  ShieldCheck,
  IdentificationBadge,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

const stats = [
  { value: "2,450+", label: "Cleans completed" },
  { value: "4.9★", label: "Average rating" },
  { value: "6", label: "Metros served" },
  { value: "24h", label: "Response window" },
];

const credentials = [
  { title: "DBE Certified", icon: Certificate },
  { title: "Insured & Bonded", icon: ShieldCheck },
  { title: "Background-Checked", icon: IdentificationBadge },
  { title: "Locally Owned", icon: MapPin },
];

export function WhyOCS() {
  return (
    <section
      id="about"
      className="relative z-40 bg-white md:sticky md:top-24 md:min-h-[150svh]"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            Why OCS
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-black sm:mt-4 sm:text-4xl md:text-5xl">
            Built for trust.
          </h2>
          <p className="mt-4 text-base text-neutral-600">
            Credentials, not claims.
          </p>
        </div>

        <div className="mt-10 h-px w-full bg-neutral-200 md:mt-12" />

        <div className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:gap-y-0 md:py-12 md:divide-x md:divide-neutral-200">
          {stats.map((s, i) => {
            const isFirst = i === 0;
            const isLast = i === stats.length - 1;
            return (
              <div
                key={s.label}
                className={
                  isFirst
                    ? "md:pr-8 md:pl-0"
                    : isLast
                      ? "md:pl-8 md:pr-0"
                      : "md:px-8"
                }
              >
                <p className="font-display-expanded text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl">
                  {s.value}
                </p>
                <p className="mt-3 text-sm font-medium text-neutral-600 md:mt-4">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="h-px w-full bg-neutral-200" />

        <div className="grid grid-cols-2 gap-y-5 py-8 md:flex md:flex-wrap md:items-center md:gap-x-10 md:gap-y-0 md:py-10">
          {credentials.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="flex items-center gap-2.5 text-sm font-medium text-neutral-900"
              >
                <Icon weight="bold" className="h-5 w-5 text-oranje-600" />
                {c.title}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
