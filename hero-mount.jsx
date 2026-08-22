/* Hero mount — the banner animation fitted into a website hero.
   Desktop: the composition cover-fills a full-viewport hero; its overlays are
   pushed down so the headline clears the fixed nav.
   Mobile: the SAME composition, just scaled down to fit the screen width whole —
   headline, step labels and rail included, nothing cropped. */

const BAR = 44;
const MOBILE_AT = 820;

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
        // contain: the whole 16:9 frame fits the width, nothing cropped
        const s = hw / 1920;
        setBox({ w: hw, h: 1080 * s + BAR, left: 0, top: 0, stripH: 1080 * s });
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

  const stage = () => (
    <CompositionStage
      width={1920}
      height={1080}
      scenes={window.OM_SCENES}
      playback={window.OM_PLAYBACK}
      bg="#0B2033"
    >
      <Piece accent={accent} showRail={true} insetTop={mobile ? 0 : 104} />
    </CompositionStage>
  );

  if (mobile) {
    return (
      <div ref={hostRef} style={{
        position: 'relative', width: '100%', background: '#0B2033', overflow: 'hidden',
        paddingTop: 138, paddingBottom: 56,
      }}>
        <div style={{ position: 'relative', width: '100%', height: box ? box.stripH : 220, overflow: 'hidden' }}>
          {box && ready ? (
            <div style={{ position: 'absolute', left: 0, top: 0, width: box.w, height: box.h }}>
              {stage()}
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
