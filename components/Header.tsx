"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, X, Phone } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { AnimatedArrow, ArrowUpRight } from "@/components/icons";
import { Logo } from "@/components/Logo";

const HEADER_OFFSET = 96;

function jumpToHash(e: React.MouseEvent<HTMLAnchorElement>, hash: string) {
  if (!hash.startsWith("#")) return;
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  e.preventDefault();
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  window.scrollTo({ top: Math.max(0, top - HEADER_OFFSET), behavior: "auto" });
  history.pushState(null, "", hash);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled ? "px-0 pt-0" : "px-4 pt-4"
      }`}
    >
      <header
        className={`bg-white/80 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "rounded-b-[30px] shadow-sm shadow-black/5"
            : "rounded-[30px] shadow-lg shadow-black/10"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-1.5 md:px-6 md:py-2">
          <Link href="/" aria-label="Ottri Cleaning Services — home">
            <Logo showSubtitle />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => jumpToHash(e, item.href)}
                className="text-sm text-neutral-700 transition hover:text-oranje-600"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href="/quote"
            className="group hidden items-center gap-2 rounded-full bg-oranje-500 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-oranje-600 md:inline-flex"
          >
            Get Free Quote
            <AnimatedArrow className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-black md:hidden"
          >
            {open ? (
              <X weight="bold" className="h-6 w-6" />
            ) : (
              <List weight="bold" className="h-6 w-6" />
            )}
          </button>
        </div>

        {open && (
          <div className="md:hidden">
            <div className="mx-auto max-w-7xl px-5 pb-5">
              <nav className="flex flex-col gap-4">
                {site.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      jumpToHash(e, item.href);
                      setOpen(false);
                    }}
                    className="text-base text-neutral-800"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 text-base text-neutral-800"
                >
                  <Phone weight="bold" className="h-5 w-5" />
                  {site.phone}
                </a>
                <Link
                  href="/quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-oranje-500 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-oranje-600"
                >
                  Get Free Quote
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
