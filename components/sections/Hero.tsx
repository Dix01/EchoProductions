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
import { EchoLockup, EchoMark } from "@/components/ui/EchoIdentity";

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
      ref={sectionRef}
      className="relative min-h-[185vh] overflow-clip bg-page"
      aria-label="ECHO studio introduction"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-gutter">
        <div className="absolute inset-0 opacity-80">
          {!shouldReduce && shaderReady ? <HeroShader /> : null}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--color-page)/0.35),rgb(var(--color-page)/0.95))]" />
        <div
          aria-hidden="true"
          className="absolute -right-[22vmin] bottom-[-24vmin] w-[88vmin] text-ink/[0.035] md:w-[104vmin]"
        >
          <EchoMark decorative className="h-full w-full" strokeScale={0.72} />
        </div>
        <div className="absolute left-gutter top-5 z-10">
          <EchoLockup compact meta="EST. 2024 / CAIRO" />
        </div>
        <div className="absolute right-gutter top-6 z-10 mono-meta text-muted">
          {time} / EET
        </div>
        <h1 className="display-massive relative z-10 w-full max-w-[13ch] text-ink">
          <AnimatePresence mode="wait">
            <MaskedPhrase phrase={phrase} />
          </AnimatePresence>
        </h1>
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
