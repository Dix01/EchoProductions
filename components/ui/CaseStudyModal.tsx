"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { easings } from "@/lib/animations/easing";
import type { Project } from "@/lib/data/projects";
import { EchoLockup } from "./EchoIdentity";
import { LazyVideo } from "./LazyVideo";

export function CaseStudyModal({ project }: { project: Project }) {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[60] overflow-y-auto bg-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.78, ease: easings.enter }}
    >
      <button
        type="button"
        aria-label="Close case study"
        data-cursor="close"
        onClick={() => router.back()}
        className="fixed right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-line/15 bg-page/70 text-ink backdrop-blur"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <article className="min-h-screen px-gutter py-16 md:py-20">
        <div className="mb-12 flex items-start justify-between gap-8">
          <EchoLockup
            compact
            meta="CASE STUDY"
            markClassName="text-gold"
            wordmarkClassName="text-ink"
          />
          <div className="mono-meta text-muted">{project.year} / {project.ratio}</div>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h1 className="display-section max-w-[9ch] text-ink">{project.title}</h1>
          <div className="space-y-8">
            <p className="max-w-xl text-base leading-7 text-ink/80">{project.description}</p>
            <dl className="grid grid-cols-2 gap-5 mono-meta text-muted">
              <div>
                <dt className="text-gold">Category</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt className="text-gold">Runtime</dt>
                <dd>{project.runtime}</dd>
              </div>
              <div>
                <dt className="text-gold">Collaborator</dt>
                <dd>{project.collaborator}</dd>
              </div>
              <div>
                <dt className="text-gold">Frame</dt>
                <dd>{project.ratio}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="asset-plate mt-16 aspect-[16/9] w-full border border-line/10"
          style={{ background: project.plate }}
        >
          <LazyVideo
            webm={project.video?.webm}
            mp4={project.video?.mp4}
            poster={project.video?.poster}
            label={`${project.title} case study loop`}
            className="h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgb(var(--color-page)/0.38))]" />
        </div>
      </article>
    </motion.div>
  );
}
