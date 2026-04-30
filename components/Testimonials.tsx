import { Quotes } from "@phosphor-icons/react/dist/ssr";

type Promise = {
  quote: string;
  label: string;
};

const promises: Promise[] = [
  {
    quote:
      "Show up on time, every time. If we're late, your next clean is on us.",
    label: "Punctuality",
  },
  {
    quote:
      "Same crew, same quality. We don't rotate strangers through your home.",
    label: "Consistency",
  },
  {
    quote:
      "We bring our own supplies — eco-friendly, kid- and pet-safe.",
    label: "Materials",
  },
  {
    quote:
      "If something's not right, we come back within 24 hours and fix it.",
    label: "Guarantee",
  },
  {
    quote:
      "Background-checked, insured, and local. Real people you can call by name.",
    label: "Trust",
  },
];

function Card({ p }: { p: Promise }) {
  return (
    <article className="flex w-[320px] shrink-0 flex-col rounded-3xl bg-white p-7 sm:w-[360px]">
      <Quotes weight="fill" className="h-7 w-7 text-oranje-500" />
      <p className="mt-5 flex-1 font-display text-lg leading-snug text-black sm:text-xl">
        &ldquo;{p.quote}&rdquo;
      </p>
      <div className="mt-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600">
          {p.label}
        </p>
        <p className="mt-1 text-sm text-neutral-600">An OCS commitment</p>
      </div>
    </article>
  );
}

export function Testimonials() {
  const loop = [...promises, ...promises];

  return (
    <section
      id="testimonials"
      className="relative z-50 bg-neutral-100 md:sticky md:top-24 md:min-h-[150svh]"
    >
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-6 md:pt-20">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
            Our standard
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-black sm:mt-5 sm:text-5xl md:text-5xl">
            What you can expect.
          </h2>
        </div>

        <div className="mt-10 h-px w-full bg-neutral-200 md:mt-12" />
      </div>

      <div className="group relative mt-10 overflow-hidden pb-16 md:pb-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-neutral-100 to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-neutral-100 to-transparent sm:w-20" />

        <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <Card key={`${p.label}-${i}`} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
