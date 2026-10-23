"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

/** Maps progress p onto the window [a, b] and returns 0..1 inside it. */
export const window01 = (p: number, a: number, b: number) =>
  clamp((p - a) / (b - a));

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    const id = requestAnimationFrame(onChange);
    mq.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", onChange);
    };
  }, []);
  return reduced;
}

/**
 * Progress (0..1) of a tall element scrolling through the viewport: 0 when its
 * top reaches the viewport top, 1 when its bottom reaches the viewport bottom.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      raf.current = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const next = total <= 0 ? 1 : clamp(-rect.top / total);
      setProgress((prev) => (Math.abs(prev - next) < 0.0015 ? prev : next));
    };
    const schedule = () => {
      if (!raf.current) raf.current = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [ref]);

  return progress;
}
