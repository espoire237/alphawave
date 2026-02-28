/**
 * WhyCameroon — About Page Section 6
 * AlphaWaves brand system
 *
 * Usage:
 * import WhyCameroon from "../components/sections/WhyCameroon";
 * <WhyCameroon />
 */

import { useEffect, useRef, useState } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

// ── Scroll reveal hook ────────────────────────────────────────
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
              item.style.opacity   = "1";
              item.style.transform = "translateY(0)";
            }, i * 130);
          });
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

// ── Globe icon ────────────────────────────────────────────────
const GlobeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M2 13H24M13 2C10 6 8 9.5 8 13C8 16.5 10 20 13 24M13 2C16 6 18 9.5 18 13C18 16.5 16 20 13 24"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ── Network icon ──────────────────────────────────────────────
const NetworkIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <circle cx="13" cy="5"  r="3" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="5"  cy="21" r="3" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="21" cy="21" r="3" stroke="currentColor" strokeWidth="1.8"/>
    <line x1="13" y1="8"  x2="5"  y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="13" y1="8"  x2="21" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="8"  y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ── Building icon ─────────────────────────────────────────────
const BuildingIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect x="3" y="10" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M8 10V7C8 5.34 10.24 4 13 4C15.76 4 18 5.34 18 7V10"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="13" y1="14" x2="13" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="9"  y1="17" x2="17" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ── Columns data ──────────────────────────────────────────────
const COLUMNS = [
  {
    id:       1,
    icon:     <GlobeIcon />,
    headline: "Bilingual by Nature",
    content:  "Operating in both French and English gives us unique access to Francophone West/Central Africa and Anglophone markets — covering 500+ million people across the continent.",
    stat:     "500M+",
    statLabel:"People Reached",
    highlight: true,
  },
  {
    id:       2,
    icon:     <NetworkIcon />,
    headline: "Regional Hub",
    content:  "Cameroon's strategic position connects us to major African markets: Nigeria, Gabon, Chad, CAR, Equatorial Guinea, and the broader CEMAC/ECOWAS regions.",
    stat:     "10+",
    statLabel:"Connected Markets",
    highlight: false,
  },
  {
    id:       3,
    icon:     <BuildingIcon />,
    headline: "Real-World Testing",
    content:  "Building in Cameroon means our solutions are tested against real African infrastructure challenges — connectivity, payments, power — ensuring they work everywhere on the continent.",
    stat:     "100%",
    statLabel:"Africa-Ready",
    highlight: false,
  },
];

// ── Column Card ───────────────────────────────────────────────
const ColumnCard = ({ col }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     "relative",
        padding:      "44px 36px",
        borderRadius: 20,
        background:   col.highlight
          ? `linear-gradient(145deg, rgba(232,117,10,0.1) 0%, rgba(232,117,10,0.04) 100%)`
          : MY_COLORS.bgSurface,
        border:       `1px solid ${hovered || col.highlight ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        overflow:     "hidden",
        transition:   "all 0.3s ease",
        transform:    hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow:    hovered ? `0 24px 56px rgba(0,0,0,0.35)` : "none",
        cursor:       "default",
        opacity:      0,
      }}
    >

      {/* Top gradient bar */}
      <div style={{
        position:     "absolute",
        top:          0, left: 0, right: 0,
        height:       2,
        borderRadius: "20px 20px 0 0",
        background:   MY_COLORS.gradientOrange,
        opacity:      hovered || col.highlight ? 1 : 0,
        transition:   "opacity 0.3s ease",
      }} />

      {/* Background map outline — decorative */}
      <div style={{
        position:      "absolute",
        bottom:        -20,
        right:         -20,
        width:         120,
        height:        120,
        opacity:       0.04,
        pointerEvents: "none",
        fontSize:      120,
        lineHeight:    1,
        userSelect:    "none",
      }}>
        🌍
      </div>

      {/* Icon */}
      <div style={{
        width:          54,
        height:         54,
        borderRadius:   14,
        background:     hovered ? MY_COLORS.orangeDim : MY_COLORS.bgSurfaceHover,
        border:         `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        color:          MY_COLORS.orange,
        marginBottom:   28,
        transition:     "all 0.3s ease",
        boxShadow:      hovered ? `0 0 20px ${MY_COLORS.orangeGlow}` : "none",
      }}>
        {col.icon}
      </div>

      {/* Headline */}
      <h3 style={{
        fontFamily:    FONTS.primary,
        fontSize:      "clamp(20px, 2vw, 24px)",
        fontWeight:    FONTS.weight.bold,
        letterSpacing: FONTS.tracking.tight,
        color:         hovered ? MY_COLORS.orange : MY_COLORS.textPrimary,
        margin:        "0 0 16px 0",
        transition:    "color 0.3s ease",
      }}>
        {col.headline}
      </h3>

      {/* Divider */}
      <div style={{
        width:        hovered ? 44 : 28,
        height:       2,
        borderRadius: 9999,
        background:   MY_COLORS.gradientOrange,
        marginBottom: 16,
        transition:   "width 0.3s ease",
      }} />

      {/* Content */}
      <p style={{
        fontFamily:   FONTS.secondary,
        fontSize:     FONTS.size.base,
        fontWeight:   FONTS.weight.regular,
        lineHeight:   FONTS.leading.relaxed,
        color:        MY_COLORS.textSecondary,
        margin:       "0 0 28px 0",
      }}>
        {col.content}
      </p>

      {/* Stat */}
      <div style={{
        display:      "flex",
        alignItems:   "center",
        gap:          12,
        paddingTop:   20,
        borderTop:    `1px solid ${MY_COLORS.border}`,
      }}>
        <span style={{
          fontFamily:    FONTS.primary,
          fontSize:      "clamp(24px, 2.5vw, 32px)",
          fontWeight:    FONTS.weight.extrabold,
          letterSpacing: FONTS.tracking.tight,
          color:         MY_COLORS.orange,
          lineHeight:    1,
        }}>
          {col.stat}
        </span>
        <span style={{
          fontFamily:  FONTS.secondary,
          fontSize:    FONTS.size.sm,
          fontWeight:  FONTS.weight.medium,
          color:       MY_COLORS.textMuted,
          lineHeight:  1.3,
        }}>
          {col.statLabel}
        </span>
      </div>

    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// WhyCameroon Component
// ══════════════════════════════════════════════════════════════
const WhyCameroon = () => {
  const sectionRef = useScrollReveal(0.08);

  return (
    <section
      ref={sectionRef}
      style={{
        position:   "relative",
        background: MY_COLORS.bgSection,
        padding:    "100px 0",
        overflow:   "hidden",
      }}
    >

      {/* ── Background glow — center bottom ── */}
      <div style={{
        position:      "absolute",
        bottom:        -300,
        left:          "50%",
        transform:     "translateX(-50%)",
        width:         900,
        height:        600,
        borderRadius:  "50%",
        background:    `radial-gradient(ellipse, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />

      {/* ── Grid texture ── */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
        `,
        backgroundSize:  "60px 60px",
        pointerEvents:   "none",
      }} />

      <div style={{
        maxWidth: 1280,
        margin:   "0 auto",
        padding:  "0 40px",
        position: "relative",
      }}>

        {/* ── Section header — centered ── */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>

          {/* Cameroon flag colors bar */}
          <div
            data-reveal
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            6,
              marginBottom:   24,
              opacity:        0,
              transform:      "translateY(20px)",
              transition:     "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {/* 🇨🇲 flag stripe colors */}
            {["#007A5E", "#CE1126", "#FCD116"].map((color, i) => (
              <div key={i} style={{
                width:        20,
                height:       3,
                borderRadius: 9999,
                background:   color,
              }} />
            ))}
            <span style={{
              fontFamily:    FONTS.primary,
              fontSize:      FONTS.size.xs,
              fontWeight:    FONTS.weight.bold,
              letterSpacing: FONTS.tracking.widest,
              textTransform: "uppercase",
              color:         MY_COLORS.orange,
              marginLeft:    6,
            }}>
              Made in Cameroon 🇨🇲
            </span>
            {["#FCD116", "#CE1126", "#007A5E"].map((color, i) => (
              <div key={i} style={{
                width:        20,
                height:       3,
                borderRadius: 9999,
                background:   color,
              }} />
            ))}
          </div>

          {/* Title */}
          <h2
            data-reveal
            style={{
              fontFamily:    FONTS.primary,
              fontSize:      "clamp(28px, 3.5vw, 48px)",
              fontWeight:    FONTS.weight.extrabold,
              letterSpacing: FONTS.tracking.tight,
              lineHeight:    FONTS.leading.snug,
              color:         MY_COLORS.textPrimary,
              margin:        "0 0 16px 0",
              opacity:       0,
              transform:     "translateY(20px)",
              transition:    "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Why{" "}
            <span style={{
              color:      MY_COLORS.orange,
              textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
            }}>
              Cameroon?
            </span>
          </h2>

          {/* Subtitle */}
          <p
            data-reveal
            style={{
              fontFamily:  FONTS.secondary,
              fontSize:    FONTS.size.md,
              fontWeight:  FONTS.weight.regular,
              lineHeight:  FONTS.leading.relaxed,
              color:       MY_COLORS.textMuted,
              maxWidth:    560,
              margin:      "0 auto",
              opacity:     0,
              transform:   "translateY(20px)",
              transition:  "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Strategically positioned at the heart of Francophone and Anglophone Africa — our origin is our advantage.
          </p>

        </div>

        {/* ── 3 Column cards ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 24,
          marginBottom:        64,
        }}>
          {COLUMNS.map((col) => (
            <ColumnCard key={col.id} col={col} />
          ))}
        </div>

        {/* ── Bottom banner — Africa's bilingual hub ── */}
        <div
          data-reveal
          style={{
            position:     "relative",
            padding:      "48px 56px",
            borderRadius: 20,
            background:   `linear-gradient(105deg, rgba(232,117,10,0.1) 0%, rgba(232,117,10,0.04) 50%, transparent 100%)`,
            border:       `1px solid ${MY_COLORS.orangeBorder}`,
            overflow:     "hidden",
            display:      "flex",
            alignItems:   "center",
            justifyContent:"space-between",
            gap:          40,
            flexWrap:     "wrap",
            opacity:      0,
            transform:    "translateY(20px)",
            transition:   "opacity 0.6s ease, transform 0.6s ease",
          }}
        >

          {/* Glow */}
          <div style={{
            position:      "absolute",
            left:          -100,
            top:           "50%",
            transform:     "translateY(-50%)",
            width:         300,
            height:        300,
            borderRadius:  "50%",
            background:    `radial-gradient(circle, rgba(232,117,10,0.12) 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", flex: 1, minWidth: 280 }}>
            <div style={{
              fontFamily:    FONTS.primary,
              fontSize:      FONTS.size.xs,
              fontWeight:    FONTS.weight.bold,
              letterSpacing: FONTS.tracking.widest,
              textTransform: "uppercase",
              color:         MY_COLORS.orange,
              marginBottom:  12,
            }}>
              Africa's Bilingual Tech Hub
            </div>
            <h3 style={{
              fontFamily:    FONTS.primary,
              fontSize:      "clamp(20px, 2.5vw, 28px)",
              fontWeight:    FONTS.weight.extrabold,
              letterSpacing: FONTS.tracking.tight,
              color:         MY_COLORS.textPrimary,
              margin:        "0 0 12px 0",
              lineHeight:    FONTS.leading.snug,
            }}>
              Two languages. One continent.{" "}
              <span style={{ color: MY_COLORS.orange }}>Unlimited reach.</span>
            </h3>
            <p style={{
              fontFamily:  FONTS.secondary,
              fontSize:    FONTS.size.base,
              color:       MY_COLORS.textSecondary,
              margin:      0,
              lineHeight:  FONTS.leading.relaxed,
              maxWidth:    480,
            }}>
              English and French fluency isn't just a communication advantage — it's a market access strategy that opens doors across the entire African continent.
            </p>
          </div>

          {/* Language pills */}
          <div style={{
            display:        "flex",
            flexDirection:  "column",
            gap:            12,
            position:       "relative",
          }}>
            {[
              { lang: "English", markets: "Anglophone Africa", flag: "🇬🇧" },
              { lang: "Français", markets: "Afrique Francophone", flag: "🇫🇷" },
            ].map((item) => (
              <div
                key={item.lang}
                style={{
                  padding:      "16px 24px",
                  borderRadius: 12,
                  background:   MY_COLORS.bgSurface,
                  border:       `1px solid ${MY_COLORS.border}`,
                  display:      "flex",
                  alignItems:   "center",
                  gap:          14,
                  minWidth:     220,
                }}
              >
                <span style={{ fontSize: 24 }}>{item.flag}</span>
                <div>
                  <div style={{
                    fontFamily:  FONTS.primary,
                    fontSize:    FONTS.size.base,
                    fontWeight:  FONTS.weight.bold,
                    color:       MY_COLORS.textPrimary,
                    marginBottom: 2,
                  }}>
                    {item.lang}
                  </div>
                  <div style={{
                    fontFamily: FONTS.secondary,
                    fontSize:   FONTS.size.xs,
                    color:      MY_COLORS.textMuted,
                  }}>
                    {item.markets}
                  </div>
                </div>
                {/* Orange dot */}
                <div style={{
                  width:        8,
                  height:       8,
                  borderRadius: "50%",
                  background:   MY_COLORS.orange,
                  marginLeft:   "auto",
                  boxShadow:    `0 0 8px ${MY_COLORS.orangeGlow}`,
                }} />
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 900px) {
          .cameroon-grid {
            grid-template-columns: 1fr !important;
          }
          .cameroon-banner {
            flex-direction: column !important;
            padding: 32px 24px !important;
          }
        }
        @media (max-width: 640px) {
          .cameroon-section { padding: 64px 0 !important; }
        }
      `}</style>

    </section>
  );
};

export default WhyCameroon;