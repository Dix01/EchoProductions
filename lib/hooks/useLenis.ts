"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: easeOutExpo,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      syncTouch: false
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
