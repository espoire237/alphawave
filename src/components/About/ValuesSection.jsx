/**
 * CoreValues — About Page Section 4 — FULLY RESPONSIVE
 * Features: Per-card mouse spotlight + Animated glowing Africa map
 * All inline styles — no Tailwind dependency
 */

import { useEffect, useRef, useState } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

// ── Scroll Reveal ─────────────────────────────────────────────
const useScrollReveal = (t = 0.08) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll("[data-reveal]").forEach((item, i) => {
          setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0) scale(1)"; }, i * 100);
        });
        obs.disconnect();
      }
    }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return ref;
};

// ── Icons ─────────────────────────────────────────────────────
const ICONS = {
  star:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chart:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  handshake: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12V19A2 2 0 0119 21H5A2 2 0 013 19V5A2 2 0 015 3H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  code:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  shield:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 22S3 17 3 11V5L12 2L21 5V11C21 17 12 22 12 22Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bulb:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 21H15M12 3C8.69 3 6 5.69 6 9C6 11.22 7.21 13.17 9 14.2V17H15V14.2C16.79 13.17 18 11.22 18 9C18 5.69 15.31 3 12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

// ── Data ──────────────────────────────────────────────────────
const VALUES = [
  { id: 1, icon: "star",      title: "African Excellence",   desc: "We prove African technology companies can deliver world-class solutions while understanding local realities better than any international agency.", highlight: true  },
  { id: 2, icon: "chart",     title: "Results Over Trends",  desc: "We measure success by business outcomes — revenue growth, cost reduction, market expansion — not by how cutting-edge the technology is.",        highlight: false },
  { id: 3, icon: "handshake", title: "True Partnership",     desc: "We serve as your strategic technology partner, not just a vendor. Your success is our success, and we're accountable for measurable results.",     highlight: false },
  { id: 4, icon: "code",      title: "Technical Excellence", desc: "Enterprise-grade solutions architected to global standards while optimized for African infrastructure, connectivity, and payment ecosystems.",     highlight: false },
  { id: 5, icon: "shield",    title: "Transparency Always",  desc: "Clear communication, honest timelines, transparent pricing. No hidden costs, no vendor lock-in, no technical jargon — just partnership.",          highlight: false },
  { id: 6, icon: "bulb",      title: "Innovation & Learning",desc: "We stay at the forefront of AI, cloud technologies, and digital transformation trends to ensure our clients always have competitive advantage.",    highlight: false },
];

// Real African city nodes — coordinates as % of the PNG map image
// Map bounds: lon -22→55, lat 40→-38
const CITIES = [
  { name: "Douala",        x: 41.2, y: 46.2, hub: true  }, // AlphaWaves HQ — hub
  { name: "Lagos",         x: 33.0, y: 42.9, hub: false },
  { name: "Accra",         x: 28.3, y: 44.1, hub: false },
  { name: "Cairo",         x: 69.1, y: 12.7, hub: false },
  { name: "Nairobi",       x: 76.4, y: 52.9, hub: false },
  { name: "Johannesburg",  x: 64.9, y: 84.9, hub: false },
  { name: "Dakar",         x: 6.0,  y: 32.4, hub: false },
  { name: "Casablanca",    x: 18.7, y: 8.2,  hub: false },
  { name: "Addis Ababa",   x: 78.8, y: 39.7, hub: false },
];

// Connection pairs [from, to] by index
const CONNECTIONS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [0, 6], [0, 7], [0, 8],
  [1, 2], [3, 8], [4, 5],
];

// ── Glowing Africa Map (PNG base + SVG overlay) ───────────────
const AfricaMap = ({ mapSrc }) => {
  // SVG viewBox matches the PNG aspect ratio (1080x1080 = square)
  const W = 100, H = 100; // percentage-based viewBox

  return (
    <div style={{
      position: "absolute", right: -60, top: "2%",
      width: 480, height: 480,
      pointerEvents: "none", zIndex: 0,
      animation: "floatMap 9s ease-in-out infinite",
    }}>
      {/* PNG base — black bg removed via mix-blend-mode, tinted orange */}
      <img
        src={mapSrc}
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "contain",
          opacity: 0.18,
          filter: "sepia(1) saturate(3) hue-rotate(5deg) brightness(0.9)",
          mixBlendMode: "screen",
        }}
      />

      {/* SVG overlay — nodes + connections precisely on top of PNG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <filter id="nodeGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="1.2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {CONNECTIONS.map(([a, b], i) => (
          <line
            key={`conn-${i}`}
            x1={CITIES[a].x} y1={CITIES[a].y}
            x2={CITIES[b].x} y2={CITIES[b].y}
            stroke="#E8750A"
            strokeWidth="0.35"
            filter="url(#lineGlow)"
          >
            <animate
              attributeName="opacity"
              values="0.08;0.35;0.08"
              dur={`${3 + i * 0.6}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* City nodes */}
        {CITIES.map((city, i) => (
          <g key={`city-${i}`} filter="url(#nodeGlow)">
            {/* Outer pulse ring */}
            <circle cx={city.x} cy={city.y} r={city.hub ? 4 : 2.5} fill="none" stroke="#E8750A" strokeWidth="0.4">
              <animate attributeName="r"       values={city.hub ? "3;8;3"   : "2;5;2"}   dur={`${2.2 + i * 0.5}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.2 + i * 0.5}s`} repeatCount="indefinite"/>
            </circle>
            {/* Middle ring — hub only */}
            {city.hub && (
              <circle cx={city.x} cy={city.y} r="2" fill="none" stroke="#F5A623" strokeWidth="0.6">
                <animate attributeName="r"       values="1.5;3.5;1.5" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
              </circle>
            )}
            {/* Core dot */}
            <circle cx={city.x} cy={city.y} r={city.hub ? 1.8 : 1.1} fill={city.hub ? "#F5A623" : "#E8750A"}>
              <animate attributeName="opacity" values="0.7;1;0.7" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite"/>
            </circle>
          </g>
        ))}
      </svg>

      {/* Ambient orange glow behind map */}
      <div style={{
        position: "absolute", inset: "10%",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(232,117,10,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
    </div>
  );
};

// ── Value Card with per-card spotlight ────────────────────────
const ValueCard = ({ val, isMobile }) => {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  const handleMouseLeave = () => setSpotlight(s => ({ ...s, active: false }));

  return (
    <div
      data-reveal
      ref={cardRef}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      style={{
        position: "relative",
        padding: "28px 24px 24px",
        borderRadius: 16,
        background: MY_COLORS.bgSurface,
        border: `1px solid ${val.highlight ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        overflow: "hidden",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: spotlight.active ? "translateY(-5px)" : "translateY(0)",
        boxShadow: spotlight.active
          ? `0 16px 48px rgba(232,117,10,${val.highlight ? "0.18" : "0.10"})`
          : "none",
        cursor: "default",
        opacity: 0,
      }}
    >
      {/* ── Per-card spotlight overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 16,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(480px circle at ${spotlight.x}px ${spotlight.y}px, rgba(232,117,10,0.13), transparent 60%)`,
          zIndex: 0,
        }}
      />

      {/* ── Highlight border glow on hover ── */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16, pointerEvents: "none", zIndex: 0,
        boxShadow: spotlight.active ? `inset 0 0 0 1px rgba(232,117,10,${val.highlight ? "0.5" : "0.25"})` : "none",
        transition: "box-shadow 0.3s ease",
      }} />

      {/* ── Number watermark ── */}
      <span style={{
        position: "absolute", top: 12, right: 18,
        fontFamily: FONTS.primary, fontSize: 64, fontWeight: 900,
        color: MY_COLORS.orange, opacity: spotlight.active ? 0.1 : 0.04,
        lineHeight: 1, pointerEvents: "none", transition: "opacity 0.3s ease",
        zIndex: 0,
      }}>
        {String(val.id).padStart(2, "0")}
      </span>

      {/* ── Content (above overlays) ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Icon box */}
        <div style={{
          width: 46, height: 46, borderRadius: 12, marginBottom: 18,
          background: val.highlight || spotlight.active ? MY_COLORS.orangeDim : "rgba(255,255,255,0.04)",
          border: `1px solid ${val.highlight || spotlight.active ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: val.highlight || spotlight.active ? MY_COLORS.orange : MY_COLORS.textMuted,
          transition: "all 0.3s ease",
          transform: spotlight.active ? "rotate(8deg) scale(1.05)" : "rotate(0deg) scale(1)",
        }}>
          {ICONS[val.icon]}
        </div>

        <h3 style={{
          fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: 700,
          color: MY_COLORS.textPrimary, margin: "0 0 10px", lineHeight: 1.3,
        }}>
          {val.title}
        </h3>

        <p style={{
          fontFamily: FONTS.secondary, fontSize: FONTS.size.sm,
          lineHeight: "1.7", color: MY_COLORS.textMuted, margin: "0 0 18px",
        }}>
          {val.desc}
        </p>

        {/* Bottom bar — expands on hover */}
        <div style={{
          height: 3, borderRadius: 9999,
          background: MY_COLORS.gradientOrange,
          opacity: val.highlight ? 1 : 0.3,
          width: spotlight.active ? "100%" : 40,
          transition: "width 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
        }} />
      </div>
    </div>
  );
};

// ── Main Section ──────────────────────────────────────────────
const CoreValues = () => {
  const sectionRef = useScrollReveal(0.08);
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();

  const padding  = isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 40px";
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";
  const showMap  = !isMobile && !isTablet;

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgSection, padding, overflow: "hidden" }}>

      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      {/* Centre ambient glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(232,117,10,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

     

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 56 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange }}>Our Foundation</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,4vw,48px)", fontWeight: 800, color: MY_COLORS.textPrimary, margin: "0 auto 12px", maxWidth: 520, lineHeight: 1.15, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease 0.1s" }}>
            Core <span style={{ color: MY_COLORS.orange }}>Values</span>
          </h2>
          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 13 : FONTS.size.base, lineHeight: "1.7", color: MY_COLORS.textMuted, margin: "0 auto", maxWidth: 440, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease 0.2s" }}>
            Six principles that guide every decision, every project, every client relationship.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 12 : 20 }}>
          {VALUES.map(val => <ValueCard key={val.id} val={val} isMobile={isMobile} />)}
        </div>
      </div>

      <style>{`
        @keyframes floatMap {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-18px); }
        }
      `}</style>
    </section>
  );
};

export default CoreValues;