/**
 * OurStory About Page Section 2
 * AlphaWaves brand system FULLY RESPONSIVE
 */

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import map from "../../assets/icons/africa_map.png";

// ── Scroll-triggered animation hook ──────────────────────────
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll("[data-reveal]");
          items.forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0) translateX(0)";
            }, i * 120);
          });
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

// ── Stats values (numbers don't change) ──────────────────────
const STAT_VALUES = ["50+", "20+", "8+", "100%"];

// ── Africa map city nodes ─────────────────────────────────────
const CITIES = [
  { name: "Douala",       x: 41.2, y: 46.2, hub: true  },
  { name: "Lagos",        x: 33.0, y: 42.9, hub: false },
  { name: "Accra",        x: 28.3, y: 44.1, hub: false },
  { name: "Cairo",        x: 69.1, y: 12.7, hub: false },
  { name: "Nairobi",      x: 76.4, y: 52.9, hub: false },
  { name: "Johannesburg", x: 64.9, y: 84.9, hub: false },
  { name: "Dakar",        x: 6.0,  y: 32.4, hub: false },
  { name: "Casablanca",   x: 18.7, y: 8.2,  hub: false },
  { name: "Addis Ababa",  x: 78.8, y: 39.7, hub: false },
];

const CONNECTIONS = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[1,2],[3,8],[4,5],[2,6],
];

const AfricaMapOverlay = ({ isTablet }) => (
  <div style={{
    position: "absolute",
    right: isTablet ? 160 : -10,
    top: isTablet ? "40%" : "40%",
    transform: "translateY(-50%)",
    width: isTablet ? 420 : 520,
    height: isTablet ? 420 : 520,
    pointerEvents: "none",
    zIndex: 0,
    animation: "floatMap 10s ease-in-out infinite",
  }}>
    <img src={map} alt="" style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      objectFit: "contain", opacity: 0.13,
      filter: "sepia(1) saturate(4) hue-rotate(5deg) brightness(0.85)",
      mixBlendMode: "screen",
    }} />
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <filter id="storyNodeGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="1.0" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="storyLineGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {CONNECTIONS.map(([a, b], i) => (
        <line key={`l-${i}`} x1={CITIES[a].x} y1={CITIES[a].y} x2={CITIES[b].x} y2={CITIES[b].y}
          stroke="#E8750A" strokeWidth="0.3" filter="url(#storyLineGlow)">
          <animate attributeName="opacity" values="0.06;0.32;0.06" dur={`${3.2 + i * 0.55}s`} repeatCount="indefinite"/>
        </line>
      ))}
      {CITIES.map((city, i) => (
        <g key={`n-${i}`} filter="url(#storyNodeGlow)">
          <circle cx={city.x} cy={city.y} r="3" fill="none" stroke="#E8750A" strokeWidth="0.4">
            <animate attributeName="r" values={city.hub ? "2.5;7;2.5" : "1.8;5;1.8"} dur={`${2.4 + i * 0.45}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.4 + i * 0.45}s`} repeatCount="indefinite"/>
          </circle>
          {city.hub && (
            <circle cx={city.x} cy={city.y} r="2" fill="none" stroke="#F5A623" strokeWidth="0.5">
              <animate attributeName="r" values="1.5;3.5;1.5" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.2s" repeatCount="indefinite"/>
            </circle>
          )}
          <circle cx={city.x} cy={city.y} r={city.hub ? 1.6 : 1.0} fill={city.hub ? "#F5A623" : "#E8750A"}>
            <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite"/>
          </circle>
          {city.hub && (
            <text x={city.x + 2.5} y={city.y - 2.5} fill="#F5A623" fontSize="3.2"
              fontWeight="700" fontFamily="sans-serif" opacity="0.75">Douala</text>
          )}
        </g>
      ))}
    </svg>
    <div style={{
      position: "absolute", inset: "15%", borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(232,117,10,0.07) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />
  </div>
);

// ══════════════════════════════════════════════════════════════
const OurStory = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();
  const sectionRef = useScrollReveal(0.1);

  // ✅ Arrays with t() defined inside the component
  const PARAGRAPHS = [
    { id: 1, label: t("ourStory.paragraphs.whoWeAre.label"),    text: t("ourStory.paragraphs.whoWeAre.text")    },
    { id: 2, label: t("ourStory.paragraphs.ourExpertise.label"), text: t("ourStory.paragraphs.ourExpertise.text") },
    { id: 3, label: t("ourStory.paragraphs.ourPosition.label"),  text: t("ourStory.paragraphs.ourPosition.text")  },
    { id: 4, label: t("ourStory.paragraphs.ourApproach.label"),  text: t("ourStory.paragraphs.ourApproach.text")  },
  ];

  const STATS = [
    { value: "50+",  label: t("ourStory.stats.projects")     },
    { value: "20+",  label: t("ourStory.stats.clients")      },
    { value: "8+",   label: t("ourStory.stats.experience")   },
    { value: "100%", label: t("ourStory.stats.satisfaction") },
  ];

  const isSingleCol   = isMobile || isTablet;
  const sectionPadY   = isMobile ? "64px" : isTablet ? "80px" : "100px";
  const outerPadX     = isMobile ? "20px" : isTablet ? "32px" : "40px";
  const gridCols      = isSingleCol ? "1fr" : isLargeTablet ? "1fr 1.4fr" : "1fr 1.6fr";
  const gridGap       = isMobile ? 40 : isTablet ? 48 : isLargeTablet ? 60 : 80;
  const h2Size        = isMobile ? "clamp(26px,7vw,36px)" : isTablet ? "clamp(28px,4vw,40px)" : "clamp(32px,3.5vw,48px)";
  const paraFontSize  = isMobile ? FONTS.size.sm : FONTS.size.md;
  const statValueSize = isMobile ? "clamp(20px,5vw,26px)" : "clamp(22px,2.5vw,30px)";
  const statPad       = isMobile ? "14px 12px" : "20px 16px";
  const paraInitTransform = isSingleCol ? "translateY(24px)" : "translateX(30px)";

  return (
    <section ref={sectionRef} style={{
      position: "relative", background: MY_COLORS.bgSection,
      padding: `${sectionPadY} 0`, overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: -150, right: -150,
        width: isMobile ? 300 : 600, height: isMobile ? 300 : 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />

      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none",
      }} />

      {!isSingleCol && <AfricaMapOverlay isTablet={isTablet} />}

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${outerPadX}`, position: "relative", zIndex: 1, boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: gridGap, alignItems: "start" }}>

          {/* ══ LEFT COLUMN ══ */}
          <div style={{ position: isSingleCol ? "static" : "sticky", top: 120 }}>
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
              <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange, flexShrink: 0 }} />
              <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>
                {t("ourStory.eyebrow")}
              </span>
            </div>

            <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: h2Size, fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, lineHeight: FONTS.leading.snug, color: MY_COLORS.textPrimary, margin: "0 0 24px 0", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
              {t("ourStory.titlePart1")}{" "}
              <span style={{ color: MY_COLORS.orange, textShadow: `0 0 30px ${MY_COLORS.orangeGlow}` }}>
                {t("ourStory.titlePart2")}
              </span>
            </h2>

            <div data-reveal style={{ width: 2, height: 60, background: MY_COLORS.gradientOrange, borderRadius: 9999, marginBottom: 24, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }} />

            <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? FONTS.size.sm : FONTS.size.base, fontWeight: FONTS.weight.regular, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textMuted, margin: 0, maxWidth: isSingleCol ? "100%" : 340, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
              {t("ourStory.subtitle")}
            </p>

            {/* Stats grid */}
            <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 10 : 16, marginTop: isMobile ? 28 : 40, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease", maxWidth: isSingleCol ? (isMobile ? "100%" : 480) : "100%" }}>
              {STATS.map((stat) => (
                <div key={stat.label} style={{ padding: statPad, borderRadius: 12, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, transition: "border-color 0.25s ease, transform 0.25s ease", cursor: "default", boxSizing: "border-box" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontFamily: FONTS.primary, fontSize: statValueSize, fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, color: MY_COLORS.orange, lineHeight: 1, marginBottom: 6 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 10 : FONTS.size.xs, fontWeight: FONTS.weight.medium, color: MY_COLORS.textMuted, lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT COLUMN paragraphs ══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PARAGRAPHS.map((para, index) => (
              <div key={para.id} data-reveal style={{ position: "relative", paddingBottom: index < PARAGRAPHS.length - 1 ? (isMobile ? 32 : 48) : 0, opacity: 0, transform: paraInitTransform, transition: "opacity 0.6s ease, transform 0.6s ease" }}>
                {index < PARAGRAPHS.length - 1 && (
                  <div style={{ position: "absolute", left: 13, top: 30, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${MY_COLORS.orangeBorder}, transparent)` }} />
                )}
                <div style={{ display: "flex", alignItems: "flex-start", gap: isMobile ? 14 : 20 }}>
                  <div style={{ width: isMobile ? 26 : 28, height: isMobile ? 26 : 28, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, color: MY_COLORS.orange, lineHeight: 1 }}>
                      {String(para.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.wider, textTransform: "uppercase", color: MY_COLORS.orange, display: "block", marginBottom: 10 }}>
                      {para.label}
                    </span>
                    <p style={{ fontFamily: FONTS.secondary, fontSize: paraFontSize, fontWeight: FONTS.weight.regular, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textSecondary, margin: 0 }}>
                      {para.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatMap {
          0%, 100% { transform: translateY(calc(-50% + 0px));  }
          50%       { transform: translateY(calc(-50% - 18px)); }
        }
      `}</style>
    </section>
  );
};

export default OurStory;