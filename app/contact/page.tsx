"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { easings } from "@/lib/animations/easing";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { ViewTransitionLink } from "@/components/ui/ViewTransitionLink";

export default function ContactPage() {
  return (
    <main className="grid min-h-screen bg-page px-gutter py-10">
      <div className="flex items-start justify-between">
        <ViewTransitionLink href="/" className="mono-meta text-gold" data-cursor="back">
          ECHO / HOME
        </ViewTransitionLink>
        <div className="mono-meta text-muted">CAIRO / CONVERSATION</div>
      </div>
      <motion.section
        className="self-center"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, ease: easings.enter }}
      >
        <div className="mono-meta mb-8 text-gold">CONTACT</div>
        <h1 className="display-section max-w-[10ch] text-ink">Begin a conversation.</h1>
        <a
          href="mailto:hello@echo.studio"
          data-cursor="mail"
          className="mt-12 inline-flex items-center gap-5 border-b border-line/15 pb-4 font-display text-4xl leading-none text-ink md:text-6xl"
        >
          <Mail className="h-6 w-6 text-gold" aria-hidden="true" />
          hello@echo.studio
          <AnimatedArrow active />
        </a>
      </motion.section>
      <div className="self-end mono-meta text-muted">NO FORM / DIRECT SIGNAL</div>
    </main>
  );
}
