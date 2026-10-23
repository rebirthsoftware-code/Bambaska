"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice, type Product } from "@/data/menu";
import { ArrowIcon } from "./icons";

type Props = { products: Product[] };

/**
 * Editorial product list: hovering or focusing an item swaps the large image.
 * On small screens the list becomes a horizontal snap carousel of cards.
 */
export function SignatureShowcase({ products }: Props) {
  const items = products.filter((p) => p.image);
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden gap-10 md:grid md:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream-200 shadow-soft">
          {items.map((p, i) => (
            <Image
              key={p.slug}
              src={p.image!}
              alt={p.name}
              fill
              sizes="(min-width: 1024px) 45vw, 50vw"
              priority={i === 0}
              className={`object-cover transition-all duration-700 ease-out ${
                i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/80 to-transparent p-7 pt-24 text-cream-100">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </p>
            <p className="mt-2 font-display text-3xl">{current.name}</p>
            {current.description && (
              <p className="mt-2 max-w-md text-sm leading-relaxed text-cream-100/80">
                {current.description}
              </p>
            )}
          </div>
        </div>

        <ul className="flex flex-col justify-center" role="list">
          {items.map((p, i) => {
            const isActive = i === active;
            return (
              <li
                key={p.slug}
                className="border-t border-forest-800/10 last:border-b"
              >
                <Link
                  href="/menu"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center gap-5 py-5 outline-none lg:py-6"
                >
                  <span
                    className={`font-display text-xl transition-colors ${isActive ? "text-gold-500" : "text-forest-800/30"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block font-display text-2xl transition-all duration-300 lg:text-3xl ${
                        isActive
                          ? "translate-x-2 text-forest-800"
                          : "text-forest-800/60"
                      }`}
                    >
                      {p.name}
                    </span>
                    {p.allergens && (
                      <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-caramel-500">
                        {p.allergens.join(" · ")}
                      </span>
                    )}
                  </span>
                  <span className="text-sm font-bold text-forest-800">
                    {formatPrice(p.price)}
                  </span>
                  <ArrowIcon
                    className={`h-5 w-5 text-gold-500 transition-all duration-300 ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile: snap carousel */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 no-scrollbar md:hidden">
        {items.map((p) => (
          <Link
            key={p.slug}
            href="/menu"
            className="relative aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden rounded-3xl bg-cream-200 shadow-card"
          >
            <Image
              src={p.image!}
              alt={p.name}
              fill
              sizes="78vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/85 to-transparent p-5 pt-20 text-cream-100">
              <p className="font-display text-2xl">{p.name}</p>
              <p className="mt-1 text-sm font-bold text-gold-300">
                {formatPrice(p.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
