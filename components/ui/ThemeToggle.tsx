"use client";

import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { easings } from "@/lib/animations/easing";
import { useTheme } from "@/lib/hooks/useTheme";

export function ThemeToggle() {
  const { mounted, theme, toggleTheme } = useTheme();
  const shouldReduce = useReducedMotion();
  const isLight = mounted && theme === "light";

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      data-cursor="tone"
      onClick={toggleTheme}
      className="group grid h-11 w-11 place-items-center rounded-full border border-line/12 bg-page/50 text-ink backdrop-blur-md transition-colors duration-[380ms] ease-enter hover:border-gold/45 hover:text-gold"
    >
      <span className="sr-only">{isLight ? "Switch to dark mode" : "Switch to light mode"}</span>
      <span className="relative grid h-4 w-4 place-items-center overflow-hidden">
        <motion.span
          className="absolute"
          initial={false}
          animate={{
            opacity: isLight ? 0 : 1,
            rotate: shouldReduce ? 0 : isLight ? -45 : 0,
            y: shouldReduce ? 0 : isLight ? 12 : 0
          }}
          transition={{ duration: shouldReduce ? 0.01 : 0.48, ease: easings.enter }}
        >
          <Moon className="h-4 w-4" aria-hidden="true" />
        </motion.span>
        <motion.span
          className="absolute"
          initial={false}
          animate={{
            opacity: isLight ? 1 : 0,
            rotate: shouldReduce ? 0 : isLight ? 0 : 45,
            y: shouldReduce ? 0 : isLight ? 0 : -12
          }}
          transition={{ duration: shouldReduce ? 0.01 : 0.48, ease: easings.enter }}
        >
          <Sun className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </span>
    </button>
  );
}
