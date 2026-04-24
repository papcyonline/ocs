import { Envelope, Clock, MapPin } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { QuoteButton } from "@/components/QuoteButton";
import { AnimatedArrow } from "@/components/icons";

const infoItems = [
  { icon: Envelope, label: "info@ottri.net", href: "mailto:info@ottri.net" },
  {
    icon: Envelope,
    label: "george@ottriorganics.com",
    href: "mailto:george@ottriorganics.com",
  },
  { icon: Clock, label: site.hours },
  { icon: MapPin, label: site.city },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-[70] bg-neutral-900 md:sticky md:top-0 md:min-h-[150svh]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 py-20 sm:px-6 md:min-h-svh md:justify-center md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-400 sm:text-xs">
            Contact
          </p>

          <p className="mt-8 text-base text-white/60 md:mt-10 md:text-lg">
            Call us directly.
          </p>

          <a
            href={site.phoneHref}
            className="mt-3 block font-display-expanded text-5xl font-bold leading-none tracking-tight text-white transition-colors duration-300 hover:text-oranje-400 sm:text-6xl md:mt-4 md:text-7xl lg:text-8xl"
          >
            502-390-7925
          </a>

          <div className="mt-10 flex flex-col items-center gap-4 md:mt-14">
            <div className="flex items-center gap-3 text-sm text-white/50">
              <span className="h-px w-8 bg-white/20" />
              <span className="uppercase tracking-[0.2em]">Or</span>
              <span className="h-px w-8 bg-white/20" />
            </div>

            <QuoteButton className="group inline-flex items-center gap-2 rounded-full bg-oranje-500 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-oranje-600">
              Start your quote online
              <AnimatedArrow className="h-5 w-5" />
            </QuoteButton>
          </div>
        </div>

        <div className="mx-auto mt-16 w-full max-w-4xl md:mt-24">
          <div className="h-px w-full bg-white/10" />

          <div className="mt-6 flex flex-col items-center gap-4 text-sm md:flex-row md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-3">
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <span className="flex items-center gap-2 text-white/70">
                  <Icon
                    weight="bold"
                    className="h-4 w-4 shrink-0 text-oranje-400"
                  />
                  {item.label}
                </span>
              );
              return (
                <div key={i}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-white"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
