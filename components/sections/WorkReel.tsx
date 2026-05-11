"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/lib/data/projects";
import { easings } from "@/lib/animations/easing";
import { EchoMark } from "@/components/ui/EchoIdentity";
import { useMagneticHover } from "@/lib/hooks/useMagneticHover";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { ViewTransitionLink } from "@/components/ui/ViewTransitionLink";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const magnetic = useMagneticHover<HTMLAnchorElement>(6);

  return (
    <motion.article
      className="group/card relative h-[78vh] min-w-[86vw] overflow-hidden border-r border-line/10 bg-page md:h-screen md:min-w-[72vw] lg:min-w-[58vw]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easings.enter, delay: index * 0.04 }}
    >
      <motion.div className="h-full w-full" style={{ x: magnetic.x, y: magnetic.y }}>
        <ViewTransitionLink
          ref={magnetic.ref}
          href={`/work/${project.slug}`}
          data-cursor="view"
          aria-label={`Open case study for ${project.title}`}
          className="group block h-full w-full focus-visible:outline-offset-[-8px]"
          onPointerMove={magnetic.onPointerMove}
          onPointerLeave={() => {
            magnetic.onPointerLeave();
            setHovered(false);
          }}
          onPointerEnter={() => setHovered(true)}
        >
          <div className="absolute left-6 top-6 z-10 flex items-center gap-3 mono-meta text-gold md:left-12 md:top-10">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-10 bg-gold/50" />
            <span>SELECTED FRAME</span>
          </div>
          <div aria-hidden="true" className="absolute inset-y-0 left-0 z-10 w-7 border-r border-line/10 bg-page/18 backdrop-blur-[1px]">
            <div className="h-full bg-[repeating-linear-gradient(180deg,transparent_0,transparent_20px,rgb(var(--color-ink)/0.28)_20px,rgb(var(--color-ink)/0.28)_25px,transparent_25px,transparent_42px)] opacity-40" />
          </div>
          <div aria-hidden="true" className="absolute inset-y-0 right-0 z-10 w-7 border-l border-line/10 bg-page/18 backdrop-blur-[1px]">
            <div className="h-full bg-[repeating-linear-gradient(180deg,transparent_0,transparent_20px,rgb(var(--color-ink)/0.28)_20px,rgb(var(--color-ink)/0.28)_25px,transparent_25px,transparent_42px)] opacity-40" />
          </div>
          <motion.div
            className="asset-plate absolute inset-0"
            style={{ background: project.plate }}
            animate={{ scale: hovered ? 1.018 : 1 }}
            transition={{ duration: 0.6, ease: easings.dolly }}
          >
            <LazyVideo
              active
              webm={project.video?.webm}
              mp4={project.video?.mp4}
              poster={project.video?.poster}
              label={`${project.title} moving plate`}
              className={`h-full w-full object-cover transition-opacity duration-700 ease-enter ${
                hovered ? "opacity-100" : "opacity-68"
              }`}
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--color-page)/0.74),transparent_58%,rgb(var(--color-page)/0.25))]" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gold/70"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? "78vh" : 0 }}
            transition={{ duration: 0.92, ease: easings.dolly }}
          />
          <motion.div
            className="absolute bottom-8 left-6 right-6 flex flex-col gap-5 md:bottom-12 md:left-12 md:right-12"
            initial="rest"
            animate={hovered ? "hover" : "rest"}
          >
            <motion.h2
              className="max-w-[8ch] font-display text-6xl leading-[0.92] text-ink md:text-8xl"
              variants={{
                rest: { y: 18, opacity: 0.76 },
                hover: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.62, ease: easings.enter }}
            >
              {project.title}
            </motion.h2>
            <motion.div
              className="grid max-w-lg grid-cols-2 gap-x-8 gap-y-2 mono-meta text-muted md:grid-cols-4"
              variants={{
                rest: {},
                hover: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.12 }
                }
              }}
            >
              {[project.category, project.year, project.runtime, project.ratio].map((item) => (
                <motion.span
                  key={item}
                  variants={{
                    rest: { y: 12, opacity: 0.45 },
                    hover: { y: 0, opacity: 1 }
                  }}
                  transition={{ duration: 0.46, ease: easings.enter }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
            <motion.p
              className="max-w-md text-sm leading-6 text-ink/70"
              variants={{
                rest: { y: 10, opacity: 0 },
                hover: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.52, ease: easings.enter, delay: 0.06 }}
            >
              {project.description}
            </motion.p>
          </motion.div>
        </ViewTransitionLink>
      </motion.div>
    </motion.article>
  );
}

export function WorkReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  useLayoutEffect(() => {
    if (shouldReduce || !sectionRef.current || !trackRef.current) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }, section);

    return () => ctx.revert();
  }, [shouldReduce]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
      next?.scrollIntoView({ block: "start" });
    }

    if (event.key === "ArrowRight") {
      window.scrollBy({ top: window.innerHeight * 0.45, behavior: "smooth" });
    }

    if (event.key === "ArrowLeft") {
      window.scrollBy({ top: -window.innerHeight * 0.45, behavior: "smooth" });
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative overflow-hidden border-y border-line/10 bg-page focus-visible:outline-offset-[-8px]"
      aria-label="Selected work reel"
    >
      <div className="flex h-auto flex-col md:h-screen md:flex-row" ref={trackRef}>
        <div className="relative flex min-w-[72vw] flex-col justify-between overflow-hidden px-gutter py-14 md:h-screen md:py-12">
          <EchoMark
            decorative
            className="absolute -bottom-36 -left-28 h-[34rem] w-[34rem] text-gold/[0.045]"
            strokeScale={0.72}
          />
          <div className="mono-meta relative z-10 text-gold">WORK / REEL</div>
          <div className="space-y-7">
            <p className="relative z-10 max-w-lg font-display text-5xl leading-[0.96] text-ink md:text-7xl">
              Selection, not gallery.
            </p>
            <div className="relative z-10 grid max-w-xl grid-cols-3 border-y border-line/10 py-4 mono-meta text-muted">
              <span>05 SCENES</span>
              <span>SILENT LOOP</span>
              <span>AI NATIVE</span>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted">
            VFX, features, shorts, music videos, and commercial worlds built with
            cinema as the operating system.
          </p>
        </div>
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
