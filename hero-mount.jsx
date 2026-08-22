/* Hero mount — the banner animation fitted into a website hero.
   Desktop: the composition cover-fills a full-viewport hero; its overlays are
   pushed down so the headline clears the fixed nav.
   Mobile: a real DOM headline (readable at any size) sits above the animation,
   which is width-fitted so the whole journey stays visible instead of cropped. */

const BAR = 44;
const MOBILE_AT = 820;
/* On phones the composition is fitted to a 1400-wide window instead of the full
   1920 — the action all sits centred, so the small crop buys real scale. */
const MOBILE_FIT_W = 1400;

function WerkstacksHero() {
  const { CompositionStage } = window;
  const Piece = window.WerkstacksPiece;
  const hostRef = React.useRef(null);
  const [box, setBox] = React.useState(null);
  const [mobile, setMobile] = React.useState(window.innerWidth <= MOBILE_AT);
  const [ready, setReady] = React.useState(false);
  const accent = (window.TWEAK_DEFAULTS && window.TWEAK_DEFAULTS.accent) || '#5B3DF5';

  // Hold a still poster frame until the page has finished loading, so a slow
  // connection sees the hero immediately instead of an empty navy block.
  React.useEffect(() => {
    if (document.readyState === 'complete') {
      const t = setTimeout(() => setReady(true), 120);
      return () => clearTimeout(t);
    }
    const go = () => setTimeout(() => setReady(true), 120);
    window.addEventListener('load', go);
    const fallback = setTimeout(go, 3000);
    return () => { window.removeEventListener('load', go); clearTimeout(fallback); };
  }, []);

  React.useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => {
      const hw = el.clientWidth, hh = el.clientHeight;
      if (!hw) return;
      const isM = window.innerWidth <= MOBILE_AT;
      setMobile(isM);
      if (isM) {
        const s = hw / MOBILE_FIT_W;
        const w = 1920 * s, h = 1080 * s;
        setBox({ w, h: h + BAR, left: (hw - w) / 2, top: 0, stripH: h });
      } else {
        if (!hh) return;
        const s = Math.max(hw / 1920, hh / 1080);
        const w = 1920 * s, h = 1080 * s;
        setBox({ w, h: h + BAR, left: (hw - w) / 2, top: (hh - h) / 2 });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const stage = (extra) => (
    <CompositionStage
      width={1920}
      height={1080}
      scenes={window.OM_SCENES}
      playback={window.OM_PLAYBACK}
      bg="#0B2033"
    >
      <Piece accent={accent} showRail={!mobile} insetTop={mobile ? 0 : 104} {...extra} />
    </CompositionStage>
  );

  if (mobile) {
    return (
      <div ref={hostRef} style={{
        position: 'relative', width: '100%', background: '#0B2033',
        overflow: 'hidden', padding: '164px 0 46px',
        display: 'flex', flexDirection: 'column', gap: 40,
      }}>
        <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{
            fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 'clamp(36px, 11vw, 54px)',
            fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.035em', color: '#F4F1EA',
          }}>
            Scattered data in.<br />
            <span style={{ color: accent }}>Decisions out.</span>
          </div>
          <div>
            <div style={{ width: 72, height: 4, background: accent, marginBottom: 16 }}></div>
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 26, fontWeight: 800,
              letterSpacing: '-0.01em', color: '#F4F1EA', lineHeight: 1,
            }}>WERKSTACKS</div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.42em',
              color: 'rgba(244,241,234,0.55)', marginTop: 7,
            }}>SOLUTIONS</div>
          </div>
        </div>
        <div style={{
          position: 'relative', width: '100%',
          height: box ? box.stripH : 300, overflow: 'hidden',
        }}>
          {box && ready ? (
            <div style={{ position: 'absolute', left: box.left, top: 0, width: box.w, height: box.h }}>
              {stage({ showHeadline: false, showLabels: false })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div ref={hostRef} style={{ position: 'relative', width: '100%', height: '100vh', background: '#0B2033', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 14,
        opacity: ready ? 0 : 1, transition: 'opacity 0.6s ease',
        pointerEvents: 'none', zIndex: 2,
      }}>
        <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 54, fontWeight: 800, letterSpacing: '-0.02em', color: '#F4F1EA' }}>WERKSTACKS</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, letterSpacing: '0.5em', color: 'rgba(244,241,234,0.5)' }}>SOLUTIONS</div>
      </div>
      {box && ready ? (
        <div style={{ position: 'absolute', left: box.left, top: box.top, width: box.w, height: box.h }}>
          {stage()}
        </div>
      ) : null}
    </div>
  );
}

window.WerkstacksHero = WerkstacksHero;
