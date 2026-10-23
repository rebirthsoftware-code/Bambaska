"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { LogoLink } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onDark = pathname === "/" || pathname === "/hakkimizda";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = (scrolled || !onDark) && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-cream-100/85 text-forest-800 shadow-[0_1px_0_0_rgb(28_26_21/0.06)] backdrop-blur-xl"
            : open
              ? "bg-transparent text-gold-300"
              : "bg-transparent text-gold-400"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
          <LogoLink className="h-9 w-24 sm:h-10 sm:w-28" />

          <nav
            aria-label="Ana menü"
            className="hidden items-center gap-1 lg:flex"
          >
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                    active
                      ? solid
                        ? "text-forest-800"
                        : "text-gold-300"
                      : solid
                        ? "text-ink-500 hover:text-forest-800"
                        : "text-cream-100/80 hover:text-gold-300"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-current"
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.phoneHref}
              className={`text-[13px] font-semibold tracking-wide ${solid ? "text-ink-700" : "text-cream-100/90"}`}
            >
              {site.phone}
            </a>
            <Link
              href="/franchise"
              className={`rounded-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.16em] transition-all hover:-translate-y-0.5 ${
                solid
                  ? "bg-forest-800 text-gold-300 hover:bg-forest-700"
                  : "bg-gold-400 text-forest-900 hover:bg-gold-300"
              }`}
            >
              Franchise Ol
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 rounded bg-current transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-6 rounded bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-6 rounded bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer: a sibling of the header, because backdrop-filter on the
          header would otherwise become the containing block of this fixed element. */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 flex flex-col bg-forest-800 text-cream-100 transition-all duration-500 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="waffle-grid absolute inset-0 opacity-40" aria-hidden />
        <nav
          className="relative mt-24 flex flex-1 flex-col gap-1 px-8"
          aria-label="Mobil menü"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              className={`border-b border-cream-100/10 py-4 font-display text-3xl text-cream-100 transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="relative px-8 pb-10 text-sm text-cream-100/70">
          <a href={site.phoneHref} className="block py-1 text-gold-300">
            {site.phone}
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="block py-1"
          >
            {site.instagramHandle}
          </a>
          <p className="mt-3 text-xs">{site.addressShort}</p>
        </div>
      </div>
    </>
  );
}
