"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowIcon, CloseIcon } from "./icons";
import { Reveal } from "./Reveal";

export type GalleryImage = { src: string; alt: string };

/** 12-column mosaic: one tall lead image, one wide, then two squares. Repeats every four. */
function spanFor(i: number) {
  switch (i % 4) {
    case 0:
      return "lg:col-span-6 lg:row-span-2";
    case 1:
      return "lg:col-span-6";
    default:
      return "lg:col-span-3";
  }
}

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {images.map((img, i) => (
          <Reveal key={img.src} delay={i * 70} className={spanFor(i)}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`group relative block h-full w-full overflow-hidden rounded-3xl shadow-card ${
                i === 0
                  ? "aspect-[4/3] lg:aspect-auto lg:min-h-[520px]"
                  : "aspect-[4/3] lg:aspect-auto lg:min-h-[250px]"
              }`}
              aria-label={`${img.alt} — büyüt`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={
                  i % 4 < 2
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, 50vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-forest-900/0 transition group-hover:bg-forest-900/20" />
            </button>
          </Reveal>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galeri görüntüleyici"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-900/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 hover:bg-cream-100/20"
            aria-label="Kapat"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 hover:bg-cream-100/20 sm:flex"
            aria-label="Önceki"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 hover:bg-cream-100/20 sm:flex"
            aria-label="Sonraki"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>
          <figure
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-cream-100/70">
              {images[index].alt} · {index + 1}/{images.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
