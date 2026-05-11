"use client";

import { useState } from "react";
import { AtSign, Mail, Send } from "lucide-react";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { EchoLockup, EchoMark } from "@/components/ui/EchoIdentity";
import { ViewTransitionLink } from "@/components/ui/ViewTransitionLink";

export function ContactCTA() {
  const [hovered, setHovered] = useState(false);
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-page px-gutter py-20 md:py-28"
      aria-label="Contact ECHO"
    >
      <EchoMark
        decorative
        className="absolute -right-28 top-8 h-[28rem] w-[28rem] text-gold/[0.055]"
        strokeScale={0.72}
      />
      <ViewTransitionLink
        href="/contact"
        data-cursor="talk"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group relative z-10 grid min-h-[48vh] gap-8 border-y border-line/10 py-12 md:grid-cols-[1fr_auto] md:items-center"
      >
        <span>
          <span className="mb-6 block mono-meta text-gold">FINAL FRAME / OPEN SIGNAL</span>
          <span className="block font-display text-5xl leading-none text-ink md:text-8xl">
            Begin a conversation.
          </span>
        </span>
        <AnimatedArrow active={hovered} />
      </ViewTransitionLink>
      <footer className="mt-12 flex flex-col gap-8 mono-meta text-muted md:flex-row md:items-center md:justify-between">
        <EchoLockup
          compact
          meta={`${year} / CAIRO`}
          className="text-ink"
          markClassName="h-7 w-7 text-gold/80"
          wordmarkClassName="h-3 text-muted"
        />
        <div className="flex items-center gap-5">
          <a
            href="mailto:hello@echo.studio"
            aria-label="Email ECHO"
            data-cursor="mail"
            className="text-muted transition-colors duration-300 ease-enter hover:text-gold"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/"
            aria-label="ECHO social channel"
            data-cursor="open"
            className="text-muted transition-colors duration-300 ease-enter hover:text-gold"
          >
            <AtSign className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/"
            aria-label="ECHO network channel"
            data-cursor="open"
            className="text-muted transition-colors duration-300 ease-enter hover:text-gold"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </section>
  );
}
