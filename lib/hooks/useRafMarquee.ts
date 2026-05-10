"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function useRafMarquee(speed = 18) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce || !ref.current) {
      return;
    }

    let frame = 0;
    let previous = performance.now();
    let offset = 0;

    const tick = (time: number) => {
      const delta = Math.min(time - previous, 64) / 1000;
      previous = time;
      offset += delta * speed;

      const width = (ref.current?.scrollWidth ?? 0) / 2;
      if (ref.current && width > 0) {
        ref.current.style.transform = `translate3d(${-offset % width}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [shouldReduce, speed]);

  return ref;
}
