"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { easings } from "@/lib/animations/easing";

const collaborators = [
  "Mohamed Ramadan",
  "Ahmed El Fishawy",
  "Khaled Diab",
  "Ahmed Dessouky",
  "Future Collaborator",
  "Future Collaborator"
];

const portraitPlates = [
  "radial-gradient(circle at 52% 24%, rgba(235,229,216,0.28), transparent 10%), radial-gradient(ellipse at 50% 42%, rgba(7,7,7,0.95) 0 18%, transparent 19%), linear-gradient(145deg, rgba(201,169,97,0.22), rgba(0,0,0,0.92) 52%, rgba(10,14,26,0.72))",
  "radial-gradient(circle at 48% 22%, rgba(235,229,216,0.2), transparent 11%), radial-gradient(ellipse at 48% 43%, rgba(6,6,6,0.96) 0 19%, transparent 20%), linear-gradient(145deg, rgba(30,43,56,0.72), rgba(0,0,0,0.94) 58%, rgba(201,169,97,0.16))",
  "radial-gradient(circle at 54% 23%, rgba(235,229,216,0.24), transparent 10%), radial-gradient(ellipse at 54% 45%, rgba(5,5,5,0.96) 0 20%, transparent 21%), linear-gradient(145deg, rgba(52,45,32,0.7), rgba(0,0,0,0.96) 54%, rgba(10,14,26,0.64))",
  "radial-gradient(circle at 50% 23%, rgba(235,229,216,0.2), transparent 10%), radial-gradient(ellipse at 50% 44%, rgba(5,5,5,0.96) 0 18%, transparent 19%), linear-gradient(145deg, rgba(12,20,28,0.76), rgba(0,0,0,0.95) 58%, rgba(201,169,97,0.13))",
  "radial-gradient(circle at 50% 22%, rgba(235,229,216,0.16), transparent 10%), radial-gradient(ellipse at 50% 43%, rgba(5,5,5,0.95) 0 18%, transparent 19%), linear-gradient(145deg, rgba(18,18,18,0.9), rgba(0,0,0,0.98) 55%, rgba(201,169,97,0.1))",
  "radial-gradient(circle at 50% 22%, rgba(235,229,216,0.14), transparent 10%), radial-gradient(ellipse at 50% 43%, rgba(5,5,5,0.95) 0 18%, transparent 19%), linear-gradient(145deg, rgba(8,11,17,0.9), rgba(0,0,0,0.98) 55%, rgba(201,169,97,0.1))"
];

export function Collaborators() {
  const [active, setActive] = useState<number | null>(null);
  const activeIndex = active ?? 0;

  return (
    <section
      className="relative min-h-screen overflow-hidden border-y border-line/10 bg-page px-gutter py-20 md:py-28"
      aria-label="ECHO collaborators"
      onMouseLeave={() => setActive(null)}
    >
      <motion.div
        className="asset-plate absolute inset-0"
        initial={false}
        animate={{ opacity: active === null ? 0 : 0.4 }}
        transition={{ duration: 0.78, ease: easings.enter }}
        style={{
          background:
            active === null
              ? "rgb(var(--color-page))"
              : "linear-gradient(135deg, rgba(23,23,21,0.95), rgba(0,0,0,0.98) 58%, rgba(201,169,97,0.12))"
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        initial={false}
        animate={{ opacity: active === null ? 0 : 0.62 }}
        transition={{ duration: 0.9, ease: easings.enter }}
      >
        <div className="absolute inset-0 bg-page" />
        <div
          className="absolute right-[7vw] top-1/2 aspect-[3/4] w-[31vw] -translate-y-1/2 overflow-hidden border border-line/10"
          style={{ background: portraitPlates[activeIndex] }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_5px,rgb(var(--color-ink)/0.05)_5px,rgb(var(--color-ink)/0.05)_6px)] mix-blend-screen" />
          <div className="absolute inset-x-8 bottom-0 h-[46%] rounded-t-full bg-page/70 blur-sm" />
        </div>
        <div className="absolute bottom-10 right-[7vw] mono-meta text-gold">
          ARCHIVAL HOLD / {String(activeIndex + 1).padStart(2, "0")}
        </div>
      </motion.div>
      <div className="relative z-10 mb-14 flex items-center justify-between gap-8">
        <div className="mono-meta text-gold">COLLABORATORS</div>
        <div className="mono-meta text-muted">ARCHIVE / ONGOING</div>
      </div>
      <div className="relative z-10 grid gap-y-5">
        {collaborators.map((name, index) => (
          <button
            key={`${name}-${index}`}
            type="button"
            data-cursor="hold"
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            className="w-full border-b border-line/10 py-3 text-left"
          >
            <motion.span
              className="block font-display text-5xl leading-[0.95] text-ink md:text-8xl lg:text-9xl"
              initial={false}
              animate={{
                opacity: active === null || active === index ? 1 : 0.2,
                x: active === index ? 10 : 0
              }}
              transition={{ duration: 0.64, ease: easings.enter }}
            >
              {name}
            </motion.span>
          </button>
        ))}
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6vw] top-1/2 hidden aspect-[3/4] w-[28vw] -translate-y-1/2 overflow-hidden border border-line/10 bg-navy/40 md:block"
        initial={false}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.78, ease: easings.enter }}
      >
        <div className="asset-plate h-full w-full" />
      </motion.div>
    </section>
  );
}
