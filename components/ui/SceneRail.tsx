"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const scenes = ["TITLE", "SYSTEM", "REEL", "CAP", "SILENCE", "CAST", "BADR", "CONTACT"];

export function SceneRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.25
  });
  const frame = useTransform(scrollYProgress, (value) =>
    String(Math.round(value * 847)).padStart(4, "0")
  );

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 md:flex"
    >
      <div className="flex h-[46vh] w-px origin-top overflow-hidden bg-line/12">
        <motion.div
          className="h-full w-px origin-top bg-gold"
          style={{ scaleY }}
        />
      </div>
      <div className="flex flex-col items-start gap-3 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-muted">
        <motion.span className="text-gold">{frame}</motion.span>
        {scenes.map((scene) => (
          <span key={scene}>{scene}</span>
        ))}
      </div>
    </aside>
  );
}
