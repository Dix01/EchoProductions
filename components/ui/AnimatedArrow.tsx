"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/animations/easing";

export function AnimatedArrow({ active = false }: { active?: boolean }) {
  const shouldReduce = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 92 22"
      className="h-6 w-24 overflow-visible text-gold"
      fill="none"
    >
      <motion.path
        d="M2 11H88"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        initial={false}
        animate={{
          pathLength: active || shouldReduce ? 1 : 0.58,
          opacity: active || shouldReduce ? 1 : 0.56
        }}
        transition={{ duration: 0.38, ease: easings.hover }}
      />
      <motion.path
        d="M78 3L88 11L78 19"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          pathLength: active || shouldReduce ? 1 : 0,
          opacity: active || shouldReduce ? 1 : 0
        }}
        transition={{ duration: 0.38, ease: easings.hover, delay: 0.05 }}
      />
    </svg>
  );
}
