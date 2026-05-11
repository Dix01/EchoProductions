/* global React, EchoMark, SilverDefs, GeoWordmark, TypeWordmark, Caption, Editorial,
   GlyphE, GlyphC, GlyphH, GlyphO, PHI, G, APERTURE, APVERT_STR, FIB_PATH */

const CREAM = "#F4F1EA";
const PAPER = "#E8E1D1";
const INK = "#08080A";
const RULE_LIGHT = "rgba(11,11,12,0.10)";
const GOLD = "#B89968";
const VIGNETTE_PAPER = "radial-gradient(140% 110% at 50% 35%, #F1ECDD 0%, #E8E1D1 55%, #D6CDB8 100%)";
const VIGNETTE_INK = "radial-gradient(140% 110% at 50% 30%, #15131F 0%, #0A0A0E 55%, #050507 100%)";

// inline mark paths (for embedding inside parent SVGs)
function MarkPaths({ stroke = INK, sw = 1.05, fill = INK, echoes = true, perfs = true, axis = true, spiral = true, lattice = true, recursive = true }) {
  const { cx, cy } = G;
  const N = 8;
  const rNode = G.rEcho1 - 6;
  const nodes = Array.from({ length: N }).map((_, i) => {
    const a = (2 * Math.PI * i) / N;
    return { x: cx + rNode * Math.cos(a), y: cy + rNode * Math.sin(a) };
  });
  return (
    <g>
      {echoes && (
        <g stroke={stroke} fill="none">
          <circle cx={cx} cy={cy} r={G.rEcho1} strokeWidth={sw * 0.85} />
          <circle cx={cx} cy={cy} r={G.rEcho2} strokeWidth={sw * 0.7} opacity={0.55} />
          <circle cx={cx} cy={cy} r={G.rEcho3} strokeWidth={sw * 0.55} opacity={0.3} />
        </g>
      )}
      {axis && (
        <g stroke={stroke} strokeWidth={sw * 0.8} strokeLinecap="round">
          <line x1={cx - G.rEcho3 - G.axisExt} y1={cy} x2={cx - G.rBarrel - 5} y2={cy} />
          <line x1={cx + G.rBarrel + 5} y1={cy} x2={cx + G.rEcho3 + G.axisExt} y2={cy} />
        </g>
      )}
      <circle cx={cx} cy={cy} r={G.rBarrel} fill="none" stroke={stroke} strokeWidth={sw} />
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">
        {APERTURE.blades.map((d, i) => <path key={i} d={d} />)}
      </g>
      <polygon points={APVERT_STR} fill="none" stroke={stroke} strokeWidth={sw * 0.9} />
      {spiral && <path d={FIB_PATH} fill="none" stroke={stroke} strokeWidth={sw * 0.5} opacity={0.45} />}
      {recursive && (
        <g transform={`translate(${cx} ${cy}) scale(0.115) translate(${-cx} ${-cy})`} opacity={0.78}>
          <circle cx={cx} cy={cy} r={G.rBarrel} fill="none" stroke={stroke} strokeWidth={sw / 0.115 * 0.85} />
          <g stroke={stroke} strokeWidth={sw / 0.115 * 0.85} fill="none" strokeLinecap="round">
            {APERTURE.blades.map((d, i) => <path key={i} d={d} />)}
          </g>
          <polygon points={APVERT_STR} fill={fill} stroke="none" />
        </g>
      )}
      {lattice && (
        <g>
          <g stroke={stroke} strokeWidth={sw * 0.35} fill="none" opacity={0.55}>
            {nodes.map((n, i) => {
              const m = nodes[(i + 1) % N];
              return <line key={i} x1={n.x} y1={n.y} x2={m.x} y2={m.y} />;
            })}
          </g>
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y}
              r={i % 3 === 0 ? 2.6 : 1.6}
              fill={i % 3 === 0 ? fill : "none"}
              stroke={stroke} strokeWidth={sw * 0.6} />
          ))}
        </g>
      )}
      {!recursive && <circle cx={cx} cy={cy} r={G.rDot} fill={fill} />}
      {perfs && (
        <g fill={fill}>
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
    </g>
  );
}

// ─── shared chrome ───────────────────────────────────────────────────────────
function CornerMarks({ color = "rgba(11,11,12,0.28)" }) {
  const len = 14, off = 24;
  const pos = [
    { t: off, l: off, h: [0, 0, len, 0], v: [0, 0, 0, len] },
    { t: off, r: off, h: [0, 0, -len, 0], v: [0, 0, 0, len] },
    { b: off, l: off, h: [0, 0, len, 0], v: [0, 0, 0, -len] },
    { b: off, r: off, h: [0, 0, -len, 0], v: [0, 0, 0, -len] },
  ];
  return (
    <>
      {pos.map((p, i) => (
        <svg key={i} width={len} height={len} style={{ position: "absolute", top: p.t, left: p.l, right: p.r, bottom: p.b, overflow: "visible" }}>
          <line x1={p.h[0]} y1={p.h[1]} x2={p.h[2]} y2={p.h[3]} stroke={color} strokeWidth="1" />
          <line x1={p.v[0]} y1={p.v[1]} x2={p.v[2]} y2={p.v[3]} stroke={color} strokeWidth="1" />
        </svg>
      ))}
    </>
  );
}

function Stamp({ label, color = "rgba(11,11,12,0.42)" }) {
  return (
    <div style={{ position: "absolute", bottom: 24, right: 28 }}>
      <Caption color={color}>{label}</Caption>
    </div>
  );
}

function PaperGrain() {
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(11,11,12,0.04) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(120% 90% at 50% 30%, transparent 40%, rgba(28,22,12,0.22) 100%)",
        pointerEvents: "none",
      }} />
    </>
  );
}

function FilmGrain({ opacity = 0.06 }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
      backgroundSize: "2px 2px",
      opacity, pointerEvents: "none",
    }} />
  );
}

// ─── 1. COVER / HERO ─────────────────────────────────────────────────────────
function ArtboardCover() {
  return (
    <div style={{ width: "100%", height: "100%", background: VIGNETTE_PAPER, position: "relative", overflow: "hidden" }}>
      <PaperGrain />
      <CornerMarks />

      {/* top meta bar */}
      <div style={{ position: "absolute", top: 48, left: 56, right: 56, display: "flex", justifyContent: "space-between" }}>
        <Caption>Echo · A.I. Creative Studio</Caption>
        <Caption color="rgba(11,11,12,0.32)">Identity System · Vol. I · MMXXVI</Caption>
      </div>

      {/* atmospheric halo behind the mark */}
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
        <div style={{ width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,153,104,0.18) 0%, rgba(184,153,104,0.06) 35%, transparent 65%)", filter: "blur(0.5px)" }} />
      </div>

      {/* hero mark */}
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <EchoMark size={500} fg={INK} stroke={0.95} />
      </div>

      {/* lower title */}
      <div style={{ position: "absolute", bottom: 88, left: 56, right: 56 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Caption color="rgba(11,11,12,0.42)">— THE BRAND</Caption>
            <GeoWordmark size={88} color={INK} />
          </div>
          <div style={{ maxWidth: 360, textAlign: "right" }}>
            <Editorial color={INK} size={22}>
              An echo is the memory of a signal —<br />
              the form a thought takes when it returns.
            </Editorial>
            <div style={{ height: 12 }} />
            <Caption color="rgba(11,11,12,0.42)">Filmmaking · Music · VFX · Editorial</Caption>
          </div>
        </div>
      </div>

      <Stamp label="00 / Cover" />
    </div>
  );
}

// ─── 2. MANIFESTO ────────────────────────────────────────────────────────────
function ArtboardManifesto() {
  return (
    <div style={{ width: "100%", height: "100%", background: VIGNETTE_INK, color: CREAM, position: "relative", overflow: "hidden", padding: "92px 96px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <FilmGrain />
      <div style={{ position: "absolute", top: -120, right: -120, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,153,104,0.14) 0%, transparent 60%)", pointerEvents: "none" }} />
      <CornerMarks color="rgba(244,241,234,0.22)" />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Caption color="rgba(244,241,234,0.42)">Manifesto · 01</Caption>
        <Caption color="rgba(244,241,234,0.42)">— ECHO —</Caption>
      </div>

      <div style={{ maxWidth: 880 }}>
        <Editorial color={CREAM} size={64} weight={300} italic={true}>
          Every frame is an<br />
          echo of intention —<br />
          structure becoming<br />
          <span style={{ color: GOLD }}>signal</span>, signal<br />
          becoming meaning.
        </Editorial>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
          <Caption color="rgba(244,241,234,0.42)">Principle 01 / 03</Caption>
          <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.6, color: "rgba(244,241,234,0.78)" }}>
            We treat a film, a track, a cut, a render, as one waveform — propagating, interfering, resonating. The mark is its visual fingerprint: aperture, axis, ring, and return.
          </div>
        </div>
        <EchoMark size={140} fg={CREAM} stroke={0.9} echoes={true} perfs={true} />
      </div>

      <Stamp label="01 / Manifesto" color="rgba(244,241,234,0.42)" />
    </div>
  );
}

// ─── 3. MARK SPEC ────────────────────────────────────────────────────────────
function ArtboardMarkSpec() {
  return (
    <div style={{ width: "100%", height: "100%", background: PAPER, position: "relative", overflow: "hidden" }}>
      <PaperGrain />
      <CornerMarks />

      <div style={{ position: "absolute", top: 48, left: 56, right: 56, display: "flex", justifyContent: "space-between" }}>
        <Caption>Mark · Specification</Caption>
        <Caption color="rgba(11,11,12,0.32)">Symbol 01 · Aperture-Echo</Caption>
      </div>

      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <EchoMark size={420} fg={INK} stroke={1.05} />
      </div>

      {/* annotation rail — left */}
      <div style={{ position: "absolute", left: 56, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 22 }}>
        {[
          ["I", "8 BLADE IRIS", "filmmaking heritage"],
          ["II", "ECHO RING φ³", "recursive signal"],
          ["III", "AXIS BREAK", "cinematic widescreen"],
        ].map(([n, t, d]) => (
          <div key={n} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Caption color={GOLD}>{n}</Caption>
            <Caption color="rgba(11,11,12,0.78)" size={11}>{t}</Caption>
            <Caption color="rgba(11,11,12,0.42)" size={9} tracking="0.18em">{d}</Caption>
          </div>
        ))}
      </div>

      {/* annotation rail — right */}
      <div style={{ position: "absolute", right: 56, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-end" }}>
        {[
          ["IV", "35MM PERFORATION", "celluloid index"],
          ["V", "OCTAGONAL PUPIL", "harmonic radial 2π/8"],
          ["VI", "FIBONACCI SPIRAL", "concealed φ resonance"],
        ].map(([n, t, d]) => (
          <div key={n} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
            <Caption color={GOLD}>{n}</Caption>
            <Caption color="rgba(11,11,12,0.78)" size={11}>{t}</Caption>
            <Caption color="rgba(11,11,12,0.42)" size={9} tracking="0.18em">{d}</Caption>
          </div>
        ))}
      </div>

      <Stamp label="02 / Mark" />
    </div>
  );
}

// ─── 4. WORDMARK SPECIMEN ────────────────────────────────────────────────────
function ArtboardWordmark() {
  return (
    <div style={{ width: "100%", height: "100%", background: PAPER, position: "relative", overflow: "hidden", padding: "72px 80px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <PaperGrain />
      <CornerMarks />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Caption>Wordmark · Custom Geometric Construction</Caption>
        <Caption color="rgba(11,11,12,0.32)">cap height H · width H/φ · circle Ø=H</Caption>
      </div>

      {/* Massive specimen */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 26 }}>
        <Caption color="rgba(11,11,12,0.32)">Specimen</Caption>
        <GeoWordmark size={180} color={INK} />
      </div>

      {/* Construction breakdown */}
      <div>
        <Caption color="rgba(11,11,12,0.32)">Letterform construction</Caption>
        <div style={{ height: 18 }} />
        <div style={{ display: "flex", gap: 36, alignItems: "flex-end" }}>
          {[
            { L: "E", w: 62, comp: <svg width={86} height={120} viewBox="-12 -10 86 120">
              <g stroke={GOLD} strokeWidth={0.5} strokeDasharray="2 2" fill="none">
                <line x1="0" y1="-10" x2="0" y2="110" />
                <line x1="62" y1="-10" x2="62" y2="110" />
                <line x1="-12" y1="0" x2="74" y2="0" />
                <line x1="-12" y1="50" x2="74" y2="50" />
                <line x1="-12" y1="100" x2="74" y2="100" />
              </g>
              <GlyphE x={0} y={0} h={100} sw={2.4} color={INK} />
            </svg>, note: "62 = H/φ · 3 bars" },
            { L: "C", w: 100, comp: <svg width={120} height={120} viewBox="-10 -10 120 120">
              <g stroke={GOLD} strokeWidth={0.5} strokeDasharray="2 2" fill="none">
                <circle cx="50" cy="50" r="50" />
                <line x1="-10" y1="50" x2="110" y2="50" />
                <line x1="50" y1="-10" x2="50" y2="110" />
              </g>
              <GlyphC x={0} y={0} h={100} sw={2.4} color={INK} />
            </svg>, note: "Ø=H · 60° aperture" },
            { L: "H", w: 62, comp: <svg width={86} height={120} viewBox="-12 -10 86 120">
              <g stroke={GOLD} strokeWidth={0.5} strokeDasharray="2 2" fill="none">
                <line x1="0" y1="-10" x2="0" y2="110" />
                <line x1="62" y1="-10" x2="62" y2="110" />
                <line x1="-12" y1="50" x2="74" y2="50" />
              </g>
              <GlyphH x={0} y={0} h={100} sw={2.4} color={INK} />
            </svg>, note: "62 = H/φ · golden bar" },
            { L: "O", w: 100, comp: <svg width={120} height={120} viewBox="-10 -10 120 120">
              <g stroke={GOLD} strokeWidth={0.5} strokeDasharray="2 2" fill="none">
                <circle cx="50" cy="50" r="50" />
                <line x1="-10" y1="50" x2="110" y2="50" />
                <line x1="50" y1="-10" x2="50" y2="110" />
              </g>
              <GlyphO x={0} y={0} h={100} sw={2.4} color={INK} />
            </svg>, note: "Ø=H · perfect circle" },
          ].map((g) => (
            <div key={g.L} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
              {g.comp}
              <Caption color="rgba(11,11,12,0.32)">{g.L} · {g.note}</Caption>
            </div>
          ))}
        </div>
      </div>

      <Stamp label="03 / Wordmark" />
    </div>
  );
}

// ─── 5. LOCKUPS ──────────────────────────────────────────────────────────────
function ArtboardLockups() {
  return (
    <div style={{ width: "100%", height: "100%", background: PAPER, position: "relative", overflow: "hidden", padding: "72px 80px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <PaperGrain />
      <CornerMarks />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Caption>Lockups</Caption>
        <Caption color="rgba(11,11,12,0.32)">A · Horizontal · B · Stacked · C · Editorial</Caption>
      </div>

      {/* A — horizontal */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Caption color="rgba(11,11,12,0.32)">A · Horizontal</Caption>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <EchoMark size={130} fg={INK} stroke={1.05} echoes={false} perfs={false} spiral={false} />
          <GeoWordmark size={70} color={INK} />
        </div>
      </div>

      <div style={{ height: 1, background: RULE_LIGHT }} />

      {/* B — stacked centered */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Caption color="rgba(11,11,12,0.32)">B · Stacked, centered</Caption>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, alignSelf: "center" }}>
          <EchoMark size={150} fg={INK} stroke={1.05} />
          <GeoWordmark size={32} color={INK} tracking={0.85} />
        </div>
      </div>

      <div style={{ height: 1, background: RULE_LIGHT }} />

      {/* C — editorial title-card */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Caption color="rgba(11,11,12,0.32)">C · Editorial title card</Caption>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24 }}>
          <GeoWordmark size={92} color={INK} />
          <div style={{ textAlign: "right" }}>
            <Editorial size={20} color={INK}>a film by echo</Editorial>
            <div style={{ height: 4 }} />
            <Caption color="rgba(11,11,12,0.32)" size={9}>EST · MMXXVI · LOS ANGELES</Caption>
          </div>
        </div>
      </div>

      <Stamp label="04 / Lockups" />
    </div>
  );
}

// ─── 6. NEGATIVE / FOIL DIPTYCH ──────────────────────────────────────────────
function ArtboardNegativeFoil() {
  return (
    <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Negative panel */}
      <div style={{ background: INK, color: CREAM, position: "relative", display: "grid", placeItems: "center" }}>
        <FilmGrain />
        <CornerMarks color="rgba(244,241,234,0.22)" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
          <EchoMark size={300} fg={CREAM} stroke={1.0} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <GeoWordmark size={32} color={CREAM} tracking={0.85} />
            <Caption color="rgba(244,241,234,0.42)">Negative · Bone on Ink</Caption>
          </div>
        </div>
        <Stamp label="05a / Negative" color="rgba(244,241,234,0.42)" />
      </div>

      {/* Foil panel */}
      <div style={{ background: "radial-gradient(120% 90% at 50% 40%, #1B1B1E 0%, #0B0B0C 70%)", color: "#E9E9EC", position: "relative", display: "grid", placeItems: "center" }}>
        <CornerMarks color="rgba(233,233,236,0.22)" />
        <svg width={0} height={0} style={{ position: "absolute" }}><SilverDefs id="silver-foil" /></svg>
        <div style={{
          width: 380, height: 380, borderRadius: 6,
          background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.18))",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "grid", placeItems: "center",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 80px rgba(0,0,0,0.6)",
        }}>
          <EchoMark size={300} stroke={1.4} paint="silver-foil" fillPaint="silver-foil-dot" />
        </div>
        <div style={{ position: "absolute", bottom: 44, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Caption color="rgba(233,233,236,0.62)">Silver Foil · Editorial Press</Caption>
          <Caption color="rgba(233,233,236,0.32)">Pantone 877 C · hot foil · 0.8pt linework</Caption>
        </div>
        <Stamp label="05b / Foil" color="rgba(233,233,236,0.42)" />
      </div>
    </div>
  );
}

// ─── 7. TITLE SEQUENCE STORYBOARD ────────────────────────────────────────────
function ArtboardTitleSequence() {
  // 6 cinema frames showing: black → axis draws → barrel → blades sweep → echoes → wordmark
  const frames = [
    { t: "00:00", label: "Frame in", render: (
      <FrameContents>
        <Caption color="rgba(244,241,234,0.32)">silence</Caption>
      </FrameContents>
    )},
    { t: "00:08", label: "Axis", render: (
      <FrameContents>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <line x1={50} y1={200} x2={350} y2={200} stroke={CREAM} strokeWidth={1} />
          <circle cx={200} cy={200} r={2} fill={CREAM} />
        </svg>
      </FrameContents>
    )},
    { t: "00:16", label: "Aperture", render: (
      <FrameContents>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <circle cx={200} cy={200} r={132} fill="none" stroke={CREAM} strokeWidth={1} />
          <line x1={50} y1={200} x2={67} y2={200} stroke={CREAM} strokeWidth={0.8} />
          <line x1={333} y1={200} x2={350} y2={200} stroke={CREAM} strokeWidth={0.8} />
          <circle cx={200} cy={200} r={2.4} fill={CREAM} />
        </svg>
      </FrameContents>
    )},
    { t: "00:24", label: "Iris open", render: (
      <FrameContents>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <MarkPaths stroke={CREAM} fill={CREAM} sw={1} echoes={false} perfs={false} axis={true} spiral={false} />
        </svg>
      </FrameContents>
    )},
    { t: "00:32", label: "Echo", render: (
      <FrameContents>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <MarkPaths stroke={CREAM} fill={CREAM} sw={1} />
        </svg>
      </FrameContents>
    )},
    { t: "00:40", label: "Wordmark", render: (
      <FrameContents>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <EchoMark size={160} fg={CREAM} stroke={0.9} />
          <GeoWordmark size={22} color={CREAM} tracking={0.85} />
        </div>
      </FrameContents>
    )},
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: INK, color: CREAM, position: "relative", overflow: "hidden", padding: "72px 64px", display: "flex", flexDirection: "column", gap: 36 }}>
      <FilmGrain />
      <CornerMarks color="rgba(244,241,234,0.22)" />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Caption color="rgba(244,241,234,0.62)">Title Sequence · Storyboard</Caption>
        <Caption color="rgba(244,241,234,0.32)">2.4s · 24fps · ease-in-out</Caption>
      </div>

      {/* Frames */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 18 }}>
        {frames.map((f, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{
              aspectRatio: "1 / 1",
              background: "#070708",
              border: "1px solid rgba(244,241,234,0.18)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* sprocket strip */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "#0F0F12", borderRight: "1px solid rgba(244,241,234,0.08)" }}>
                {[0.15, 0.5, 0.85].map((p, j) => (
                  <div key={j} style={{ position: "absolute", left: 1, top: `${p * 100}%`, width: 6, height: 4, background: "rgba(244,241,234,0.22)" }} />
                ))}
              </div>
              <div style={{ position: "absolute", inset: "8% 8% 8% 14%" }}>{f.render}</div>
              {/* timecode */}
              <div style={{ position: "absolute", bottom: 6, right: 8 }}>
                <Caption color="rgba(244,241,234,0.55)" size={8} tracking="0.15em">{f.t}</Caption>
              </div>
            </div>
            <Caption color="rgba(244,241,234,0.42)" size={9}>{String(i + 1).padStart(2, "0")} · {f.label}</Caption>
          </div>
        ))}
      </div>

      {/* Audio waveform strip — symbolic */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Caption color="rgba(244,241,234,0.42)">Sound · Sub-bass swell · iris click · echo tail</Caption>
        <svg viewBox="0 0 1000 60" width="100%" height={50}>
          {Array.from({ length: 200 }).map((_, i) => {
            const x = (i / 200) * 1000;
            const phase = i / 200;
            const env = Math.sin(phase * Math.PI) * (0.3 + 0.7 * Math.exp(-Math.pow((phase - 0.55) * 4, 2)));
            const h = Math.max(2, Math.abs(Math.sin(i * 0.6) * 20 * env));
            return (<rect key={i} x={x} y={30 - h / 2} width={2} height={h} fill="rgba(244,241,234,0.55)" />);
          })}
          <line x1={0} y1={30} x2={1000} y2={30} stroke="rgba(244,241,234,0.18)" strokeWidth={0.5} />
        </svg>
      </div>

      <Stamp label="06 / Title Sequence" color="rgba(244,241,234,0.42)" />
    </div>
  );
}

function FrameContents({ children }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>{children}</div>
  );
}

// ─── 8. MOTION (animated) ────────────────────────────────────────────────────
function ArtboardMotion() {
  const C = 2 * Math.PI;
  const { cx, cy } = G;
  return (
    <div style={{ width: "100%", height: "100%", background: INK, position: "relative", color: CREAM, overflow: "hidden" }}>
      <FilmGrain />
      <CornerMarks color="rgba(244,241,234,0.22)" />

      <div style={{ position: "absolute", top: 56, left: 56, right: 56, display: "flex", justifyContent: "space-between" }}>
        <Caption color="rgba(244,241,234,0.62)">Motion · Aperture · Echo · Loop</Caption>
        <Caption color="rgba(244,241,234,0.32)">REC · 2.4s · 24 fps</Caption>
      </div>

      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <svg width={420} height={420} viewBox="0 0 400 400">
          <style>{`
            @keyframes iris-open  { 0% { transform: rotate(40deg) scale(0.05); opacity: 0; } 30% { opacity: 1; } 60% { transform: rotate(-3deg) scale(1.06); } 100% { transform: rotate(0) scale(1); opacity: 1; } }
            @keyframes echo-ring  { 0% { stroke-dashoffset: var(--len); opacity: 0; } 25% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0.85; } }
            @keyframes axis-draw  { from { transform: scaleX(0); opacity: 0;} to { transform: scaleX(1); opacity: 1;} }
            @keyframes echo-pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(2.2); opacity: 0.4; } }
            @keyframes spiral-fade{ 0% { opacity: 0; } 80% { opacity: 0; } 100% { opacity: 0.55; } }
            .iris-grp { transform-origin: 200px 200px; animation: iris-open 1.4s 0.0s cubic-bezier(.6,0,.2,1) infinite alternate; }
            .ring     { transform-origin: 200px 200px; }
            .e1 { --len: ${(C * G.rEcho1).toFixed(2)}; stroke-dasharray: var(--len); animation: echo-ring 1.2s 0.30s cubic-bezier(.5,0,.2,1) infinite alternate; }
            .e2 { --len: ${(C * G.rEcho2).toFixed(2)}; stroke-dasharray: var(--len); animation: echo-ring 1.2s 0.50s cubic-bezier(.5,0,.2,1) infinite alternate; }
            .e3 { --len: ${(C * G.rEcho3).toFixed(2)}; stroke-dasharray: var(--len); animation: echo-ring 1.2s 0.70s cubic-bezier(.5,0,.2,1) infinite alternate; }
            .axis-l, .axis-r { stroke: ${CREAM}; stroke-width: 0.85; animation: axis-draw 1.0s 0.20s cubic-bezier(.6,0,.2,1) infinite alternate; }
            .axis-l { transform-origin: 100% 50%; }
            .axis-r { transform-origin: 0% 50%; }
            .dot     { fill: ${CREAM}; transform-origin: 200px 200px; animation: echo-pulse 2.4s ease-in-out infinite; }
            .spiral  { animation: spiral-fade 2.4s ease-in-out infinite; }
          `}</style>

          <circle className="ring e1" cx={cx} cy={cy} r={G.rEcho1} fill="none" stroke={CREAM} strokeWidth={0.95} pathLength={C * G.rEcho1} />
          <circle className="ring e2" cx={cx} cy={cy} r={G.rEcho2} fill="none" stroke={CREAM} strokeWidth={0.8}  pathLength={C * G.rEcho2} />
          <circle className="ring e3" cx={cx} cy={cy} r={G.rEcho3} fill="none" stroke={CREAM} strokeWidth={0.65} pathLength={C * G.rEcho3} />

          <line className="axis-l" x1={cx - G.rEcho3 - G.axisExt} y1={cy} x2={cx - G.rBarrel - 5} y2={cy} />
          <line className="axis-r" x1={cx + G.rBarrel + 5} y1={cy} x2={cx + G.rEcho3 + G.axisExt} y2={cy} />

          <g className="iris-grp">
            <circle cx={cx} cy={cy} r={G.rBarrel} fill="none" stroke={CREAM} strokeWidth={1.05} />
            <g stroke={CREAM} strokeWidth={1.05} fill="none" strokeLinecap="round">
              {APERTURE.blades.map((d, i) => <path key={i} d={d} />)}
            </g>
            <polygon points={APVERT_STR} fill="none" stroke={CREAM} strokeWidth={0.95} />
            <path className="spiral" d={FIB_PATH} fill="none" stroke={CREAM} strokeWidth={0.5} />
          </g>

          <g fill={CREAM}>
            {[
              [cx - G.perfW / 2, cy - G.rPerf - G.perfH / 2],
              [cx - G.perfW / 2, cy + G.rPerf - G.perfH / 2],
              [cx - G.rPerf - G.perfW / 2, cy - G.perfH / 2],
              [cx + G.rPerf - G.perfW / 2, cy - G.perfH / 2],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width={G.perfW} height={G.perfH} rx={0.8} />
            ))}
          </g>

          <circle className="dot" cx={cx} cy={cy} r={G.rDot} />
        </svg>
      </div>

      <div style={{ position: "absolute", bottom: 56, left: 56, right: 56 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          {["00", "0.4", "0.8", "1.2", "1.6", "2.0", "2.4"].map((t, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 1, height: 8, background: "rgba(244,241,234,0.32)" }} />
              <Caption color="rgba(244,241,234,0.42)">{t}s</Caption>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(244,241,234,0.16)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: 0, left: 0, height: 1, width: "30%",
            background: "linear-gradient(90deg, transparent, rgba(244,241,234,0.7), transparent)",
            animation: "scan 2.4s linear infinite",
          }} />
        </div>
        <style>{`@keyframes scan { 0% { transform: translateX(-100%);} 100%{ transform: translateX(420%);} }`}</style>
      </div>
      <Stamp label="07 / Motion" color="rgba(244,241,234,0.42)" />
    </div>
  );
}

// ─── 9. IN-CONTEXT APPLICATIONS ──────────────────────────────────────────────
function ArtboardApplications() {
  return (
    <div style={{ width: "100%", height: "100%", background: PAPER, position: "relative", overflow: "hidden", padding: "64px 56px", display: "flex", flexDirection: "column", gap: 24 }}>
      <PaperGrain />
      <CornerMarks />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Caption>Applications · Field</Caption>
        <Caption color="rgba(11,11,12,0.32)">slate · poster · card · watermark</Caption>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 16, flex: 1, minHeight: 0 }}>
        {/* Slate (clapperboard) */}
        <SlateApp />
        {/* Poster end card */}
        <PosterEndcard />
        {/* Business card front */}
        <BizCard />
        {/* Watermark on a frame */}
        <WatermarkFrame />
        {/* Letterhead */}
        <Letterhead />
      </div>

      <Stamp label="08 / Applications" />
    </div>
  );
}

function SlateApp() {
  return (
    <div style={{ gridRow: "span 2", background: INK, color: CREAM, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <FilmGrain opacity={0.04} />
      {/* clap hinges */}
      <div style={{ height: 22, background: "repeating-linear-gradient(90deg, #0B0B0C 0 26px, #F4F1EA 26px 52px)" }} />
      <div style={{ flex: 1, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <EchoMark size={56} fg={CREAM} stroke={0.9} echoes={false} perfs={false} spiral={false} />
          <GeoWordmark size={20} color={CREAM} tracking={0.95} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(244,241,234,0.78)", letterSpacing: "0.08em" }}>
          {[
            ["PROD", "ECHO / VOL.I"],
            ["DIR",  "—"],
            ["SCN",  "01"],
            ["TAKE", "001"],
            ["DATE", "MMXXVI · V"],
            ["ROLL", "A"],
          ].map(([k, v]) => (
            <React.Fragment key={k}>
              <div style={{ color: "rgba(244,241,234,0.42)" }}>{k}</div>
              <div style={{ borderBottom: "1px solid rgba(244,241,234,0.18)", paddingBottom: 4 }}>{v}</div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginTop: "auto" }}>
          <Caption color="rgba(244,241,234,0.42)" size={8}>SCENE · TAKE · ROLL — 001</Caption>
        </div>
      </div>
    </div>
  );
}

function PosterEndcard() {
  return (
    <div style={{ background: INK, color: CREAM, position: "relative", overflow: "hidden", display: "grid", placeItems: "center" }}>
      <FilmGrain opacity={0.04} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <Editorial size={14} color="rgba(244,241,234,0.62)">a film by</Editorial>
        <EchoMark size={120} fg={CREAM} stroke={0.85} echoes={false} perfs={false} spiral={false} />
        <GeoWordmark size={18} color={CREAM} tracking={0.85} />
      </div>
      <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center" }}>
        <Caption color="rgba(244,241,234,0.32)" size={7}>END CARD · 16:9</Caption>
      </div>
    </div>
  );
}

function BizCard() {
  return (
    <div style={{ background: CREAM, color: INK, position: "relative", overflow: "hidden", padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "inset 0 0 0 1px rgba(11,11,12,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <EchoMark size={56} fg={INK} stroke={0.9} echoes={false} perfs={false} spiral={false} />
        <Caption color="rgba(11,11,12,0.42)" size={7}>NO. 001</Caption>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 300, fontSize: 13, color: INK }}>Director · A. Lin</div>
        <Caption color="rgba(11,11,12,0.5)" size={7} tracking="0.18em">a.lin@echo.studio · +1 213 ·</Caption>
        <Caption color="rgba(11,11,12,0.32)" size={7} tracking="0.18em">echo studio · los angeles</Caption>
      </div>
    </div>
  );
}

function WatermarkFrame() {
  return (
    <div style={{ background: "#1f1d1b", color: CREAM, position: "relative", overflow: "hidden", display: "grid", placeItems: "center" }}>
      {/* abstract gradient field standing in for footage */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 30% 30%, rgba(184,153,104,0.28), transparent 60%), linear-gradient(135deg, #2a2724, #0E0D0C)" }} />
      <FilmGrain opacity={0.08} />
      <div style={{ position: "absolute", top: 12, left: 14, display: "flex", alignItems: "center", gap: 8, opacity: 0.85 }}>
        <EchoMark size={26} fg={CREAM} stroke={0.7} echoes={false} perfs={false} spiral={false} axis={false} />
        <Caption color="rgba(244,241,234,0.7)" size={8} tracking="0.3em">ECHO</Caption>
      </div>
      <div style={{ position: "absolute", bottom: 10, right: 14 }}>
        <Caption color="rgba(244,241,234,0.45)" size={7}>● REC · 24 fps · TC 01:00:24:12</Caption>
      </div>
      <div style={{ position: "absolute", bottom: 10, left: 14 }}>
        <Caption color="rgba(244,241,234,0.32)" size={7}>WATERMARK · CORNER</Caption>
      </div>
    </div>
  );
}

function Letterhead() {
  return (
    <div style={{ background: CREAM, color: INK, position: "relative", overflow: "hidden", padding: 18, display: "flex", flexDirection: "column", gap: 8, boxShadow: "inset 0 0 0 1px rgba(11,11,12,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <GeoWordmark size={20} color={INK} tracking={0.7} />
        <Caption color="rgba(11,11,12,0.32)" size={7}>letterhead</Caption>
      </div>
      <div style={{ height: 1, background: "rgba(11,11,12,0.16)" }} />
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 13, color: INK, lineHeight: 1.3 }}>
        Re: Treatment — <span style={{ color: GOLD }}>Untitled No. 04</span>
      </div>
      <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 300, fontSize: 9, color: "rgba(11,11,12,0.62)", lineHeight: 1.5 }}>
        Dear collaborator, the attached treatment outlines the next echo —
      </div>
    </div>
  );
}

// ─── 10. CONSTRUCTION GRID ───────────────────────────────────────────────────
function ArtboardConstruction() {
  const { cx, cy } = G;
  const guide = "rgba(184,153,104,0.55)";
  const ghost = "rgba(11,11,12,0.10)";
  return (
    <div style={{ width: "100%", height: "100%", background: PAPER, position: "relative", overflow: "hidden" }}>
      <PaperGrain />
      <CornerMarks />
      <div style={{ position: "absolute", top: 48, left: 56, right: 56, display: "flex", justifyContent: "space-between" }}>
        <Caption>Construction · Aperture × Echo × φ</Caption>
        <Caption color="rgba(11,11,12,0.32)">N=8 blades · base unit u = rApert / φ ≈ 18.5</Caption>
      </div>

      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <svg width={560} height={560} viewBox="0 0 400 400">
          <g stroke={ghost} strokeWidth={0.4}>
            {Array.from({ length: 25 }).map((_, i) => (<line key={"v" + i} x1={i * 16} y1={0} x2={i * 16} y2={400} />))}
            {Array.from({ length: 25 }).map((_, i) => (<line key={"h" + i} x1={0} y1={i * 16} x2={400} y2={i * 16} />))}
          </g>
          <line x1={0} y1={cy} x2={400} y2={cy} stroke={guide} strokeWidth={0.6} strokeDasharray="2 4" />
          <line x1={cx} y1={0} x2={cx} y2={400} stroke={guide} strokeWidth={0.6} strokeDasharray="2 4" />

          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 8;
            return (
              <line key={"sp" + i}
                x1={cx - Math.cos(a) * (G.rPerf + 14)} y1={cy - Math.sin(a) * (G.rPerf + 14)}
                x2={cx + Math.cos(a) * (G.rPerf + 14)} y2={cy + Math.sin(a) * (G.rPerf + 14)}
                stroke={guide} strokeWidth={0.4} strokeDasharray="1 3" />
            );
          })}

          {[G.rApert, G.rPivot, G.rBarrel, G.rEcho1, G.rEcho2, G.rEcho3, G.rPerf].map((r, i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={guide} strokeWidth={0.5} strokeDasharray="2 3" />
          ))}

          {/* pivot points */}
          {APERTURE.verts.map((v, i) => {
            const a = (2 * Math.PI * i) / 8 - Math.PI / 2;
            const px = cx + G.rPivot * Math.cos(a);
            const py = cy + G.rPivot * Math.sin(a);
            return (
              <g key={"pv" + i}>
                <circle cx={px} cy={py} r={1.4} fill={GOLD} />
                <circle cx={v.x} cy={v.y} r={1} fill={GOLD} />
              </g>
            );
          })}

          <MarkPaths stroke={INK} fill={INK} sw={1.15} />

          {[
            { r: G.rApert,  label: "rₐ = 30 · pupil" },
            { r: G.rPivot,  label: "rₚ = 118 · blade pivot" },
            { r: G.rBarrel, label: "r_b = 132 · barrel" },
            { r: G.rEcho1,  label: "e₁ = 152 · echo I" },
            { r: G.rEcho2,  label: "e₂ = 168 · echo II" },
            { r: G.rPerf,   label: "r_f = 192 · 35mm" },
          ].map((d, i) => {
            const yLabel = cy - 6 - i * 14;
            return (
              <g key={i}>
                <line x1={cx + d.r} y1={cy} x2={cx + d.r} y2={yLabel + 2} stroke={GOLD} strokeWidth={0.5} />
                <text x={cx + d.r + 4} y={yLabel} fill={GOLD} fontSize="6" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">{d.label}</text>
              </g>
            );
          })}

          <text x={20} y={388} fill={GOLD} fontSize="6" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
            r_b · φ = 213.6 · echo cascade · iris θ = 2π/8 · spiral φⁿ
          </text>
          <text x={20} y={398} fill="rgba(184,153,104,0.55)" fontSize="5.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
            φ = 1.6180339887…
          </text>
        </svg>
      </div>
      <Stamp label="09 / Construction" />
    </div>
  );
}

// ─── 11. SPACING SYSTEM ──────────────────────────────────────────────────────
function ArtboardSpacing() {
  return (
    <div style={{ width: "100%", height: "100%", background: PAPER, position: "relative", overflow: "hidden", padding: "72px 64px", display: "flex", flexDirection: "column", gap: 28 }}>
      <PaperGrain />
      <CornerMarks />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Caption>Clearspace + Scale System</Caption>
        <Caption color="rgba(11,11,12,0.32)">x = ⌀mark / φ³</Caption>
      </div>

      <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
        <ClearspaceDiagram />
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 360 }}>
          <Caption color="rgba(11,11,12,0.32)">Clearspace</Caption>
          <Editorial size={22} color={INK}>
            Minimum exclusion zone equals <span style={{ color: GOLD, fontStyle: "normal" }}>x</span>, where <span style={{ color: GOLD, fontStyle: "normal" }}>x = r_barrel / φ²</span>. No element may enter the field; perforations remain inside.
          </Editorial>
        </div>
      </div>

      <div style={{ height: 1, background: RULE_LIGHT }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Caption color="rgba(11,11,12,0.32)">Size scale · φ-cascade · responsive simplification</Caption>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 36, justifyContent: "space-between" }}>
          {[
            { s: 18,  label: "Favicon", note: "18px",  echoes: false, perfs: false, axis: false, spiral: false },
            { s: 30,  label: "App",     note: "30px",  echoes: false, perfs: false, axis: false, spiral: false },
            { s: 50,  label: "UI",      note: "50px",  echoes: true,  perfs: false, axis: true,  spiral: false },
            { s: 82,  label: "Card",    note: "82px",  echoes: true,  perfs: true,  axis: true,  spiral: false },
            { s: 132, label: "Print",   note: "132px", echoes: true,  perfs: true,  axis: true,  spiral: true },
            { s: 200, label: "Title",   note: "200px", echoes: true,  perfs: true,  axis: true,  spiral: true },
          ].map((d) => (
            <div key={d.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <EchoMark size={d.s} fg={INK}
                stroke={Math.max(0.6, d.s / 200)}
                echoes={d.echoes} perfs={d.perfs} axis={d.axis} spiral={d.spiral} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Caption>{d.label}</Caption>
                <Caption color="rgba(11,11,12,0.32)">{d.note}</Caption>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Stamp label="10 / Spacing" />
    </div>
  );
}

function ClearspaceDiagram() {
  const cx = 150, cy = 150;
  const x = 22;
  const r = G.rPerf * 0.55;
  return (
    <svg width={300} height={300} viewBox="0 0 300 300">
      <rect x={cx - r - x} y={cy - r - x}
        width={(r + x) * 2} height={(r + x) * 2}
        fill="none" stroke={GOLD} strokeWidth={0.6} strokeDasharray="3 3" />
      <g fill={GOLD} fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.1em">
        <text x={cx} y={cy - r - x - 6} textAnchor="middle">x</text>
        <text x={cx} y={cy + r + x + 14} textAnchor="middle">x</text>
        <text x={cx - r - x - 8} y={cy + 3} textAnchor="end">x</text>
        <text x={cx + r + x + 8} y={cy + 3}>x</text>
      </g>
      <g transform={`translate(${cx - 200 * 0.55}, ${cy - 200 * 0.55}) scale(0.55)`}>
        <MarkPaths stroke={INK} fill={INK} sw={2} />
      </g>
    </svg>
  );
}

Object.assign(window, {
  ArtboardCover, ArtboardManifesto, ArtboardMarkSpec, ArtboardWordmark,
  ArtboardLockups, ArtboardNegativeFoil, ArtboardTitleSequence, ArtboardMotion,
  ArtboardApplications, ArtboardConstruction, ArtboardSpacing,
});
