"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { easings } from "@/lib/animations/easing";

const targetFrame = 847;
const letters = ["E", "C", "H", "O"];

export function Preloader() {
  const shouldReduce = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    let timeout = 0;
    const start = performance.now();
    const duration = shouldReduce ? 350 : 1400;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setFrame(Math.floor(eased * targetFrame));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    timeout = window.setTimeout(() => setDone(true), shouldReduce ? 700 : 1900);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [shouldReduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-preload grid place-items-center bg-page"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.78, ease: easings.exit }
          }}
        >
          <div className="flex flex-col items-center gap-7">
            <motion.div
              className="font-mono text-[0.76rem] tracking-[0.22em] text-gold"
              aria-label={`Frame ${frame}`}
            >
              {String(frame).padStart(4, "0")}
            </motion.div>
            <div className="flex overflow-hidden font-display text-6xl leading-none text-ink md:text-8xl">
              {letters.map((letter, index) => (
                <motion.span
                  key={letter}
                  className="relative block px-1"
                  initial={{
                    clipPath: "inset(0 100% 0 0)"
                  }}
                  animate={{
                    clipPath: "inset(0 0% 0 0)"
                  }}
                  transition={{
                    delay: shouldReduce ? 0 : 0.38 + index * 0.09,
                    duration: shouldReduce ? 0.01 : 0.62,
                    ease: easings.enter
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_6px,rgb(var(--color-page)/0.9)_6px,rgb(var(--color-page)/0.9)_8px)]"
                  />
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
