import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  XLogo,
  LinkedinLogo,
  Phone,
  Envelope,
} from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

const footerNav = [
  {
    title: "Services",
    links: [
      { label: "Residential", href: "/#services" },
      { label: "Commercial", href: "/#services" },
      { label: "Post-Construction", href: "/#services" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "About", href: "/#about" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

const socials = [
  { name: "Facebook", href: site.social.facebook, Icon: FacebookLogo },
  { name: "Instagram", href: site.social.instagram, Icon: InstagramLogo },
  { name: "X", href: site.social.x, Icon: XLogo },
  { name: "LinkedIn", href: site.social.linkedin, Icon: LinkedinLogo },
];

export function Footer() {
  return (
    <footer className="relative z-[80] bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-display text-2xl tracking-tight text-white">
                OCS
              </span>
              <span className="text-sm text-white/60">{site.name}</span>
            </Link>

            <p className="mt-5 max-w-sm text-base text-white/70">
              Residential, commercial, and post-construction cleaning across
              greater Louisville.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-base text-white transition-opacity hover:opacity-80"
              >
                <Phone weight="bold" className="h-4 w-4 text-oranje-400" />
                {site.phone}
              </a>
              {site.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-white/80 transition-opacity hover:opacity-100"
                >
                  <Envelope weight="bold" className="h-4 w-4 text-oranje-400" />
                  {email}
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-oranje-500"
                >
                  <Icon weight="fill" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-400">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-white/10 md:mt-20" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-wider">
            UEI {site.uei} · NAICS {site.naics} · DBE Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
