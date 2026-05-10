"use client";

import { LazyVideo } from "@/components/ui/LazyVideo";
import { useRafMarquee } from "@/lib/hooks/useRafMarquee";

const descriptors = ["SACRED", "TEMPORAL", "SILENT", "MONUMENTAL"];

export function CurrentProduction() {
  const marqueeRef = useRafMarquee(20);
  const line = descriptors.join(" / ");

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-page"
      aria-label="Current ECHO production"
    >
      <div className="asset-plate absolute inset-x-gutter top-16 bottom-24 border border-line/10">
        <LazyVideo
          active
          webm="/assets/production/battle-of-badr-hero.webm"
          mp4="/assets/production/battle-of-badr-hero.mp4"
          poster="/assets/production/battle-of-badr-hero.webp"
          label="Battle of Badr atmospheric production loop"
          className="h-full w-full object-cover opacity-55 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--color-page)/0.12),rgb(var(--color-page)/0.64))]" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-gutter pb-24 pt-16">
        <div className="flex items-start justify-between gap-8">
          <div className="mono-meta text-gold">CURRENT PRODUCTION</div>
          <div className="mono-meta text-muted">IN PRODUCTION / 2026 / FEATURE</div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <h2 className="display-section max-w-[9ch] text-ink">
            The Battle of Badr
          </h2>
          <div className="grid grid-cols-2 gap-5 border-y border-line/10 py-5 mono-meta text-muted">
            <span className="text-gold">Sacred Realism</span>
            <span>Battle System</span>
            <span>Temporal Compression</span>
            <span>Feature Pipeline</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-line/10 bg-page py-5">
        <div
          ref={marqueeRef}
          className="flex w-max gap-10 whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gold"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index}>{line} /</span>
          ))}
        </div>
      </div>
    </section>
  );
}
