"use client";

import { LazyVideo } from "@/components/ui/LazyVideo";
import { EchoMark } from "@/components/ui/EchoIdentity";
import { useRafMarquee } from "@/lib/hooks/useRafMarquee";

const descriptors = ["SACRED", "TEMPORAL", "SILENT", "MONUMENTAL"];
const starMap = [
  [18, 42],
  [31, 28],
  [44, 46],
  [57, 24],
  [70, 38],
  [82, 22]
];

export function CurrentProduction() {
  const marqueeRef = useRafMarquee(20);
  const line = descriptors.join(" / ");

  return (
    <section
      id="badr"
      className="relative min-h-screen overflow-hidden bg-page"
      aria-label="Current ECHO production"
    >
      <div className="asset-plate absolute inset-0">
        <LazyVideo
          active
          webm="/assets/production/battle-of-badr-hero.webm"
          mp4="/assets/production/battle-of-badr-hero.mp4"
          poster="/assets/production/battle-of-badr-hero.webp"
          label="Battle of Badr atmospheric production loop"
          className="h-full w-full object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_34%,rgb(var(--color-gold)/0.11),transparent_28%),linear-gradient(90deg,rgb(var(--color-page)/0.88),rgb(var(--color-page)/0.4)_48%,rgb(var(--color-page)/0.94)),linear-gradient(180deg,rgb(var(--color-page)/0.12),rgb(var(--color-page)/0.72))]" />
      </div>
      <EchoMark
        decorative
        className="absolute -bottom-40 right-[-18vw] z-0 h-[54vw] w-[54vw] text-gold/[0.08]"
        strokeScale={0.64}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 62"
        className="absolute right-gutter top-28 z-10 hidden w-[26vw] text-gold/55 md:block"
      >
        <polyline
          points={starMap.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.18"
          opacity="0.7"
        />
        {starMap.map(([x, y], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={index === 3 ? 1.2 : 0.72} fill="currentColor" />
        ))}
      </svg>
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-gutter pb-24 pt-24 md:pt-16">
        <div className="flex items-start justify-between gap-8">
          <div className="mono-meta text-gold">CURRENT PRODUCTION</div>
          <div className="hidden mono-meta text-muted sm:block">IN PRODUCTION / 2026 / FEATURE</div>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.48fr] lg:items-end">
          <h2 className="display-section max-w-[8ch] text-ink drop-shadow-[0_18px_70px_rgb(0_0_0/0.72)]">
            The Battle of Badr
          </h2>
          <div className="grid gap-8">
            <p className="max-w-md text-base leading-7 text-ink/78">
              A historical production built as a living atlas: terrain, witness,
              silence, and consequence held in one frame.
            </p>
            <div className="grid grid-cols-2 gap-5 border-y border-line/10 py-5 mono-meta text-muted">
              <span className="text-gold">Sacred Realism</span>
              <span>Battle System</span>
              <span>Temporal Compression</span>
              <span>Feature Pipeline</span>
            </div>
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
