"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { easings } from "@/lib/animations/easing";
import { EchoMark, EchoWordmark } from "./EchoIdentity";

const targetFrame = 847;

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
              className="text-gold"
              initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: shouldReduce ? 0.01 : 0.72, ease: easings.enter, delay: 0.12 }}
            >
              <EchoMark
                decorative
                axis={false}
                echoes={false}
                perfs={false}
                spiral={false}
                strokeScale={1.35}
                className="h-14 w-14 md:h-16 md:w-16"
              />
            </motion.div>
            <motion.div
              className="font-mono text-[0.76rem] tracking-[0.22em] text-gold"
              aria-label={`Frame ${frame}`}
            >
              {String(frame).padStart(4, "0")}
            </motion.div>
            <motion.div
              className="relative overflow-hidden text-ink"
              initial={{ clipPath: shouldReduce ? "inset(0 0 0 0)" : "inset(0 100% 0 0)", opacity: shouldReduce ? 0 : 1 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{
                delay: shouldReduce ? 0 : 0.42,
                duration: shouldReduce ? 0.01 : 0.86,
                ease: easings.enter
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_6px,rgb(var(--color-page)/0.92)_6px,rgb(var(--color-page)/0.92)_8px)]"
              />
              <EchoWordmark decorative className="h-12 w-auto md:h-16" tracking={0.6} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
