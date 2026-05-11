"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/animations/easing";
import { EchoMark } from "@/components/ui/EchoIdentity";

const pillars = [
  {
    id: "01",
    title: "Non-linear architecture",
    detail: "Stories treated as spaces, not timelines."
  },
  {
    id: "02",
    title: "Temporal compression",
    detail: "Centuries folded into a single charged image."
  },
  {
    id: "03",
    title: "Sacred realism",
    detail: "Belief rendered with physical consequence."
  },
  {
    id: "04",
    title: "Silence",
    detail: "Absence used as a cinematic instrument."
  }
];

export function TemporalThesis() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-line/10 bg-page px-gutter py-20 md:py-28"
      aria-label="ECHO creative thesis"
    >
      <EchoMark
        decorative
        className="absolute left-[42%] top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 text-ink/[0.028]"
        strokeScale={0.74}
      />
      <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.86, ease: easings.enter }}
        >
          <div className="mono-meta mb-8 text-gold">AUTHORSHIP / SYSTEM</div>
          <h2 className="display-section max-w-[8.5ch] text-ink">
            Cinema with a nervous system.
          </h2>
        </motion.div>
        <div className="grid gap-0 border-t border-line/10">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.id}
              className="grid gap-5 border-b border-line/10 py-6 md:grid-cols-[5rem_1fr_1fr] md:items-baseline"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.74,
                ease: easings.enter,
                delay: shouldReduce ? 0 : index * 0.055
              }}
            >
              <div className="mono-meta text-gold">{pillar.id}</div>
              <h3 className="font-display text-3xl leading-none text-ink md:text-5xl">
                {pillar.title}
              </h3>
              <p className="max-w-sm text-sm leading-6 text-muted">{pillar.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
