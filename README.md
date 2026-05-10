# ECHO Website

Flagship homepage for ECHO, an AI-native film studio. Built with Next.js App Router, TypeScript, Tailwind token classes, Framer Motion, Lenis, GSAP ScrollTrigger, and React Three Fiber.

## Easing System

All named curves live in `lib/animations/easing.ts` and are mirrored as CSS variables in `styles/global.css`.

- `enter` (`cubic-bezier(0.16, 1, 0.3, 1)`): section reveals, title cards, modal arrival, and collaborator isolation. It gives a long editorial settle without bounce.
- `exit` (`cubic-bezier(0.7, 0, 0.84, 0)`): preloader and modal departures. It behaves like a committed cut.
- `dolly` (`cubic-bezier(0.22, 1, 0.36, 1)`): camera-like motion on reel plates and scroll-adjacent moves.
- `hover` (`cubic-bezier(0.25, 1, 0.5, 1)`): cursor, arrow drawing, and micro-interactions.

Durations are intentionally longer than default UI snaps: hovers run around `320ms`, scene reveals around `780-920ms`, and page-scale moments around `1200ms`.

## Swapping Real Assets

Placeholder plates are defined in `lib/data/projects.ts`. The current build is seeded with curated optimized clips from `C:\Users\Pc\Desktop\Stuff\SEEDANCEGENERATIONS`. Each reel item uses WebM, MP4, and a WebP poster for fast visual loading. Replace each project's `video` field with final files placed under `public/assets/work`.

```ts
video: {
  webm: "/assets/work/battle-of-badr.webm",
  mp4: "/assets/work/battle-of-badr.mp4",
  poster: "/assets/work/battle-of-badr-poster.webp"
}
```

Recommended asset slots:

- `public/assets/work/*.webm` and `*.mp4`: silent hover loops for work cards.
- `public/assets/work/*-poster.webp`: poster frames for videos.
- `public/assets/collaborators/*.webp`: archival portrait plates for collaborator hover states.
- `public/assets/production/badr-loop.webm`: atmospheric loop for the Battle of Badr poster block.

Keep videos muted, short, and loopable. Export WebM plus MP4 fallbacks, with poster frames sized to the displayed ratio.

## Performance Notes

- The hero WebGL scene is dynamically imported with `ssr: false` and mounted after first paint, so Three.js does not block the initial server render.
- Lenis is disabled when `prefers-reduced-motion` is active.
- GSAP ScrollTrigger only owns the horizontal reel and capability activation; the rest stays declarative in Framer Motion.
- Videos are lazy-played via `IntersectionObserver`: posters appear immediately, visible clips autoplay muted, and offscreen clips pause.
- The visual system uses solid editorial fallbacks rather than remote stock imagery, which keeps LCP predictable until real optimized assets are added.
