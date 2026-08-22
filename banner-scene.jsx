/* Werkstacks banner — continuous-composition scene.
   One world strip; the camera tracks the data left → right through 4 stations. */

const { CompositionStage, useComposition, Easing, animate } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor, TweakRadio } = window;

const PAPER = '#F4F1EA';
const INK = '#0B2033';
const GOLD = '#E8B84B';

const MOTION = {
  enter: (o) => animate({ ease: Easing.easeOutCubic, ...o }),
  draw: (o) => animate({ ease: Easing.easeInOutQuart, ...o }),
  pop: (o) => animate({ ease: Easing.easeOutBack, ...o }),
};

function kf(T, pts) {
  if (T <= pts[0][0]) return pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [t0, v0] = pts[i], [t1, v1] = pts[i + 1];
    if (T <= t1) return MOTION.draw({ from: v0, to: v1, start: t0, end: t1 })(T);
  }
  return pts[pts.length - 1][1];
}

const ST = { scatter: 900, engine: 2380, dash: 3980, win: 5480 };
const WORLD_W = 6400, WORLD_H = 1080;

const CARDS = [
  { x: -300, y: -190, r: -13, w: 190, h: 132 },
  { x: -60, y: -250, r: 8, w: 205, h: 140 },
  { x: 200, y: -160, r: -6, w: 175, h: 122 },
  { x: -330, y: 60, r: 11, w: 200, h: 138 },
  { x: -50, y: 20, r: -9, w: 185, h: 128 },
  { x: 215, y: 105, r: 14, w: 195, h: 134 },
  { x: -190, y: 245, r: -17, w: 170, h: 118 },
  { x: 105, y: 275, r: 6, w: 180, h: 124 },
];

const BARS = [0.38, 0.62, 0.5, 0.81, 0.68, 0.95, 0.72];

function Center({ x, y, children, style, className }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', ...style }}>
      {children}
    </div>
  );
}

/* ---------- 01 scattered data ---------- */
function DataCard({ T, c, i, cues, accent }) {
  const ingest = cues.Engine - 0.55 + i * 0.085;
  const arrive = ingest + 1.15;
  const p = MOTION.draw({ from: 0, to: 1, start: ingest, end: arrive })(T);
  const bx = ST.scatter + c.x, by = 540 + c.y;
  const tx = ST.engine - 320, ty = 540;
  const drift = Math.sin(T * 0.8 + i * 1.7) * 10;
  const spin = Math.cos(T * 0.6 + i) * 2.5;
  const inAnim = MOTION.enter({ from: 0, to: 1, start: 0.1 + i * 0.06, end: 0.9 + i * 0.06 })(T);
  const back = MOTION.enter({ from: 0, to: 1, start: cues.Success + 0.9, end: cues.Success + 1.7 })(T);
  const q = p * (1 - back);
  return (
    <Center
      x={bx + (tx - bx) * q}
      y={by + drift * (1 - q) + (ty - by) * q}
      style={{
        transform: `translate(-50%,-50%) rotate(${(c.r + spin) * (1 - q)}deg) scale(${(0.5 + 0.5 * inAnim) * (1 - 0.72 * q)})`,
        opacity: Math.max(inAnim * (1 - p * p), back * 0.22),
        width: c.w, height: c.h,
        background: PAPER,
        borderRadius: 4,
        boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
        padding: '16px 18px',
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
    >
      <div style={{ height: 8, width: '52%', background: accent, opacity: 0.9 }}></div>
      <div style={{ height: 6, width: '88%', background: 'rgba(11,32,51,0.22)' }}></div>
      <div style={{ height: 6, width: '70%', background: 'rgba(11,32,51,0.22)' }}></div>
      <div style={{ height: 6, width: '80%', background: 'rgba(11,32,51,0.14)' }}></div>
    </Center>
  );
}

/* ---------- 02 the machine ---------- */
function Machine({ T, cues, accent }) {
  const rise = MOTION.pop({ from: 0, to: 1, start: cues.Engine - 1.1, end: cues.Engine + 0.2 })(T);
  const working = T > cues.Engine - 0.4 && T < cues.Dashboard + 0.8;
  const throb = working ? 1 + Math.sin(T * 7) * 0.008 : 1;
  const belt = ((T * 190) % 120);
  return (
    <Center
      x={ST.engine} y={540}
      style={{ transform: `translate(-50%,-50%) scale(${(0.82 + 0.18 * rise) * throb})`, opacity: rise }}
    >
      <div style={{ position: 'relative', width: 640, height: 400 }}>
        <div style={{
          position: 'absolute', inset: 0, background: accent, borderRadius: 8,
          boxShadow: `0 40px 90px rgba(0,0,0,0.45), inset 0 3px 0 rgba(255,255,255,0.28)`,
        }}></div>
        <div style={{ position: 'absolute', left: -34, top: 140, width: 40, height: 120, background: '#07161f', borderRadius: '4px 0 0 4px' }}></div>
        <div style={{ position: 'absolute', right: -34, top: 150, width: 40, height: 100, background: PAPER, borderRadius: '0 4px 4px 0' }}></div>
        <div style={{
          position: 'absolute', left: 40, top: 40, right: 40, height: 150,
          background: 'rgba(7,22,31,0.42)', borderRadius: 4, overflow: 'hidden',
          display: 'flex', alignItems: 'center',
        }}>
          <div style={{
            position: 'absolute', left: 40, right: 0, top: 22, bottom: 44,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            overflow: 'hidden',
          }}>
            {[0, 1, 2].map((r) => (
              <div key={r} style={{
                height: 12,
                background: `repeating-linear-gradient(90deg, ${PAPER} 0 ${58 + r * 22}px, transparent ${58 + r * 22}px ${118 + r * 22}px)`,
                backgroundPositionX: `${(belt * (1 + r * 0.35)) % (118 + r * 22)}px`,
                opacity: 0.62 - r * 0.12,
              }}></div>
            ))}
          </div>
          <div style={{
            position: 'absolute', left: 24, right: 24, bottom: 22, height: 6,
            background: 'rgba(244,241,234,0.35)',
          }}></div>
        </div>
        <div style={{
          position: 'absolute', left: 40, bottom: 36, right: 40, display: 'flex',
          alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 30, letterSpacing: '0.22em',
            color: PAPER, fontWeight: 500,
          }}>WERKSTACKS</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{
                width: 16, height: 16, borderRadius: '50%',
                background: PAPER,
                opacity: working ? 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(T * 6 - i * 0.9)) : 0.25,
              }}></div>
            ))}
          </div>
        </div>
      </div>
    </Center>
  );
}

function OutChip({ T, i, cues, accent }) {
  const start = cues.Engine + 1.25 + i * 0.11;
  const end = cues.Dashboard + 0.35 + i * 0.11;
  const p = MOTION.draw({ from: 0, to: 1, start, end })(T);
  if (p <= 0 || p >= 1) return null;
  const x = ST.engine + 340 + (ST.dash - 420 - (ST.engine + 340)) * p;
  const y = 540 + Math.sin(p * Math.PI) * (i % 2 ? -70 : 70);
  return (
    <Center x={x} y={y} style={{
      width: 108, height: 30, borderRadius: 3,
      background: PAPER, border: `3px solid ${accent}`,
      opacity: Math.min(1, (1 - p) * 3.2),
    }}></Center>
  );
}

/* ---------- 03 dashboard ---------- */
function Dashboard({ T, cues, accent }) {
  const inP = MOTION.enter({ from: 0, to: 1, start: cues.Dashboard - 0.5, end: cues.Dashboard + 0.5 })(T);
  const kpis = [
    { k: 'SOURCES', v: 42, s: '' },
    { k: 'CLEAN', v: 99.6, s: '%', d: 1 },
    { k: 'HOURS SAVED', v: 310, s: '' },
  ];
  return (
    <Center x={ST.dash} y={540} style={{
      transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * inP})`, opacity: inP,
      width: 900, height: 560, background: PAPER, borderRadius: 8,
      boxShadow: '0 44px 100px rgba(0,0,0,0.45)', padding: 44, boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', gap: 30,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.01em', color: INK }}>Operations</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: accent }}></div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, color: 'rgba(11,32,51,0.5)' }}>LIVE</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {kpis.map((m, i) => {
          const p = MOTION.draw({ from: 0, to: 1, start: cues.Dashboard + 0.15 + i * 0.12, end: cues.Dashboard + 1.4 })(T);
          return (
            <div key={m.k} style={{ borderTop: `4px solid ${accent}`, paddingTop: 14 }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, letterSpacing: '0.14em', color: 'rgba(11,32,51,0.5)' }}>{m.k}</div>
              <div style={{ fontSize: 52, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>
                {(m.v * p).toFixed(m.d || 0)}{m.s}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 20 }}>
        {BARS.map((b, i) => {
          const p = MOTION.pop({ from: 0, to: 1, start: cues.Dashboard + 0.45 + i * 0.09, end: cues.Dashboard + 1.5 + i * 0.09 })(T);
          return (
            <div key={i} style={{
              flex: 1, height: `${b * 100 * Math.max(0, p)}%`,
              background: i === BARS.length - 2 ? accent : 'rgba(11,32,51,0.16)',
              borderRadius: '3px 3px 0 0',
            }}></div>
          );
        })}
      </div>
    </Center>
  );
}

/* ---------- 04 success ---------- */
function Trophy({ T, cues, accent }) {
  const p = MOTION.pop({ from: 0, to: 1, start: cues.Success - 0.35, end: cues.Success + 0.85 })(T);
  const float = Math.sin(T * 1.6) * 8 * p;
  const ring = MOTION.enter({ from: 0, to: 1, start: cues.Success, end: cues.Success + 1.1 })(T);
  return (
    <Center x={ST.win} y={540}>
      <div style={{ position: 'relative', width: 700, height: 620 }}>
        <div style={{
          position: 'absolute', left: '50%', top: '52%',
          width: 520, height: 520, marginLeft: -260, marginTop: -260,
          borderRadius: '50%', border: `4px solid ${accent}`,
          transform: `scale(${0.4 + ring * 0.9})`, opacity: (1 - ring) * 0.8,
        }}></div>
        <div style={{ position: 'absolute', left: 60, right: 60, bottom: 40, top: 120, display: 'flex', alignItems: 'flex-end', gap: 22, opacity: 0.28 }}>
          {[0.3, 0.45, 0.6, 0.78, 1].map((h, i) => {
            const bp = MOTION.draw({ from: 0, to: 1, start: cues.Success - 0.5 + i * 0.1, end: cues.Success + 0.7 + i * 0.1 })(T);
            return <div key={i} style={{ flex: 1, height: `${h * 100 * Math.max(0, bp)}%`, background: PAPER, borderRadius: '3px 3px 0 0' }}></div>;
          })}
        </div>
        <div style={{
          position: 'absolute', left: '50%', top: '50%', marginLeft: -160, marginTop: -190,
          transform: `translateY(${-float}px) scale(${0.6 + 0.4 * p})`, opacity: Math.min(1, p * 1.4),
        }}>
          <div style={{ position: 'relative', width: 320 }}>
            <div style={{ position: 'absolute', left: -66, top: 24, width: 96, height: 96, border: `18px solid ${GOLD}`, borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', right: -66, top: 24, width: 96, height: 96, border: `18px solid ${GOLD}`, borderRadius: '50%' }}></div>
            <div style={{ position: 'relative', width: 260, height: 190, margin: '0 30px', background: GOLD, borderRadius: '10px 10px 130px 130px' }}></div>
            <div style={{ width: 52, height: 74, margin: '0 auto', background: GOLD }}></div>
            <div style={{ width: 180, height: 26, margin: '0 auto', background: GOLD, borderRadius: 3 }}></div>
            <div style={{ width: 240, height: 20, margin: '10px auto 0', background: GOLD, borderRadius: 3 }}></div>
          </div>
        </div>
      </div>
    </Center>
  );
}

/* ---------- world dressing ---------- */
function FlowLine({ T, accent, from, to, y }) {
  return (
    <div style={{
      position: 'absolute', left: from, top: y, width: to - from, height: 5,
      background: `repeating-linear-gradient(90deg, ${accent} 0 34px, transparent 34px 86px)`,
      backgroundPositionX: `${(T * 150) % 86}px`,
      opacity: 0.55,
    }}></div>
  );
}

/* ---------- screen-space overlays ---------- */
function StepLabel({ T, cues, accent }) {
  const steps = [
    { at: 0, n: '01', t: 'Scattered data' },
    { at: cues.Engine, n: '02', t: 'Werkstacks' },
    { at: cues.Dashboard, n: '03', t: 'Dashboards you use' },
    { at: cues.Success, n: '04', t: 'Results' },
  ];
  let cur = steps[0];
  for (const s of steps) if (T >= s.at - 0.25) cur = s;
  const local = T - (cur.at - 0.25);
  const rise = MOTION.enter({ from: 26, to: 0, start: 0, end: 0.55 })(local);
  const fade = MOTION.enter({ from: 0, to: 1, start: 0, end: 0.45 })(local);
  const out = T > cues.Success + 0.1 ? MOTION.enter({ from: 1, to: 0, start: cues.Success + 0.1, end: cues.Success + 0.55 })(T) : 1;
  return (
    <div style={{
      position: 'absolute', left: 96, bottom: 148, display: 'flex', alignItems: 'baseline', gap: 26,
      transform: `translateY(${rise * 0.6}px)`, opacity: fade * out,
    }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 34, color: accent, fontWeight: 600 }}>{cur.n}</div>
      <div style={{ fontSize: 54, fontWeight: 600, color: PAPER, letterSpacing: '-0.02em' }}>{cur.t}</div>
    </div>
  );
}

function Rail({ T, cues, accent, total }) {
  const marks = [0, cues.Engine, cues.Dashboard, cues.Success];
  const out = MOTION.enter({ from: 1, to: 0, start: cues.Success + 0.1, end: cues.Success + 0.6 })(T);
  return (
    <div style={{ position: 'absolute', left: 96, right: 96, bottom: 86, opacity: out }}>
      <div style={{ position: 'relative', height: 5, background: 'rgba(244,241,234,0.16)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.min(100, (T / total) * 100)}%`, background: accent }}></div>
        {marks.map((m, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${(m / total) * 100}%`, top: -9,
            width: 22, height: 22, marginLeft: -11, borderRadius: '50%',
            background: T >= m - 0.2 ? accent : '#0B2033',
            border: `4px solid ${T >= m - 0.2 ? accent : 'rgba(244,241,234,0.3)'}`,
          }}></div>
        ))}
      </div>
    </div>
  );
}

function Headline({ T, cues, accent, total, insetTop }) {
  const words = ['Scattered', 'data', 'in.'];
  const words2 = ['Decisions', 'out.'];
  const base = cues.Success + 0.75;
  const fadeOut = MOTION.enter({ from: 1, to: 0, start: total - 0.2, end: total - 0.02 })(T);
  const word = (w, i, off) => {
    const s = base + off + i * 0.1;
    const p = MOTION.enter({ from: 0, to: 1, start: s, end: s + 0.45 })(T);
    return (
      <span key={w + i} style={{
        display: 'inline-block', transform: `translateY(${(1 - p) * 46}px)`, opacity: p,
      }}>{w}</span>
    );
  };
  const markP = MOTION.enter({ from: 0, to: 1, start: base + 0.5, end: base + 0.95 })(T);
  return (
    <div style={{ position: 'absolute', left: 120, top: 222 + (insetTop || 0), width: 1200, opacity: fadeOut }}>
      <div style={{
        fontSize: 84, fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.035em',
        color: PAPER, display: 'flex', flexWrap: 'wrap', columnGap: 20,
      }}>{words.map((w, i) => word(w, i, 0))}</div>
      <div style={{
        fontSize: 84, fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.035em',
        color: accent, display: 'flex', flexWrap: 'wrap', columnGap: 20, marginTop: 8,
      }}>{words2.map((w, i) => word(w, i, 0.3))}</div>
      <div style={{ marginTop: 38, opacity: markP, transform: `translateY(${(1 - markP) * 20}px)` }}>
        <div style={{ width: 104, height: 5, background: accent, marginBottom: 20 }}></div>
        <div style={{ fontSize: 52, fontWeight: 800, color: PAPER, letterSpacing: '-0.02em' }}>WERKSTACKS</div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, letterSpacing: '0.5em',
          color: 'rgba(244,241,234,0.62)', marginTop: 8,
        }}>SOLUTIONS</div>
      </div>
    </div>
  );
}

/* ---------- the piece ---------- */
function Piece({ accent, showRail, insetTop, showHeadline, showLabels }) {
  const { T, CUES, authoredTotal } = useComposition();
  const total = authoredTotal;

  const camX = kf(T, [
    [0, ST.scatter - 60], [CUES.Engine - 1.1, ST.scatter + 120],
    [CUES.Engine + 0.35, ST.engine], [CUES.Dashboard - 0.7, ST.engine + 260],
    [CUES.Dashboard + 0.3, ST.dash], [CUES.Success - 0.6, ST.dash + 200],
    [CUES.Success + 0.5, ST.win], [CUES.Success + 0.35, ST.win - 40],
    [CUES.Success + 1.25, 3100], [total - 0.6, 3060],
  ]);
  const camY = kf(T, [
    [0, 540], [CUES.Success + 0.35, 540], [CUES.Success + 1.25, -60], [total - 0.6, -60],
  ]);
  const zoom = kf(T, [
    [0, 0.98], [CUES.Engine - 1.1, 0.86], [CUES.Engine + 0.35, 1.02],
    [CUES.Dashboard + 0.3, 0.98], [CUES.Success + 0.5, 1.0],
    [CUES.Success + 0.35, 0.98], [CUES.Success + 1.25, 0.27], [total - 0.6, 0.27],
  ]);

  const openFade = MOTION.enter({ from: 0, to: 1, start: 0, end: 0.4 })(T);
  const closeFade = MOTION.enter({ from: 1, to: 0, start: total - 0.18, end: total - 0.01 })(T);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#0B2033' }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: openFade * closeFade,
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, width: WORLD_W, height: WORLD_H,
          transformOrigin: '0 0',
          transform: `translate(${960 - camX * zoom}px, ${540 - camY * zoom}px) scale(${zoom})`,
        }}>
          <div style={{
            position: 'absolute', inset: -4000,
            background: `linear-gradient(90deg, #0B2033 0%, #0E2A42 45%, #0B2033 100%),
              repeating-linear-gradient(0deg, rgba(244,241,234,0.05) 0 1px, transparent 1px 90px),
              repeating-linear-gradient(90deg, rgba(244,241,234,0.05) 0 1px, transparent 1px 90px)`,
          }}></div>
          <div style={{
            position: 'absolute', left: ST.engine - 700, top: -160, width: 1400, height: 1400,
            borderRadius: '50%', background: `radial-gradient(circle, ${accent}44 0%, transparent 62%)`,
          }}></div>
          <div style={{
            position: 'absolute', left: ST.win - 700, top: -160, width: 1400, height: 1400,
            borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}26 0%, transparent 60%)`,
          }}></div>

          <FlowLine T={T} accent={accent} from={ST.scatter + 420} to={ST.engine - 340} y={538} />
          <FlowLine T={T} accent={accent} from={ST.engine + 350} to={ST.dash - 470} y={538} />
          <FlowLine T={T} accent={accent} from={ST.dash + 470} to={ST.win - 330} y={538} />

          {CARDS.map((c, i) => <DataCard key={i} T={T} c={c} i={i} cues={CUES} accent={accent} />)}
          <Machine T={T} cues={CUES} accent={accent} />
          {[0, 1, 2, 3, 4, 5].map((i) => <OutChip key={i} T={T} i={i} cues={CUES} accent={accent} />)}
          <Dashboard T={T} cues={CUES} accent={accent} />
          <Trophy T={T} cues={CUES} accent={accent} />
        </div>

        {showLabels === false ? null : <StepLabel T={T} cues={CUES} accent={accent} />}
        {showRail ? <Rail T={T} cues={CUES} accent={accent} total={total} /> : null}
        {showHeadline === false ? null : <Headline T={T} cues={CUES} accent={accent} total={total} insetTop={insetTop} />}
      </div>
    </div>
  );
}

function WerkstacksBanner() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || {});
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <CompositionStage
        width={1920}
        height={1080}
        scenes={window.OM_SCENES}
        playback={window.OM_PLAYBACK}
        bg="#0B2033"
      >
        <Piece accent={t.accent || '#5B3DF5'} showRail={t.showRail !== false} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={['#5B3DF5', '#1E5079', '#2A6FDB', '#7A5AE0']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Banner" />
        <TweakToggle label="Progress rail" value={t.showRail !== false} onChange={(v) => setTweak('showRail', v)} />
        <TweakToggle label="Motion editor" value={t.motionEditor !== false} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </div>
  );
}

window.WerkstacksBanner = WerkstacksBanner;
window.WerkstacksPiece = Piece;
