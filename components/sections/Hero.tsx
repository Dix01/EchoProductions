"use client";

import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easings } from "@/lib/animations/easing";
import { EchoMark } from "@/components/ui/EchoIdentity";
import { LazyVideo } from "@/components/ui/LazyVideo";

const HeroShader = dynamic(() => import("./HeroShader"), { ssr: false });

const phrases = ["We make films.", "We make moments.", "We make memory."];

function useCairoTime() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Cairo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

function MaskedPhrase({ phrase }: { phrase: string }) {
  const shouldReduce = useReducedMotion();
  const tokens = phrase.split(/(\s+)/);

  return (
    <motion.span
      key={phrase}
      className="block"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: shouldReduce ? 0 : 0.045 }
        },
        exit: {
          transition: { staggerChildren: shouldReduce ? 0 : 0.025 }
        }
      }}
    >
      {tokens.map((token, tokenIndex) => (
        <motion.span
          key={`${phrase}-${token}-${tokenIndex}`}
          className="inline-block"
          style={{ whiteSpace: token.trim() === "" ? "pre" : "nowrap" }}
          variants={{
            hidden: {
              clipPath: shouldReduce ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              opacity: shouldReduce ? 0 : 1
            },
            visible: {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              transition: { duration: 0.68, ease: easings.enter }
            },
            exit: {
              clipPath: shouldReduce ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
              opacity: shouldReduce ? 0 : 1,
              transition: { duration: 0.48, ease: easings.exit }
            }
          }}
        >
          {token.split("").map((character, characterIndex) => (
            <span key={`${character}-${characterIndex}`} className="inline-block">
              {character}
            </span>
          ))}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const time = useCairoTime();
  const [phrase, setPhrase] = useState(phrases[0]);
  const [shaderReady, setShaderReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const phraseIndex = useTransform(scrollYProgress, [0, 0.28, 0.58, 0.86], [0, 1, 2, 2]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 28]);

  useMotionValueEvent(phraseIndex, "change", (latest) => {
    const next = phrases[Math.max(0, Math.min(2, Math.round(latest)))];
    setPhrase(next);
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShaderReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[185vh] overflow-clip bg-page"
      aria-label="ECHO studio introduction"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-gutter">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ scale: plateScale, y: shouldReduce ? "0%" : plateY }}
        >
          <LazyVideo
            active
            webm="/assets/hero/echo-opening-gate.webm"
            mp4="/assets/hero/echo-opening-gate.mp4"
            poster="/assets/hero/echo-opening-gate.webp"
            label="ECHO opening gate loop"
            className="h-full w-full object-cover opacity-36"
          />
        </motion.div>
        <div className="absolute inset-0 opacity-80">
          {!shouldReduce && shaderReady ? <HeroShader /> : null}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_38%,rgb(var(--color-gold)/0.16),transparent_30%),linear-gradient(90deg,rgb(var(--color-page)/0.94),rgb(var(--color-page)/0.34)_52%,rgb(var(--color-page)/0.9)),linear-gradient(180deg,rgb(var(--color-page)/0.45),rgb(var(--color-page)/0.98))]" />
        <motion.div
          aria-hidden="true"
          className="absolute -right-[22vmin] bottom-[-24vmin] w-[88vmin] text-ink/[0.035] md:w-[104vmin]"
          style={{ rotate: shouldReduce ? 0 : markRotate }}
        >
          <EchoMark decorative className="h-full w-full" strokeScale={0.72} />
        </motion.div>
        <div className="absolute right-gutter top-20 z-10 hidden mono-meta text-muted sm:block md:top-24">
          {time} / EET
        </div>
        <h1 className="display-massive relative z-10 w-full max-w-[12ch] text-ink drop-shadow-[0_22px_60px_rgb(0_0_0/0.62)]">
          <AnimatePresence mode="wait">
            <MaskedPhrase phrase={phrase} />
          </AnimatePresence>
        </h1>
        <motion.div
          className="absolute right-gutter top-1/2 z-10 hidden w-[min(25vw,22rem)] -translate-y-1/2 border-y border-line/10 py-6 lg:block"
          initial={{ opacity: 0, x: shouldReduce ? 0 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: easings.enter, delay: 1.24 }}
        >
          <div className="mb-7 flex items-center justify-between mono-meta text-gold">
            <span>DIRECTED SYSTEM</span>
            <span>0847F</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 mono-meta text-muted">
            <span>VFX</span>
            <span>FEATURE</span>
            <span>SACRED REALISM</span>
            <span>AI PIPELINE</span>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-gutter z-10 grid max-w-xl gap-4 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.08em] text-muted md:grid-cols-[1fr_1fr]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: easings.enter, delay: 1.1 }}
        >
          <span>AI-native cinema, authored frame by frame.</span>
          <span className="hidden border-l border-line/10 pl-5 md:block">
            2.39:1 / Volumetric negative space / silent loop
          </span>
        </motion.div>
      </div>
    </section>
  );
}
