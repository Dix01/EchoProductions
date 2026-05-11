/* global React */
// ECHO — cinematic identity mark.
//
// • 8 curved iris blades (cubic bezier leading edges, pinwheel rotation)
// • octagonal aperture pupil at φ-derived radius
// • hidden logarithmic / Fibonacci spiral inside the aperture
// • φ-cascaded echo rings outside the lens barrel
// • 35mm perforations at cardinal positions
// • cinematic horizontal axis broken by the lens
//
// Custom geometric ECHO glyphs constructed on the same φ grid as the mark.

const PHI = (1 + Math.sqrt(5)) / 2;

const G = {
  cx: 200, cy: 200,
  rApert: 30,    // octagonal pupil circumradius
  rPivot: 118,   // where iris blades anchor
  rBarrel: 132,  // outer lens edge
  rEcho1: 152,
  rEcho2: 168,
  rEcho3: 178,
  rPerf: 192,
  perfW: 18,
  perfH: 7,
  rDot: 2.4,
  axisExt: 24,
  blades: 8,
};

// ─── iris blades (curved leading edges, pinwheel) ────────────────────────────
function buildIris() {
  const N = G.blades;
  const blades = [];
  const verts = [];
  const k1 = G.rPivot * 0.50;   // pivot tangent strength
  const k2 = G.rApert * 1.30;   // vertex tangent strength
  for (let i = 0; i < N; i++) {
    const aP = (2 * Math.PI * i) / N - Math.PI / 2;
    const aV = aP + Math.PI / N;
    const px = G.cx + G.rPivot * Math.cos(aP);
    const py = G.cy + G.rPivot * Math.sin(aP);
    const vx = G.cx + G.rApert * Math.cos(aV);
    const vy = G.cy + G.rApert * Math.sin(aV);
    // tangent at pivot — counter-clockwise tangent to the pivot circle
    const tPx = -Math.sin(aP), tPy = Math.cos(aP);
    // tangent at vertex — counter-clockwise tangent to the aperture circle
    const tVx = -Math.sin(aV), tVy = Math.cos(aV);
    const c1x = px + tPx * k1;
    const c1y = py + tPy * k1;
    const c2x = vx - tVx * k2;
    const c2y = vy - tVy * k2;
    blades.push(`M${px.toFixed(2)},${py.toFixed(2)} C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${vx.toFixed(2)},${vy.toFixed(2)}`);
    verts.push({ x: vx, y: vy });
  }
  return { blades, verts };
}
const APERTURE = buildIris();
const APVERT_STR = APERTURE.verts.map(v => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(" ");

// ─── Fibonacci spiral, very subtle, inside the aperture ─────────────────────
// 4 quarter-circle arcs of radii r, r·φ, r·φ², r·φ³ around shifting centers.
function buildFibSpiral(start = 1.6) {
  // start radius in viewBox units; spiral grows with φ
  const r = [start, start * PHI, start * PHI * PHI, start * PHI * PHI * PHI];
  // center the bounding box of the spiral at (G.cx, G.cy)
  let cx = 0, cy = 0;
  let path = `M${(G.cx + r[0]).toFixed(2)},${G.cy.toFixed(2)} `;
  // sequence of quarter arcs, rotating 90° each, around shifting square centers.
  // Implement classic golden spiral approximation with 4 arcs.
  // Arc i ends at the current position rotated by 90° around its quadrant center.
  let px = G.cx + r[0], py = G.cy;
  let dirs = [
    { dx:  0, dy: -1 }, // up
    { dx: -1, dy:  0 }, // left
    { dx:  0, dy:  1 }, // down
    { dx:  1, dy:  0 }, // right
  ];
  for (let i = 0; i < 4; i++) {
    const radius = r[i];
    const d = dirs[i];
    const ex = px + d.dx * radius - (i === 0 ? 0 : 0); // simplified
    const ey = py + d.dy * radius;
    // SVG arc: A rx ry x-rot large-arc sweep ex ey
    path += `A${radius.toFixed(2)},${radius.toFixed(2)} 0 0 0 ${ex.toFixed(2)},${ey.toFixed(2)} `;
    px = ex; py = ey;
  }
  return path;
}
const FIB_PATH = buildFibSpiral(1.8);

// ────────────────────────────────────────────────────────────────────────────
function EchoMark({
  size = 280,
  fg = "#0B0B0C",
  bg = "transparent",
  stroke = 1.05,
  echoes = true,
  perfs = true,
  axis = true,
  spiral = true,
  paint,
  fillPaint,
  className,
}) {
  const sc = paint ? `url(#${paint})` : fg;
  const fc = fillPaint ? `url(#${fillPaint})` : fg;
  const { cx, cy } = G;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 400 400"
      style={{ display: "block", background: bg }}
      aria-label="Echo"
    >
      {/* echo rings */}
      {echoes && (
        <g stroke={sc} fill="none">
          <circle cx={cx} cy={cy} r={G.rEcho1} strokeWidth={stroke * 0.85} opacity={0.95} />
          <circle cx={cx} cy={cy} r={G.rEcho2} strokeWidth={stroke * 0.7} opacity={0.55} />
          <circle cx={cx} cy={cy} r={G.rEcho3} strokeWidth={stroke * 0.55} opacity={0.3} />
        </g>
      )}

      {/* horizontal cinematic axis — broken by lens barrel */}
      {axis && (
        <g stroke={sc} strokeWidth={stroke * 0.8} strokeLinecap="round">
          <line x1={cx - G.rEcho3 - G.axisExt} y1={cy} x2={cx - G.rBarrel - 5} y2={cy} />
          <line x1={cx + G.rBarrel + 5} y1={cy} x2={cx + G.rEcho3 + G.axisExt} y2={cy} />
        </g>
      )}

      {/* lens barrel */}
      <circle cx={cx} cy={cy} r={G.rBarrel} fill="none" stroke={sc} strokeWidth={stroke} />

      {/* iris blades — curved pinwheel */}
      <g stroke={sc} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {APERTURE.blades.map((d, i) => <path key={i} d={d} />)}
      </g>

      {/* octagonal aperture pupil */}
      <polygon points={APVERT_STR} fill="none" stroke={sc} strokeWidth={stroke * 0.9} />

      {/* hidden Fibonacci spiral inside the aperture (very subtle) */}
      {spiral && (
        <path d={FIB_PATH} fill="none" stroke={sc} strokeWidth={stroke * 0.5} opacity={0.45} />
      )}

      {/* central focal dot */}
      <circle cx={cx} cy={cy} r={G.rDot} fill={fc} />

      {/* film perforations */}
      {perfs && (
        <g fill={fc}>
          {[
            [cx - G.perfW / 2, cy - G.rPerf - G.perfH / 2],
            [cx - G.perfW / 2, cy + G.rPerf - G.perfH / 2],
            [cx - G.rPerf - G.perfW / 2, cy - G.perfH / 2],
            [cx + G.rPerf - G.perfW / 2, cy - G.perfH / 2],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={G.perfW} height={G.perfH} rx={0.8} />
          ))}
        </g>
      )}
    </svg>
  );
}

// ─── Silver foil <defs> ──────────────────────────────────────────────────────
function SilverDefs({ id = "silver" }) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#F3F3F5" />
        <stop offset="22%"  stopColor="#C8C8CC" />
        <stop offset="48%"  stopColor="#8E8E94" />
        <stop offset="62%"  stopColor="#DCDCE0" />
        <stop offset="84%"  stopColor="#76767C" />
        <stop offset="100%" stopColor="#B8B8BC" />
      </linearGradient>
      <linearGradient id={id + "-dot"} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EFEFF1" />
        <stop offset="100%" stopColor="#9A9AA0" />
      </linearGradient>
    </defs>
  );
}

// ─── Custom geometric ECHO glyphs ────────────────────────────────────────────
// Each letter constructed on a φ grid, drawn in SVG. Cap height H=100.
// Strokes are vector outlines — letters scale crisply.
//
// Glyph widths:  E=62 · C=88 (50 radius + offset) · H=62 · O=100
function GlyphE({ x = 0, y = 0, h = 100, sw = 1.4, color = "currentColor" }) {
  const w = h / PHI; // ≈ 61.8
  return (
    <g transform={`translate(${x},${y})`} stroke={color} strokeWidth={sw} fill="none" strokeLinecap="square">
      <line x1={0} y1={0} x2={0} y2={h} />
      <line x1={0} y1={0} x2={w} y2={0} />
      <line x1={0} y1={h / 2} x2={w * 0.78} y2={h / 2} />
      <line x1={0} y1={h} x2={w} y2={h} />
    </g>
  );
}

function GlyphC({ x = 0, y = 0, h = 100, sw = 1.4, color = "currentColor" }) {
  const r = h / 2;
  // Aperture-style C: 3/4 circle, opening to the right at ±30°
  const opening = Math.PI / 6; // 30° each side of east
  const x1 = r + r * Math.cos(-opening), y1 = r + r * Math.sin(-opening);
  const x2 = r + r * Math.cos( opening), y2 = r + r * Math.sin( opening);
  return (
    <g transform={`translate(${x},${y})`} stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round">
      <path d={`M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 1 0 ${x2.toFixed(2)},${y2.toFixed(2)}`} />
    </g>
  );
}

function GlyphH({ x = 0, y = 0, h = 100, sw = 1.4, color = "currentColor" }) {
  const w = h / PHI;
  return (
    <g transform={`translate(${x},${y})`} stroke={color} strokeWidth={sw} fill="none" strokeLinecap="square">
      <line x1={0} y1={0} x2={0} y2={h} />
      <line x1={w} y1={0} x2={w} y2={h} />
      <line x1={0} y1={h / 2} x2={w} y2={h / 2} />
    </g>
  );
}

function GlyphO({ x = 0, y = 0, h = 100, sw = 1.4, color = "currentColor" }) {
  const r = h / 2;
  return (
    <g transform={`translate(${x},${y})`} stroke={color} strokeWidth={sw} fill="none">
      <circle cx={r} cy={r} r={r} />
    </g>
  );
}

// Geometric wordmark (SVG, custom letterforms)
function GeoWordmark({ size = 64, color = "#0B0B0C", sw, tracking = 0.55 }) {
  const h = size;
  const wE = h / PHI;
  const wC = h;
  const wH = h / PHI;
  const wO = h;
  const t = h * tracking;
  const totalW = wE + t + wC + t + wH + t + wO;
  const stroke = sw ?? Math.max(0.9, h / 56);
  let cursor = 0;
  const eX = cursor; cursor += wE + t;
  const cX = cursor; cursor += wC + t;
  const hX = cursor; cursor += wH + t;
  const oX = cursor;
  return (
    <svg width={totalW} height={h} viewBox={`0 0 ${totalW} ${h}`} style={{ display: "block", overflow: "visible" }}>
      <GlyphE x={eX} h={h} sw={stroke} color={color} />
      <GlyphC x={cX} h={h} sw={stroke} color={color} />
      <GlyphH x={hX} h={h} sw={stroke} color={color} />
      <GlyphO x={oX} h={h} sw={stroke} color={color} />
    </svg>
  );
}

// Plain typography wordmark (used in some lockups for contrast)
function TypeWordmark({ color = "#0B0B0C", size = 60, tracking = "0.62em", weight = 200 }) {
  return (
    <span
      style={{
        fontFamily: "'Archivo', 'Manrope', system-ui, sans-serif",
        fontWeight: weight,
        fontSize: size,
        letterSpacing: tracking,
        paddingLeft: tracking,
        color,
        lineHeight: 1,
        whiteSpace: "nowrap",
        display: "inline-block",
      }}
    >
      ECHO
    </span>
  );
}

function Caption({ children, color = "rgba(11,11,12,0.5)", size = 10, tracking = "0.22em" }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: size,
        letterSpacing: tracking,
        textTransform: "uppercase",
        color,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

function Editorial({ children, color = "#0B0B0C", size = 24, italic = true, weight = 300 }) {
  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
        fontStyle: italic ? "italic" : "normal",
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.18,
        color,
        letterSpacing: "0.005em",
      }}
    >
      {children}
    </div>
  );
}

Object.assign(window, {
  EchoMark, SilverDefs, GeoWordmark, TypeWordmark, Caption, Editorial,
  GlyphE, GlyphC, GlyphH, GlyphO,
  PHI, G, APERTURE, APVERT_STR, FIB_PATH,
});
