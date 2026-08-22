/* Hero mount — the banner animation cover-fitted into a full-viewport website hero.
   The stage reserves 44px for its control bar, so the wrapper is measured in real
   pixels and offset until that strip sits below the hero's clipping edge. */

const BAR = 44;

function WerkstacksHero() {
  const { CompositionStage } = window;
  const Piece = window.WerkstacksPiece;
  const hostRef = React.useRef(null);
  const [box, setBox] = React.useState(null);
  const [ready, setReady] = React.useState(false);

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
      if (!hw || !hh) return;
      const s = Math.max(hw / 1920, hh / 1080);
      const w = 1920 * s, h = 1080 * s;
      setBox({ w, h: h + BAR, left: (hw - w) / 2, top: (hh - h) / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
          <CompositionStage
            width={1920}
            height={1080}
            scenes={window.OM_SCENES}
            playback={window.OM_PLAYBACK}
            bg="#0B2033"
          >
            <Piece accent={(window.TWEAK_DEFAULTS && window.TWEAK_DEFAULTS.accent) || '#5B3DF5'} showRail={true} />
          </CompositionStage>
        </div>
      ) : null}
    </div>
  );
}

window.WerkstacksHero = WerkstacksHero;
