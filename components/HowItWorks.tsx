import {
  ChatCircleText,
  CalendarCheck,
  Broom,
  ThumbsUp,
} from "@phosphor-icons/react/dist/ssr";
import { AnimatedArrow } from "@/components/icons";
import { QuoteButton } from "@/components/QuoteButton";

const steps = [
  {
    number: "01",
    title: "Get a quote",
    icon: ChatCircleText,
    description: "Tell us about your space. Free estimate, no commitment.",
  },
  {
    number: "02",
    title: "Pick a time",
    icon: CalendarCheck,
    description: "Same-day or scheduled. You choose what fits.",
  },
  {
    number: "03",
    title: "We clean",
    icon: Broom,
    description: "Insured, bonded crew. Eco-friendly supplies included.",
  },
  {
    number: "04",
    title: "You approve",
    icon: ThumbsUp,
    description: "Not perfect? We're back within 24 hours. Free.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-neutral-800">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-20">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-400 sm:text-xs">
            How it works
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-white sm:mt-5 sm:text-5xl md:text-5xl">
            Booked in minutes. Done in hours.
          </h2>
        </div>

        <div className="mt-10 h-px w-full bg-white/10 md:mt-12" />

        <div className="grid divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isFirst = i === 0;
            const isLast = i === steps.length - 1;
            return (
              <article
                key={step.title}
                className={`py-8 md:py-10 ${
                  isFirst
                    ? "md:pr-8 md:pl-0"
                    : isLast
                      ? "md:pl-8 md:pr-0"
                      : "md:px-8"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg text-oranje-500">
                    {step.number}
                  </span>
                  <span className="h-px w-6 bg-oranje-500" />
                </div>
                <Icon
                  weight="bold"
                  className="mt-7 h-12 w-12 text-oranje-500"
                />
                <h3 className="mt-6 font-display text-2xl text-white md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-white/75">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 h-px w-full bg-white/10 md:mt-12" />

        <div className="mt-8 flex flex-col items-start gap-5 md:mt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl text-white md:text-3xl">
            Ready when you are.
          </p>
          <QuoteButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-oranje-500 px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-oranje-600">
            Get Free Quote
            <AnimatedArrow className="h-6 w-6" />
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
