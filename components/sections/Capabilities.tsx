"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easings } from "@/lib/animations/easing";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    name: "VFX",
    text: "Impossible images, physically restrained.",
    plate:
      "linear-gradient(135deg, rgba(9,13,24,0.95), rgba(0,0,0,0.98) 54%, rgba(201,169,97,0.1))"
  },
  {
    name: "Feature Films",
    text: "Long-form worlds with computational bones.",
    plate:
      "linear-gradient(135deg, rgba(15,17,19,0.96), rgba(0,0,0,0.98) 52%, rgba(94,78,45,0.17))"
  },
  {
    name: "Short Films",
    text: "Compressed cinema with room to breathe.",
    plate:
      "linear-gradient(135deg, rgba(7,12,17,0.96), rgba(0,0,0,0.98) 52%, rgba(84,90,96,0.18))"
  },
  {
    name: "Music Videos",
    text: "Rhythm treated as architecture.",
    plate:
      "linear-gradient(135deg, rgba(22,10,14,0.94), rgba(0,0,0,0.98) 50%, rgba(201,169,97,0.12))"
  },
  {
    name: "Commercials",
    text: "Product films without the noise.",
    plate:
      "linear-gradient(135deg, rgba(5,8,13,0.98), rgba(0,0,0,1) 58%, rgba(201,169,97,0.08))"
  }
];

export function Capabilities() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shouldReduce = useReducedMotion();

  useLayoutEffect(() => {
    if (shouldReduce || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index)
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduce]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-page"
      aria-label="ECHO capabilities"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-gutter">
        {capabilities.map((capability, index) => (
          <motion.div
            key={capability.name}
            className="asset-plate absolute inset-0"
            style={{ background: capability.plate }}
            initial={false}
            animate={{ opacity: active === index ? 0.48 : 0 }}
            transition={{ duration: 0.82, ease: easings.enter }}
            aria-hidden="true"
          />
        ))}
        <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mono-meta mb-8 text-gold">CAPABILITIES</div>
            <motion.h2
              key={capabilities[active].name}
              className="display-section max-w-[9ch] text-ink"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.86, ease: easings.enter }}
            >
              {capabilities[active].name}
            </motion.h2>
            <motion.p
              key={`${capabilities[active].name}-copy`}
              className="mt-8 max-w-sm text-base leading-7 text-ink/70"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: easings.enter, delay: 0.08 }}
            >
              {capabilities[active].text}
            </motion.p>
          </div>
          <div className="space-y-4">
            {capabilities.map((capability, index) => (
              <button
                key={capability.name}
                type="button"
                data-cursor="set"
                onClick={() => setActive(index)}
                className="group flex w-full items-center justify-between border-b border-line/10 py-4 text-left"
              >
                <span
                  className={`font-display text-3xl leading-none transition-opacity duration-500 ease-enter md:text-5xl ${
                    active === index ? "text-ink opacity-100" : "text-muted opacity-45"
                  }`}
                >
                  {capability.name}
                </span>
                <span className="mono-meta text-muted">{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden="true">
        {capabilities.map((capability, index) => (
          <div
            key={capability.name}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className="h-[82vh]"
          />
        ))}
      </div>
    </section>
  );
}
