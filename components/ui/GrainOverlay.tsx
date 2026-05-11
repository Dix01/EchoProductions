export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.07]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.34) 0 1px, transparent 1px), radial-gradient(circle at 75% 65%, rgba(255,255,255,0.18) 0 1px, transparent 1px)",
        backgroundSize: "3px 3px, 5px 5px"
      }}
    />
  );
}
