"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { easings } from "@/lib/animations/easing";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function FrameMatrix() {
  const [active, setActive] = useState(0);
  const shouldReduce = useReducedMotion();
  const project = projects[active];

  return (
    <section
      className="relative overflow-hidden bg-page px-gutter py-20 md:py-28"
      aria-label="ECHO frame matrix"
    >
      <div className="mb-12 flex items-end justify-between gap-8">
        <div>
          <div className="mono-meta mb-5 text-gold">FRAME MATRIX / LIVE INDEX</div>
          <h2 className="max-w-[11ch] font-display text-5xl leading-[0.94] text-ink md:text-8xl">
            The archive looks back.
          </h2>
        </div>
        <div className="hidden mono-meta text-muted md:block">05 SIGNALS / 06 ASSETS / 00 AUDIO</div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
        <motion.div
          key={project.slug}
          className="asset-plate min-h-[62vh] border border-line/10"
          style={{ background: project.plate }}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: easings.enter }}
        >
          <LazyVideo
            active
            webm={project.video?.webm}
            mp4={project.video?.mp4}
            poster={project.video?.poster}
            label={`${project.title} frame matrix loop`}
            className="h-full min-h-[62vh] w-full object-cover opacity-78"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--color-page)/0.52),transparent_58%,rgb(var(--color-page)/0.26))]" />
          <div className="absolute bottom-6 left-6 right-6 grid gap-5 md:bottom-10 md:left-10 md:right-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="mono-meta mb-3 text-gold">
                {String(active + 1).padStart(2, "0")} / {project.category}
              </div>
              <h3 className="max-w-[8ch] font-display text-5xl leading-[0.94] text-ink md:text-7xl">
                {project.title}
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink/74">{project.description}</p>
          </div>
        </motion.div>

        <div className="grid border-t border-line/10">
          {projects.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              data-cursor="cue"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className="grid grid-cols-[4.5rem_1fr] items-center gap-5 border-b border-line/10 py-4 text-left md:grid-cols-[6rem_1fr]"
              aria-pressed={active === index}
            >
              <span className="asset-plate relative aspect-video overflow-hidden border border-line/10">
                {item.video?.poster ? (
                  <Image
                    src={item.video.poster}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 96px, 72px"
                    className="object-cover opacity-75"
                  />
                ) : null}
              </span>
              <span className="grid gap-2">
                <span
                  className={`font-display text-3xl leading-none transition-colors duration-500 ease-enter md:text-5xl ${
                    active === index ? "text-ink" : "text-muted"
                  }`}
                >
                  {item.title}
                </span>
                <span className="mono-meta text-muted">
                  {String(index + 1).padStart(2, "0")} / {item.year} / {item.ratio}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
