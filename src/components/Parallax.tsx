"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; speed?: number; className?: string };

/**
 * Moves its content slightly against the scroll direction. The inner layer is
 * taller than the frame so the shift never exposes an edge. Degrades to static.
 */
export function Parallax({ children, speed = 0.12, className = "" }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const bleed = 0.14; // extra height on each side, as a fraction of the frame

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = o.getBoundingClientRect();
      const max = r.height * bleed;
      const raw = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      const offset = Math.max(-max, Math.min(max, raw));
      i.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={outer} className={`relative overflow-hidden ${className}`}>
      <div
        ref={inner}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${bleed * 100}%`, bottom: `-${bleed * 100}%` }}
      >
        {children}
      </div>
    </div>
  );
}
