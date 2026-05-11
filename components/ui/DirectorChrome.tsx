"use client";

import { useEffect } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { EchoLockup } from "./EchoIdentity";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "#work", label: "WORK" },
  { href: "#apparatus", label: "SYSTEM" },
  { href: "#badr", label: "BADR" },
  { href: "#contact", label: "CONTACT" }
];

export function DirectorChrome() {
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2
  });
  const frame = useTransform(scrollYProgress, (value) =>
    String(Math.round(value * 847)).padStart(4, "0")
  );

  useMotionValueEvent(frame, "change", (latest) => {
    document.documentElement.style.setProperty("--current-frame", `"${latest}"`);
  });

  useEffect(() => {
    if (shouldReduce) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [shouldReduce]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 h-px w-full origin-left bg-gold/80"
        style={{ scaleX }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      >
        <div className="spatial-light absolute inset-0 bg-[radial-gradient(460px_circle_at_var(--mouse-x)_var(--mouse-y),rgb(var(--color-gold)/0.08),transparent_68%)]" />
        <div className="absolute left-0 right-0 top-0 h-8 bg-[linear-gradient(180deg,rgb(var(--color-page)/0.88),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[linear-gradient(0deg,rgb(var(--color-page)/0.88),transparent)]" />
      </div>
      <nav
        className="fixed left-0 right-0 top-0 z-50 flex items-start justify-between gap-6 px-gutter py-5 text-ink"
        aria-label="Primary"
      >
        <a href="#top" data-cursor="top" className="transition-opacity duration-500 ease-enter hover:opacity-70">
          <EchoLockup compact meta="AI FILM STUDIO" />
        </a>
        <div className="hidden items-center gap-7 rounded-full border border-line/10 bg-page/35 px-5 py-3 backdrop-blur-md md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="go"
              className="mono-meta text-muted transition-colors duration-300 ease-enter hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-start gap-3">
          <ThemeToggle />
          <div className="mono-meta hidden min-w-[5rem] pt-3 text-right text-gold sm:block">
            <motion.span>{frame}</motion.span>
          </div>
        </div>
      </nav>
    </>
  );
}
