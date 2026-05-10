import type { Variants } from "framer-motion";
import { durations, easings } from "./easing";

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.08
    }
  }
};

export const quietReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.reveal,
      ease: easings.enter
    }
  }
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.reveal,
      ease: easings.enter
    }
  }
};
