import { Phone, Envelope, Clock, MapPin } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
  return (
    <section id="contact" className="relative z-[70] bg-oranje-500 md:sticky md:top-0 md:min-h-[150svh]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70 sm:text-xs">
              Contact
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-white sm:mt-5 sm:text-5xl md:text-5xl">
              Let&rsquo;s get a clean on the books.
            </h2>
            <p className="mt-4 max-w-md text-base text-white/85">
              Tell us about your space — we reply within 2 business days.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={site.phoneHref}
                className="flex items-start gap-4 text-white transition-opacity hover:opacity-80"
              >
                <Phone
                  weight="bold"
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                <span className="font-display text-2xl md:text-3xl">
                  {site.phone}
                </span>
              </a>

              <div className="flex items-start gap-4 text-white">
                <Envelope
                  weight="bold"
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                <div className="flex flex-col gap-1">
                  {site.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="text-base transition-opacity hover:opacity-80"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4 text-white">
                <Clock weight="bold" className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-base">{site.hours}</span>
              </div>

              <div className="flex items-start gap-4 text-white">
                <MapPin weight="bold" className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-base">{site.city}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
