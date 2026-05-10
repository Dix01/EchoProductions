"use client";

import { useRef } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue
} from "framer-motion";

type MagneticReturn<T extends HTMLElement> = {
  ref: React.RefObject<T>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onPointerMove: (event: React.PointerEvent<T>) => void;
  onPointerLeave: () => void;
};

export function useMagneticHover<T extends HTMLElement>(
  strength = 6
): MagneticReturn<T> {
  const ref = useRef<T>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const shouldReduce = useReducedMotion();
  const x = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.45 });

  const onPointerMove = (event: React.PointerEvent<T>) => {
    if (shouldReduce || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    rawX.set(((localX / rect.width) - 0.5) * strength * 2);
    rawY.set(((localY / rect.height) - 0.5) * strength * 2);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, x, y, onPointerMove, onPointerLeave };
}
