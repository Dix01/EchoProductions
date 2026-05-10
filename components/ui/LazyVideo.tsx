"use client";

import { useEffect, useRef } from "react";

type LazyVideoProps = {
  webm?: string;
  mp4?: string;
  poster?: string;
  active?: boolean;
  className?: string;
  label: string;
};

export function LazyVideo({
  webm,
  mp4,
  poster,
  active = true,
  className,
  label
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || (!webm && !mp4)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active) {
          video.preload = "auto";
          void video.play().catch(() => undefined);
          return;
        }

        if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { rootMargin: "360px 0px", threshold: 0.08 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [active, mp4, webm]);

  useEffect(() => {
    const video = ref.current;
    if (!video || (!webm && !mp4)) {
      return;
    }

    if (active) {
      video.preload = "auto";
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [active, mp4, webm]);

  if (!webm && !mp4) {
    return null;
  }

  return (
    <video
      ref={ref}
      className={className}
      aria-label={label}
      muted
      playsInline
      loop
      preload="metadata"
      poster={poster}
    >
      {webm && <source src={webm} type="video/webm" />}
      {mp4 && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
