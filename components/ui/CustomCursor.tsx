"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion
} from "framer-motion";

const interactiveSelector =
  "a, button, [role='button'], input, textarea, select, [data-cursor]";

export function CustomCursor() {
  const shouldReduce = useReducedMotion();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 480, damping: 38, mass: 0.32 });
  const y = useSpring(mouseY, { stiffness: 480, damping: 38, mass: 0.32 });
  const cursorX = useTransform(x, (value) => value - 18);
  const cursorY = useTransform(y, (value) => value - 18);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    setCoarse(coarseQuery.matches);

    const updateCoarse = (event: MediaQueryListEvent) => setCoarse(event.matches);
    coarseQuery.addEventListener("change", updateCoarse);

    return () => coarseQuery.removeEventListener("change", updateCoarse);
  }, []);

  useEffect(() => {
    if (coarse || shouldReduce) {
      return;
    }

    const move = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };

    const leave = () => setVisible(false);

    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const hit = target?.closest(interactiveSelector) as HTMLElement | null;
      setActive(Boolean(hit));
      setLabel(hit?.dataset.cursor ?? "");
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerout", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [coarse, mouseX, mouseY, shouldReduce]);

  if (coarse || shouldReduce) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-cursor hidden h-9 w-9 items-center justify-center rounded-full border border-gold/80 text-[0.46rem] font-mono uppercase text-page mix-blend-difference md:flex"
      style={{ x: cursorX, y: cursorY }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: active ? 1.85 : 1,
        backgroundColor: active ? "rgb(var(--color-gold))" : "rgba(0,0,0,0)"
      }}
      transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
    >
      {label}
    </motion.div>
  );
}
