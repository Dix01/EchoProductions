"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EchoMark } from "@/components/ui/EchoIdentity";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { easings } from "@/lib/animations/easing";

const systems = [
  ["01", "World Engine", "Period worlds, crowds, skies, and ruins treated as one living plate."],
  ["02", "Frame Intelligence", "Every shot carries a data spine: ratio, runtime, texture, silence."],
  ["03", "Sacred Realism", "Scale without spectacle. Myth grounded in dust, breath, and consequence."]
];

const metrics = [
  ["2.39:1", "PRIMARY FRAME"],
  ["0847", "LEADER COUNT"],
  ["00DB", "SILENT MIX"],
  ["2026", "BADR PIPELINE"]
];

export function StudioApparatus() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="apparatus"
      className="relative overflow-hidden border-y border-line/10 bg-page px-gutter py-20 md:py-28"
      aria-label="ECHO studio apparatus"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgb(var(--color-gold)/0.08),transparent_32%),linear-gradient(180deg,rgb(var(--color-navy)/0.22),transparent_36%,rgb(var(--color-page)))]" />
      <div className="relative z-10 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <motion.div
          className="flex flex-col justify-between gap-16"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.92, ease: easings.enter }}
        >
          <div>
            <div className="mono-meta mb-7 text-gold">APPARATUS / COMPUTATIONAL CINEMA</div>
            <h2 className="display-section max-w-[8.5ch] text-ink">
              The studio is the camera.
            </h2>
          </div>
          <div className="grid grid-cols-2 border-y border-line/10 mono-meta md:max-w-xl">
            {metrics.map(([value, label]) => (
              <div key={label} className="border-b border-line/10 py-5 even:border-l even:pl-5 md:border-b-0">
                <div className="text-ink">{value}</div>
                <div className="mt-2 text-muted">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[74vh] overflow-hidden border border-line/10 bg-veil/40">
          <LazyVideo
            active
            webm="/assets/hero/echo-opening-gate.webm"
            mp4="/assets/hero/echo-opening-gate.mp4"
            poster="/assets/hero/echo-opening-gate.webp"
            label="ECHO apparatus cinematic loop"
            className="absolute inset-0 h-full w-full object-cover opacity-44"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--color-page)/0.86),transparent_58%),linear-gradient(180deg,transparent,rgb(var(--color-page)/0.82))]" />
          <EchoMark
            decorative
            className="absolute right-[-8rem] top-[-8rem] h-[24rem] w-[24rem] text-gold/[0.08]"
            strokeScale={0.82}
          />
          <div className="relative z-10 grid h-full content-end gap-0 p-6 md:p-10">
            {systems.map(([id, title, detail], index) => (
              <motion.article
                key={id}
                className="grid gap-5 border-t border-line/10 py-6 md:grid-cols-[5rem_0.75fr_1fr] md:items-baseline"
                initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 0.72,
                  ease: easings.enter,
                  delay: shouldReduce ? 0 : index * 0.07
                }}
              >
                <div className="mono-meta text-gold">{id}</div>
                <h3 className="font-display text-4xl leading-none text-ink md:text-6xl">
                  {title}
                </h3>
                <p className="max-w-md text-sm leading-6 text-ink/72">{detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
