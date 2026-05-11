import type { SVGProps } from "react";

const PHI = (1 + Math.sqrt(5)) / 2;

const G = {
  cx: 200,
  cy: 200,
  rApert: 30,
  rPivot: 118,
  rBarrel: 132,
  rEcho1: 152,
  rEcho2: 168,
  rEcho3: 178,
  rPerf: 192,
  perfW: 18,
  perfH: 7,
  rDot: 2.4,
  axisExt: 24,
  blades: 8
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function buildIris() {
  const blades: string[] = [];
  const verts: Array<{ x: number; y: number }> = [];
  const k1 = G.rPivot * 0.5;
  const k2 = G.rApert * 1.3;

  for (let i = 0; i < G.blades; i += 1) {
    const aP = (2 * Math.PI * i) / G.blades - Math.PI / 2;
    const aV = aP + Math.PI / G.blades;
    const px = G.cx + G.rPivot * Math.cos(aP);
    const py = G.cy + G.rPivot * Math.sin(aP);
    const vx = G.cx + G.rApert * Math.cos(aV);
    const vy = G.cy + G.rApert * Math.sin(aV);
    const tPx = -Math.sin(aP);
    const tPy = Math.cos(aP);
    const tVx = -Math.sin(aV);
    const tVy = Math.cos(aV);

    blades.push(
      `M${px.toFixed(2)},${py.toFixed(2)} C${(px + tPx * k1).toFixed(2)},${(py + tPy * k1).toFixed(2)} ${(vx - tVx * k2).toFixed(2)},${(vy - tVy * k2).toFixed(2)} ${vx.toFixed(2)},${vy.toFixed(2)}`
    );
    verts.push({ x: vx, y: vy });
  }

  return { blades, verts };
}

const aperture = buildIris();
const aperturePoints = aperture.verts.map((v) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(" ");

function buildFibSpiral(start = 1.8) {
  const r = [start, start * PHI, start * PHI * PHI, start * PHI * PHI * PHI];
  let px = G.cx + r[0];
  let py = G.cy;
  const dirs = [
    { dx: 0, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: 0 }
  ];
  let path = `M${px.toFixed(2)},${py.toFixed(2)} `;

  for (let i = 0; i < 4; i += 1) {
    const ex = px + dirs[i].dx * r[i];
    const ey = py + dirs[i].dy * r[i];
    path += `A${r[i].toFixed(2)},${r[i].toFixed(2)} 0 0 0 ${ex.toFixed(2)},${ey.toFixed(2)} `;
    px = ex;
    py = ey;
  }

  return path;
}

const fibPath = buildFibSpiral();

type EchoMarkProps = SVGProps<SVGSVGElement> & {
  decorative?: boolean;
  echoes?: boolean;
  perfs?: boolean;
  axis?: boolean;
  spiral?: boolean;
  strokeScale?: number;
  title?: string;
};

export function EchoMark({
  className,
  decorative = false,
  echoes = true,
  perfs = true,
  axis = true,
  spiral = true,
  strokeScale = 1,
  title = "ECHO aperture mark",
  ...props
}: EchoMarkProps) {
  const a11y = decorative
    ? { "aria-hidden": true }
    : { role: "img", "aria-label": title };
  const stroke = strokeScale;
  const { cx, cy } = G;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      focusable="false"
      {...a11y}
      {...props}
    >
      {echoes ? (
        <g stroke="currentColor">
          <circle cx={cx} cy={cy} r={G.rEcho1} strokeWidth={stroke * 0.85} opacity={0.95} />
          <circle cx={cx} cy={cy} r={G.rEcho2} strokeWidth={stroke * 0.7} opacity={0.55} />
          <circle cx={cx} cy={cy} r={G.rEcho3} strokeWidth={stroke * 0.55} opacity={0.3} />
        </g>
      ) : null}
      {axis ? (
        <g stroke="currentColor" strokeWidth={stroke * 0.8} strokeLinecap="round">
          <line x1={cx - G.rEcho3 - G.axisExt} y1={cy} x2={cx - G.rBarrel - 5} y2={cy} />
          <line x1={cx + G.rBarrel + 5} y1={cy} x2={cx + G.rEcho3 + G.axisExt} y2={cy} />
        </g>
      ) : null}
      <circle cx={cx} cy={cy} r={G.rBarrel} stroke="currentColor" strokeWidth={stroke} />
      <g stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        {aperture.blades.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <polygon points={aperturePoints} stroke="currentColor" strokeWidth={stroke * 0.9} />
      {spiral ? (
        <path d={fibPath} stroke="currentColor" strokeWidth={stroke * 0.5} opacity={0.45} />
      ) : null}
      <circle cx={cx} cy={cy} r={G.rDot} fill="currentColor" />
      {perfs ? (
        <g fill="currentColor">
          {[
            [cx - G.perfW / 2, cy - G.rPerf - G.perfH / 2],
            [cx - G.perfW / 2, cy + G.rPerf - G.perfH / 2],
            [cx - G.rPerf - G.perfW / 2, cy - G.perfH / 2],
            [cx + G.rPerf - G.perfW / 2, cy - G.perfH / 2]
          ].map(([x, y], index) => (
            <rect key={`${x}-${y}-${index}`} x={x} y={y} width={G.perfW} height={G.perfH} rx={0.8} />
          ))}
        </g>
      ) : null}
    </svg>
  );
}

function GlyphE({ x, h, sw }: { x: number; h: number; sw: number }) {
  const w = h / PHI;
  return (
    <g transform={`translate(${x},0)`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square">
      <line x1={0} y1={0} x2={0} y2={h} />
      <line x1={0} y1={0} x2={w} y2={0} />
      <line x1={0} y1={h / 2} x2={w * 0.78} y2={h / 2} />
      <line x1={0} y1={h} x2={w} y2={h} />
    </g>
  );
}

function GlyphC({ x, h, sw }: { x: number; h: number; sw: number }) {
  const r = h / 2;
  const opening = Math.PI / 6;
  const x1 = r + r * Math.cos(-opening);
  const y1 = r + r * Math.sin(-opening);
  const x2 = r + r * Math.cos(opening);
  const y2 = r + r * Math.sin(opening);

  return (
    <g transform={`translate(${x},0)`} stroke="currentColor" strokeWidth={sw} strokeLinecap="round">
      <path d={`M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 1 0 ${x2.toFixed(2)},${y2.toFixed(2)}`} />
    </g>
  );
}

function GlyphH({ x, h, sw }: { x: number; h: number; sw: number }) {
  const w = h / PHI;
  return (
    <g transform={`translate(${x},0)`} stroke="currentColor" strokeWidth={sw} strokeLinecap="square">
      <line x1={0} y1={0} x2={0} y2={h} />
      <line x1={w} y1={0} x2={w} y2={h} />
      <line x1={0} y1={h / 2} x2={w} y2={h / 2} />
    </g>
  );
}

function GlyphO({ x, h, sw }: { x: number; h: number; sw: number }) {
  const r = h / 2;
  return (
    <g transform={`translate(${x},0)`} stroke="currentColor" strokeWidth={sw}>
      <circle cx={r} cy={r} r={r} />
    </g>
  );
}

type EchoWordmarkProps = SVGProps<SVGSVGElement> & {
  decorative?: boolean;
  title?: string;
  tracking?: number;
};

export function EchoWordmark({
  className,
  decorative = false,
  title = "ECHO",
  tracking = 0.55,
  ...props
}: EchoWordmarkProps) {
  const h = 100;
  const wE = h / PHI;
  const wC = h;
  const wH = h / PHI;
  const wO = h;
  const t = h * tracking;
  const totalW = wE + t + wC + t + wH + t + wO;
  const stroke = 1.8;
  let cursor = 0;
  const eX = cursor;
  cursor += wE + t;
  const cX = cursor;
  cursor += wC + t;
  const hX = cursor;
  cursor += wH + t;
  const oX = cursor;
  const a11y = decorative
    ? { "aria-hidden": true }
    : { role: "img", "aria-label": title };

  return (
    <svg
      viewBox={`0 0 ${totalW} ${h}`}
      width={totalW}
      height={h}
      className={className}
      fill="none"
      focusable="false"
      {...a11y}
      {...props}
    >
      <GlyphE x={eX} h={h} sw={stroke} />
      <GlyphC x={cX} h={h} sw={stroke} />
      <GlyphH x={hX} h={h} sw={stroke} />
      <GlyphO x={oX} h={h} sw={stroke} />
    </svg>
  );
}

type EchoLockupProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  meta?: string;
  label?: string;
  compact?: boolean;
};

export function EchoLockup({
  className,
  markClassName,
  wordmarkClassName,
  meta,
  label = "ECHO",
  compact = false
}: EchoLockupProps) {
  return (
    <span className={joinClasses("inline-flex items-center gap-3 text-ink", className)}>
      <span className="sr-only">{label}</span>
      <EchoMark
        decorative
        echoes={!compact}
        perfs={!compact}
        axis={false}
        spiral={!compact}
        strokeScale={compact ? 1.25 : 1}
        className={joinClasses(
          compact ? "h-8 w-8 text-gold" : "h-10 w-10 text-gold/90",
          markClassName
        )}
      />
      <span className="grid gap-1">
        <EchoWordmark
          decorative
          tracking={compact ? 0.72 : 0.62}
          className={joinClasses(
            compact ? "h-3.5 w-auto text-ink" : "h-4 w-auto text-ink",
            wordmarkClassName
          )}
        />
        {meta ? <span className="mono-meta text-muted">{meta}</span> : null}
      </span>
    </span>
  );
}
