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

export function Collaborators() {
  const [active, setActive] = useState<number | null>(null);

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
        animate={{ opacity: active === null ? 0 : 1 }}
        transition={{ duration: 0.78, ease: easings.enter }}
      >
        <div className="asset-plate h-full w-full" />
      </motion.div>
    </section>
  );
}
