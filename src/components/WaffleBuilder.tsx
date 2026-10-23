"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowIcon } from "./icons";
import {
  easeOutBack,
  easeOutCubic,
  lerp,
  usePrefersReducedMotion,
  useScrollProgress,
  window01,
} from "@/lib/motion";

/* ───────────── Story steps ───────────── */

const steps = [
  {
    key: "dough",
    title: "Taptaze hamur",
    text: "Her waffle siparişle birlikte dökülür. Dışı çıtır, içi yumuşacık.",
    from: 0.0,
    to: 0.16,
  },
  {
    key: "chocolate",
    title: "Belçika çikolatası",
    text: "Gerçek sütlü çikolata, cömertçe. Kısayol yok.",
    from: 0.16,
    to: 0.32,
  },
  {
    key: "fruit",
    title: "Mevsim meyveleri",
    text: "Muz, kivi ve çilek; her sabah taze dilimlenir.",
    from: 0.32,
    to: 0.58,
  },
  {
    key: "pistachio",
    title: "File Antep fıstığı",
    text: "Üzerine bolca file fıstık ve fındık.",
    from: 0.58,
    to: 0.72,
  },
  {
    key: "sauce",
    title: "Bitter sos",
    text: "Son dokunuş: sıcak bitter sos, ince ince.",
    from: 0.72,
    to: 0.9,
  },
  {
    key: "done",
    title: "İşte Bambaşka Waffle",
    text: "Her lokmada bambaşka bir mutluluk.",
    from: 0.9,
    to: 1,
  },
] as const;

/* ───────────── Fixed, deterministic geometry (same on server and client) ───────────── */

const C = 320; // viewBox centre

const pockets = Array.from({ length: 16 }, (_, i) => {
  const col = i % 4;
  const row = Math.floor(i / 4);
  return { x: 181 + col * 74, y: 181 + row * 74 };
});

const blobRadii = [148, 160, 142, 165, 150, 158, 140, 162, 152, 146, 164, 150];
const chocolateBlob = (() => {
  const pts = blobRadii.map((r, i) => {
    const a = (i / blobRadii.length) * Math.PI * 2;
    return [C + Math.cos(a) * r, C + Math.sin(a) * r];
  });
  let d = "";
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % pts.length];
    const mx = (p0[0] + p1[0]) / 2;
    const my = (p0[1] + p1[1]) / 2;
    d += i === 0 ? `M ${mx} ${my} ` : "";
    const n0 = pts[(i + 1) % pts.length];
    const n1 = pts[(i + 2) % pts.length];
    d += `Q ${n0[0]} ${n0[1]} ${(n0[0] + n1[0]) / 2} ${(n0[1] + n1[1]) / 2} `;
  }
  return d + "Z";
})();

const bananas = [
  { x: 246, y: 236, r: 24 },
  { x: 332, y: 214, r: 22 },
  { x: 404, y: 270, r: 23 },
  { x: 268, y: 332, r: 22 },
  { x: 362, y: 350, r: 24 },
  { x: 300, y: 414, r: 22 },
];
const kiwis = [
  { x: 300, y: 282, r: 25 },
  { x: 398, y: 334, r: 23 },
  { x: 388, y: 412, r: 22 },
];
const strawberries = [
  { x: 226, y: 292, rot: -28 },
  { x: 372, y: 230, rot: 18 },
  { x: 332, y: 352, rot: -6 },
  { x: 250, y: 392, rot: 24 },
  { x: 412, y: 374, rot: -40 },
];
const crumbs = [
  [212, 224, 20],
  [252, 198, -35],
  [296, 236, 60],
  [346, 262, 10],
  [420, 238, -20],
  [438, 300, 45],
  [372, 300, -60],
  [318, 326, 30],
  [236, 348, -10],
  [284, 376, 70],
  [330, 398, -45],
  [370, 440, 15],
  [412, 442, -30],
  [438, 390, 65],
  [262, 432, 0],
  [206, 362, 40],
  [320, 192, -15],
  [444, 350, 25],
];
const drizzle =
  "M 176 186 Q 320 148 456 232 Q 300 296 190 284 Q 330 318 462 342 Q 300 418 198 398 Q 330 430 452 470";
const sugar = [
  [214, 214],
  [262, 190],
  [312, 206],
  [366, 190],
  [418, 214],
  [446, 268],
  [438, 326],
  [452, 392],
  [420, 452],
  [362, 472],
  [300, 466],
  [244, 454],
  [206, 404],
  [196, 338],
  [206, 270],
  [286, 300],
  [346, 290],
  [330, 440],
  [250, 360],
  [400, 300],
];
const sparkles = [
  [96, 150],
  [560, 120],
  [600, 420],
  [70, 470],
  [520, 560],
  [130, 590],
];

/* ───────────── Helpers ───────────── */

/** Drop-in transform: element falls from above, settling with a slight overshoot. */
function drop(t: number, from = -160) {
  const e = easeOutBack(t);
  const y = lerp(from, 0, Math.min(1, e));
  const s = lerp(1.25, 1, easeOutCubic(t));
  return {
    transform: `translate(0 ${y.toFixed(1)}) scale(${s.toFixed(3)})`,
    opacity: t <= 0 ? 0 : Math.min(1, t * 3),
  };
}

/** Staggers n children over the window [a, b]. */
function stagger(
  p: number,
  a: number,
  b: number,
  i: number,
  n: number,
  overlap = 0.55,
) {
  const span = (b - a) / (1 + (n - 1) * (1 - overlap));
  const start = a + i * span * (1 - overlap);
  return window01(p, start, start + span);
}

/* ───────────── The illustration ───────────── */

function WaffleScene({ p }: { p: number }) {
  const base = window01(p, 0.02, 0.15);
  const choc = window01(p, 0.17, 0.3);
  const fruitA = 0.33;
  const fruitB = 0.57;
  const pist = window01(p, 0.6, 0.71);
  const sauce = window01(p, 0.73, 0.9);
  const done = window01(p, 0.9, 1);

  const baseT = drop(base, -220);
  const chocScale = lerp(0.1, 1, easeOutBack(choc));

  return (
    <svg viewBox="0 0 640 640" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="wb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d7b46a" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#d7b46a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wb-plate" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffdf7" />
          <stop offset="100%" stopColor="#efe5d2" />
        </linearGradient>
        <linearGradient id="wb-dough" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0bd5c" />
          <stop offset="55%" stopColor="#dca046" />
          <stop offset="100%" stopColor="#c0812f" />
        </linearGradient>
        <linearGradient id="wb-pocket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a86a22" />
          <stop offset="100%" stopColor="#c58b39" />
        </linearGradient>
        <radialGradient id="wb-choc" cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#6b3d1e" />
          <stop offset="100%" stopColor="#3a1e0d" />
        </radialGradient>
        <radialGradient id="wb-banana" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbf0c4" />
          <stop offset="78%" stopColor="#f3dd8c" />
          <stop offset="100%" stopColor="#dcbb5a" />
        </radialGradient>
        <radialGradient id="wb-kiwi" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e4f2bf" />
          <stop offset="40%" stopColor="#a6cf5a" />
          <stop offset="100%" stopColor="#5f8f2b" />
        </radialGradient>
        <linearGradient id="wb-berry" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ef4a5f" />
          <stop offset="100%" stopColor="#b31830" />
        </linearGradient>
        <filter id="wb-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="14"
            floodColor="#1c1a15"
            floodOpacity="0.35"
          />
        </filter>
        <filter id="wb-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="2.5"
            floodColor="#1c1a15"
            floodOpacity="0.28"
          />
        </filter>
      </defs>

      {/* Glow + sparkles on completion */}
      <circle
        cx={C}
        cy={C}
        r={300}
        fill="url(#wb-glow)"
        style={{
          opacity: done,
          transform: `scale(${lerp(0.7, 1.1, done)})`,
          transformOrigin: "320px 320px",
        }}
      />
      {sparkles.map(([x, y], i) => {
        const t = stagger(done, 0.1, 1, i, sparkles.length, 0.6);
        return (
          <g
            key={i}
            transform={`translate(${x} ${y})`}
            style={{ opacity: Math.sin(t * Math.PI) }}
          >
            <path
              d="M0 -14 L3 -3 L14 0 L3 3 L0 14 L-3 3 L-14 0 L-3 -3 Z"
              fill="#e9d7a8"
              transform={`scale(${lerp(0.3, 1, t)})`}
            />
          </g>
        );
      })}

      {/* Plate */}
      <g filter="url(#wb-shadow)">
        <circle cx={C} cy={C} r={272} fill="url(#wb-plate)" />
        <circle
          cx={C}
          cy={C}
          r={272}
          fill="none"
          stroke="#d7b46a"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <circle
          cx={C}
          cy={C}
          r={236}
          fill="none"
          stroke="#d7b46a"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      </g>

      {/* Everything on the plate is tilted slightly for life */}
      <g transform={`rotate(-8 ${C} ${C})`}>
        {/* Waffle base */}
        <g
          style={{
            transformOrigin: "320px 320px",
            transform: baseT.transform,
            opacity: baseT.opacity,
          }}
        >
          <g filter="url(#wb-shadow)">
            <rect
              x={150}
              y={150}
              width={340}
              height={340}
              rx={32}
              fill="url(#wb-dough)"
            />
          </g>
          <rect
            x={150}
            y={150}
            width={340}
            height={340}
            rx={32}
            fill="none"
            stroke="#f6d78a"
            strokeOpacity="0.7"
            strokeWidth="3"
          />
          {pockets.map((pk, i) => (
            <g key={i}>
              <rect
                x={pk.x}
                y={pk.y}
                width={56}
                height={56}
                rx={11}
                fill="url(#wb-pocket)"
              />
              <rect
                x={pk.x + 5}
                y={pk.y + 5}
                width={46}
                height={46}
                rx={9}
                fill="none"
                stroke="#8d561b"
                strokeOpacity="0.35"
                strokeWidth="2"
              />
            </g>
          ))}
        </g>

        {/* Chocolate spread */}
        <g
          style={{
            transformOrigin: "320px 320px",
            transform: `scale(${chocScale.toFixed(3)})`,
            opacity: choc > 0 ? 1 : 0,
          }}
        >
          <path d={chocolateBlob} fill="url(#wb-choc)" filter="url(#wb-soft)" />
          <path
            d="M 236 236 Q 290 196 356 214"
            fill="none"
            stroke="#9a6133"
            strokeOpacity="0.55"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </g>

        {/* Bananas */}
        {bananas.map((b, i) => {
          const t = stagger(p, fruitA, fruitA + 0.1, i, bananas.length);
          const d = drop(t);
          return (
            <g
              key={`b${i}`}
              style={{
                transformOrigin: `${b.x}px ${b.y}px`,
                transform: d.transform,
                opacity: d.opacity,
              }}
              filter="url(#wb-soft)"
            >
              <circle
                cx={b.x}
                cy={b.y}
                r={b.r}
                fill="url(#wb-banana)"
                stroke="#d9b24d"
                strokeWidth="2"
              />
              <circle
                cx={b.x}
                cy={b.y}
                r={b.r * 0.42}
                fill="none"
                stroke="#e5c66a"
                strokeWidth="1.5"
                strokeDasharray="4 5"
              />
              <circle cx={b.x - 3} cy={b.y - 2} r={1.6} fill="#7a5a1a" />
              <circle cx={b.x + 4} cy={b.y + 1} r={1.6} fill="#7a5a1a" />
              <circle cx={b.x} cy={b.y + 4} r={1.4} fill="#7a5a1a" />
            </g>
          );
        })}

        {/* Kiwis */}
        {kiwis.map((k, i) => {
          const t = stagger(p, fruitA + 0.08, fruitA + 0.16, i, kiwis.length);
          const d = drop(t);
          return (
            <g
              key={`k${i}`}
              style={{
                transformOrigin: `${k.x}px ${k.y}px`,
                transform: d.transform,
                opacity: d.opacity,
              }}
              filter="url(#wb-soft)"
            >
              <circle
                cx={k.x}
                cy={k.y}
                r={k.r}
                fill="url(#wb-kiwi)"
                stroke="#4e7a21"
                strokeWidth="2"
              />
              {Array.from({ length: 10 }, (_, j) => {
                const a = (j / 10) * Math.PI * 2;
                return (
                  <circle
                    key={j}
                    cx={k.x + Math.cos(a) * k.r * 0.5}
                    cy={k.y + Math.sin(a) * k.r * 0.5}
                    r={1.8}
                    fill="#1f2a12"
                  />
                );
              })}
            </g>
          );
        })}

        {/* Strawberries */}
        {strawberries.map((s, i) => {
          const t = stagger(p, fruitA + 0.14, fruitB, i, strawberries.length);
          const d = drop(t, -200);
          return (
            <g
              key={`s${i}`}
              style={{
                transformOrigin: `${s.x}px ${s.y}px`,
                transform: d.transform,
                opacity: d.opacity,
              }}
              filter="url(#wb-soft)"
            >
              <g transform={`translate(${s.x} ${s.y}) rotate(${s.rot})`}>
                <path
                  d="M -22 -10 C -22 -30 -6 -34 0 -24 C 6 -34 22 -30 22 -10 C 22 10 8 26 0 32 C -8 26 -22 10 -22 -10 Z"
                  fill="url(#wb-berry)"
                />
                <path
                  d="M -14 -8 C -14 -20 -6 -24 -2 -18 C -2 -8 -6 6 0 18 C -8 10 -14 2 -14 -8 Z"
                  fill="#f98b99"
                  opacity="0.6"
                />
                {[
                  [-10, -4],
                  [4, -8],
                  [-3, 6],
                  [10, 2],
                  [-8, 14],
                  [6, 14],
                  [0, -14],
                ].map(([x, y], j) => (
                  <ellipse
                    key={j}
                    cx={x}
                    cy={y}
                    rx={1.6}
                    ry={2.2}
                    fill="#fde7b5"
                  />
                ))}
                <path
                  d="M -12 -26 L -4 -20 L 0 -30 L 4 -20 L 12 -26 L 6 -16 L -6 -16 Z"
                  fill="#3f8a2e"
                />
              </g>
            </g>
          );
        })}

        {/* Pistachio crumbs */}
        {crumbs.map(([x, y, r], i) => {
          const t = stagger(pist, 0, 1, i, crumbs.length, 0.75);
          const d = drop(t, -90);
          return (
            <g
              key={`c${i}`}
              style={{
                transformOrigin: `${x}px ${y}px`,
                transform: d.transform,
                opacity: d.opacity,
              }}
            >
              <ellipse
                cx={x}
                cy={y}
                rx={7}
                ry={3.6}
                fill={
                  i % 3 === 0 ? "#6c9a3b" : i % 3 === 1 ? "#8db255" : "#a9c46a"
                }
                transform={`rotate(${r} ${x} ${y})`}
              />
            </g>
          );
        })}

        {/* Powdered sugar settles last */}
        {sugar.map(([x, y], i) => {
          const t = stagger(done, 0, 0.9, i, sugar.length, 0.8);
          return (
            <circle
              key={`g${i}`}
              cx={x}
              cy={y}
              r={i % 4 === 0 ? 2.6 : 1.7}
              fill="#fff8e6"
              style={{
                opacity: easeOutCubic(t) * 0.9,
                transform: `translateY(${lerp(-40, 0, easeOutCubic(t))}px)`,
              }}
            />
          );
        })}

        {/* Bitter sauce drizzle: draws along its own length */}
        <path
          d={drizzle}
          fill="none"
          stroke="#1f0f06"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - easeOutCubic(sauce)}
          style={{ opacity: sauce > 0 ? 0.95 : 0 }}
          filter="url(#wb-soft)"
        />
        <path
          d={drizzle}
          fill="none"
          stroke="#6b3d1e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - easeOutCubic(sauce)}
          style={{ opacity: sauce > 0 ? 0.5 : 0 }}
          transform="translate(-1 -2)"
        />
      </g>
    </svg>
  );
}

/* ───────────── Section ───────────── */

export function WaffleBuilder() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const scrolled = useScrollProgress(ref);
  const p = reduced ? 1 : scrolled;

  const activeIndex = Math.max(
    0,
    steps.findIndex((s) => p >= s.from && p < s.to),
    p >= 1 ? steps.length - 1 : -1,
  );
  const active = steps[activeIndex];
  const done = window01(p, 0.92, 1);

  return (
    <section
      ref={ref}
      aria-label="Bir Bambaşka Waffle nasıl hazırlanır"
      className={`relative bg-forest-900 text-cream-100 ${reduced ? "" : "h-[460vh]"}`}
    >
      <div
        className={`${reduced ? "" : "sticky top-0 h-[100svh]"} overflow-hidden`}
      >
        <div className="waffle-grid absolute inset-0 opacity-25" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_50%,rgb(215_180_106/0.14),transparent_70%)]"
          aria-hidden
        />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col px-5 pb-6 pt-24 sm:px-8 lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10 lg:pb-0 lg:pt-20">
          {/* Copy */}
          <div className="relative z-10">
            <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">
              <span className="h-px w-8 bg-gold-400" aria-hidden />
              Kaydır, katman katman izle
            </p>
            <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Bir Bambaşka Waffle{" "}
              <em className="italic text-gold-300">nasıl doğar?</em>
            </h2>

            {/* Mobile: single active caption */}
            <div className="relative mt-5 h-20 lg:hidden" aria-live="polite">
              {steps.map((s, i) => (
                <div
                  key={s.key}
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    opacity: i === activeIndex ? 1 : 0,
                    transform: `translateY(${i === activeIndex ? 0 : 8}px)`,
                  }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-400">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(steps.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-display text-2xl text-cream-100">
                    {s.title}
                  </p>
                  <p className="mt-1 text-sm text-cream-100/70">{s.text}</p>
                </div>
              ))}
            </div>

            {/* Desktop: stepper */}
            <ol className="mt-10 hidden lg:block">
              {steps.map((s, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;
                return (
                  <li
                    key={s.key}
                    className="relative flex gap-5 pb-6 last:pb-0"
                  >
                    <span className="relative flex flex-col items-center">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-500 ${
                          isActive
                            ? "border-gold-400 bg-gold-400 text-forest-900 shadow-[0_0_0_6px_rgb(215_180_106/0.15)]"
                            : isPast
                              ? "border-gold-400/60 bg-forest-800 text-gold-300"
                              : "border-cream-100/15 text-cream-100/40"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < steps.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-cream-100/10">
                          <span
                            className="block w-px bg-gold-400 transition-[height] duration-300"
                            style={{
                              height: `${Math.round(window01(p, s.from, s.to) * 100)}%`,
                            }}
                          />
                        </span>
                      )}
                    </span>
                    <div className="pt-1.5">
                      <p
                        className={`font-display text-2xl transition-colors duration-500 ${
                          isActive
                            ? "text-cream-100"
                            : isPast
                              ? "text-cream-100/70"
                              : "text-cream-100/35"
                        }`}
                      >
                        {s.title}
                      </p>
                      <p
                        className="overflow-hidden text-sm leading-relaxed text-cream-100/65 transition-all duration-500"
                        style={{
                          maxHeight: isActive ? 80 : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 6 : 0,
                        }}
                      >
                        {s.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Completion CTA */}
            <div
              className="mt-8 flex flex-wrap items-center gap-4 transition-all duration-700"
              style={{
                opacity: done,
                transform: `translateY(${lerp(16, 0, done)}px)`,
                pointerEvents: done > 0.5 ? "auto" : "none",
              }}
            >
              <Link
                href="/menu#waffle"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold-400 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-forest-900 transition hover:bg-gold-300"
              >
                Bambaşka Waffle · ₺310
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-sm text-cream-100/60">{active.text}</span>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative mx-auto mt-4 aspect-square w-full max-w-[min(88vw,52svh)] lg:mt-0 lg:max-w-[560px]">
            <WaffleScene p={p} />
          </div>
        </div>

        {/* progress rail */}
        {!reduced && (
          <div
            className="absolute bottom-0 left-0 h-1 w-full bg-cream-100/10"
            aria-hidden
          >
            <div
              className="h-full bg-gold-400 transition-[width] duration-150"
              style={{ width: `${p * 100}%` }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
