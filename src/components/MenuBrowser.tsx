"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/data/menu";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

export function MenuBrowser({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [categories]);

  return (
    <>
      <nav
        aria-label="Menü kategorileri"
        className="sticky top-18 z-30 -mx-5 border-b border-forest-800/10 bg-cream-100/90 backdrop-blur-xl sm:-mx-8 lg:top-20"
      >
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 no-scrollbar sm:px-8">
          {categories.map((c) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                aria-current={active === c.id ? "true" : undefined}
                className={`inline-block rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors ${
                  active === c.id
                    ? "bg-forest-800 text-gold-300"
                    : "bg-transparent text-ink-500 hover:bg-cream-200 hover:text-forest-800"
                }`}
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-24 py-16 lg:space-y-32 lg:py-24">
        {categories.map((c, ci) => (
          <section key={c.id} id={c.id} className="scroll-mt-40">
            <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-caramel-500">
                  {String(ci + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-4xl text-forest-800 sm:text-5xl">
                  {c.title}
                </h2>
              </div>
              <p className="max-w-sm text-sm text-ink-500 sm:text-right">
                {c.subtitle}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {c.items.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) * 70}>
                  <ProductCard
                    product={p}
                    index={i}
                    priority={ci === 0 && i < 2}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
