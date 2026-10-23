"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowIcon } from "./icons";
import {
  clamp,
  easeInOutCubic,
  lerp,
  usePrefersReducedMotion,
  useScrollProgress,
  window01,
} from "@/lib/motion";

export type StoryFrame = {
  src: string;
  /** intrinsic width / height of the image file */
  aspect: number;
  alt: string;
  /** focal point in image percent */
  x: number;
  y: number;
  scale: number;
  title: string;
  text: string;
};

type Props = {
  id?: string;
  eyebrow: string;
  heading: ReactNode;
  frames: StoryFrame[];
  cta: { href: string; label: string };
  /** scroll length per frame, in viewport heights */
  perFrame?: number;
};

/** Share of each segment used for the move; the remainder holds on the frame. */
const MOVE = 0.5;

/**
 * Maps a focal point given in image percent to frame percent, accounting for
 * the crop that object-fit: cover applies when aspects differ.
 */
function toFrameSpace(
  fx: number,
  fy: number,
  imgAspect: number,
  frameAspect: number,
) {
  const r = frameAspect / imgAspect;
  if (r < 1) {
    // frame is narrower than the image: sides are cropped
    return { x: clamp((fx - ((1 - r) / 2) * 100) / r, 0, 100), y: fy };
  }
  const sh = 1 / r; // frame is wider: top and bottom are cropped
  return { x: fx, y: clamp((fy - ((1 - sh) / 2) * 100) / sh, 0, 100) };
}

type Layer = {
  src: string;
  aspect: number;
  alt: string;
  from: number;
  to: number;
};

function buildLayers(frames: StoryFrame[]): Layer[] {
  const layers: Layer[] = [];
  frames.forEach((f, i) => {
    const last = layers[layers.length - 1];
    if (last && last.src === f.src) last.to = i;
    else
      layers.push({ src: f.src, aspect: f.aspect, alt: f.alt, from: i, to: i });
  });
  return layers;
}

export function PhotoStory({
  id,
  eyebrow,
  heading,
  frames,
  cta,
  perFrame = 0.85,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const scrolled = useScrollProgress(ref);
  const [frameAspect, setFrameAspect] = useState(4 / 3);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) setFrameAspect(width / height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = frames.length;
  const p = reduced ? 1 : scrolled;
  const t = p * (n - 1); // continuous frame index
  const i = Math.min(n - 2, Math.floor(t));
  const f = n > 1 ? clamp(t - i) : 1;
  const move = easeInOutCubic(window01(f, 0, MOVE));
  const activeIndex = reduced ? n - 1 : f < MOVE / 2 ? i : i + 1;
  const layers = buildLayers(frames);
  const last = p >= 0.999 || reduced;

  // Resolves the transform of a layer for the current position.
  const layerStyle = (layer: Layer) => {
    const a = frames[i];
    const b = frames[i + 1] ?? a;
    const aIn = i >= layer.from && i <= layer.to;
    const bIn = i + 1 >= layer.from && i + 1 <= layer.to;

    let fx: number, fy: number, s: number, opacity: number;
    if (aIn && bIn) {
      // continuous pan + zoom inside the same photo
      fx = lerp(a.x, b.x, move);
      fy = lerp(a.y, b.y, move);
      s = lerp(a.scale, b.scale, move);
      opacity = 1;
    } else if (aIn) {
      // this photo is leaving: hold its frame and push in slightly while fading
      fx = a.x;
      fy = a.y;
      s = a.scale * lerp(1, 1.08, move);
      opacity = 1 - move;
    } else if (bIn) {
      // this photo is arriving: settle from a slight zoom while fading in
      fx = b.x;
      fy = b.y;
      s = b.scale * lerp(1.08, 1, move);
      opacity = move;
    } else {
      return { opacity: 0, transform: "none", transformOrigin: "0 0" } as const;
    }
    const pt = toFrameSpace(fx, fy, layer.aspect, frameAspect);
    const tx = pt.x * (1 - s);
    const ty = pt.y * (1 - s);
    return {
      opacity,
      transformOrigin: "0 0",
      transform: `translate3d(${tx.toFixed(3)}%, ${ty.toFixed(3)}%, 0) scale(${s.toFixed(4)})`,
    } as const;
  };

  const currentScale = lerp(
    frames[i].scale,
    (frames[i + 1] ?? frames[i]).scale,
    move,
  );
  const vignette = clamp((currentScale - 1) / 1.2) * 0.55;

  return (
    <section
      id={id}
      ref={ref}
      className="relative bg-forest-900 text-cream-100"
      style={
        reduced
          ? undefined
          : { height: `calc(100svh + ${(n - 1) * perFrame * 100}svh)` }
      }
    >
      <div
        className={`${reduced ? "" : "sticky top-0 h-[100svh]"} flex flex-col overflow-hidden`}
      >
        <div className="waffle-grid absolute inset-0 opacity-20" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-5 pt-24 sm:px-8 lg:pb-8 lg:pt-24">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between lg:mb-6">
            <div>
              <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">
                <span className="h-px w-8 bg-gold-400" aria-hidden />
                {eyebrow}
              </p>
              <h2 className="mt-2 font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            </div>
            <p className="hidden text-xs uppercase tracking-[0.24em] text-cream-100/50 sm:block">
              Kaydırarak keşfet
            </p>
          </div>

          {/* Cinematic frame */}
          <div
            ref={frameRef}
            className="relative min-h-0 flex-1 overflow-hidden rounded-[1.6rem] bg-forest-800 shadow-soft ring-1 ring-gold-400/15 lg:rounded-[2rem]"
          >
            {layers.map((layer) => (
              <div
                key={layer.from}
                className="absolute inset-0 will-change-transform"
                style={layerStyle(layer)}
              >
                <Image
                  src={layer.src}
                  alt={layer.alt}
                  fill
                  sizes="(min-width: 1024px) 1920px, 180vw"
                  className="object-cover"
                  priority={layer.from === 0}
                />
              </div>
            ))}

            {/* Vignette while zoomed in */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                opacity: vignette,
                background:
                  "radial-gradient(70% 70% at 50% 50%, transparent 40%, rgb(1 29 5 / 0.9) 100%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-900/85 to-transparent"
              aria-hidden
            />

            {/* Captions */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div
                className="relative h-[7.5rem] w-full max-w-xl sm:h-[8.5rem]"
                aria-live="polite"
              >
                {frames.map((fr, k) => {
                  const active = k === activeIndex;
                  return (
                    <div
                      key={k}
                      className="absolute inset-0 transition-all duration-500"
                      style={{
                        opacity: active ? 1 : 0,
                        transform: `translateY(${active ? 0 : 10}px)`,
                      }}
                      aria-hidden={!active}
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">
                        {String(k + 1).padStart(2, "0")} /{" "}
                        {String(n).padStart(2, "0")}
                      </p>
                      <p className="mt-2 font-display text-2xl leading-tight text-cream-100 sm:text-4xl">
                        {fr.title}
                      </p>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-cream-100/80 sm:text-base">
                        {fr.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="transition-all duration-500"
                style={{
                  opacity: last ? 1 : 0,
                  transform: `translateY(${last ? 0 : 12}px)`,
                  pointerEvents: last ? "auto" : "none",
                }}
              >
                <Link
                  href={cta.href}
                  className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-gold-400 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-forest-900 transition hover:bg-gold-300"
                >
                  {cta.label}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Step dots */}
            <div
              className="absolute right-5 top-5 flex gap-1.5 sm:right-8 sm:top-8"
              aria-hidden
            >
              {frames.map((_, k) => (
                <span
                  key={k}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    k === activeIndex
                      ? "w-7 bg-gold-400"
                      : k < activeIndex
                        ? "w-1.5 bg-gold-400/70"
                        : "w-1.5 bg-cream-100/30"
                  }`}
                />
              ))}
            </div>

            {/* Progress rail */}
            {!reduced && (
              <div
                className="absolute inset-x-0 bottom-0 h-0.5 bg-cream-100/10"
                aria-hidden
              >
                <div
                  className="h-full bg-gold-400"
                  style={{ width: `${p * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
