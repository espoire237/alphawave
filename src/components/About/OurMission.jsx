/**
 * MissionVision — About Page Section 3
 * AlphaWaves brand system
 *
 * Usage:
 * import MissionVision from "../components/sections/MissionVision";
 * <MissionVision />
 */

import { useEffect, useRef } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

// ── Scroll reveal hook ────────────────────────────────────────
const useScrollReveal = (threshold = 0.15) => {
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
              item.style.transform = "translateY(0) scale(1)";
            }, i * 150);
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

// ── Target icon (Mission) ────────────────────────────────────
const TargetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="14" cy="14" r="7"  stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="14" cy="14" r="3"  fill="currentColor"/>
    <line x1="14" y1="3"  x2="14" y2="0"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="14" y1="28" x2="14" y2="25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="3"  y1="14" x2="0"  y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="28" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ── Eye icon (Vision) ────────────────────────────────────────
const EyeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M2 14C2 14 6 6 14 6C22 6 26 14 26 14C26 14 22 22 14 22C6 22 2 14 2 14Z"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    />
    <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="14" cy="14" r="1.5" fill="currentColor"/>
  </svg>
);

// ── Card data ─────────────────────────────────────────────────
const CARDS = [
  {
    id:      "mission",
    icon:    <TargetIcon />,
    label:   "Mission",
    title:   "Our Mission",
    content: "To empower African businesses with world-class technology solutions that drive measurable growth, operational excellence, and competitive advantage in the global digital economy.",
    accent:  true, // orange card
  },
  {
    id:      "vision",
    icon:    <EyeIcon />,
    label:   "Vision",
    title:   "Our Vision",
    content: "To be Africa's leading technology partner, proving that African tech companies don't just match international standards — we exceed them where it matters most: delivering solutions that work in African market conditions and drive real business outcomes.",
    accent:  false, // dark card
  },
];

// ══════════════════════════════════════════════════════════════
// MissionVision Component
// ══════════════════════════════════════════════════════════════
const MissionVision = () => {
  const sectionRef = useScrollReveal(0.1);

  return (
    <section
      ref={sectionRef}
      style={{
        position:   "relative",
        background: MY_COLORS.bgBase,
        padding:    "100px 0",
        overflow:   "hidden",
      }}
    >

      {/* ── Background glow — center ── */}
      <div style={{
        position:      "absolute",
        top:           "50%",
        left:          "50%",
        transform:     "translate(-50%, -50%)",
        width:         800,
        height:        400,
        borderRadius:  "50%",
        background:    `radial-gradient(ellipse, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />

      {/* ── Subtle grid ── */}
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

        {/* ── Section header — center aligned ── */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>

          {/* Eyebrow */}
          <div
            data-reveal
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            10,
              marginBottom:   20,
              opacity:        0,
              transform:      "translateY(20px)",
              transition:     "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span style={{
              width:        28, height: 2,
              borderRadius: 9999,
              background:   MY_COLORS.gradientOrange,
            }} />
            <span style={{
              fontFamily:    FONTS.primary,
              fontSize:      FONTS.size.xs,
              fontWeight:    FONTS.weight.bold,
              letterSpacing: FONTS.tracking.widest,
              textTransform: "uppercase",
              color:         MY_COLORS.orange,
            }}>
              Purpose & Direction
            </span>
            <span style={{
              width:        28, height: 2,
              borderRadius: 9999,
              background:   MY_COLORS.gradientOrange,
            }} />
          </div>

          {/* Title */}
          <h2
            data-reveal
            style={{
              fontFamily:    FONTS.primary,
              fontSize:      "clamp(32px, 3.5vw, 48px)",
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
            Our Mission &{" "}
            <span style={{
              color:      MY_COLORS.orange,
              textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
            }}>
              Vision
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
              maxWidth:    520,
              margin:      "0 auto",
              opacity:     0,
              transform:   "translateY(20px)",
              transition:  "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            The purpose that drives every solution we build and every partnership we forge.
          </p>
        </div>

        {/* ── Cards ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 24,
          position:            "relative",
        }}>

          {/* Center divider line */}
          <div style={{
            position:      "absolute",
            left:          "50%",
            top:           40,
            bottom:        40,
            width:         1,
            background:    `linear-gradient(to bottom, transparent, ${MY_COLORS.orangeBorder}, transparent)`,
            pointerEvents: "none",
            transform:     "translateX(-50%)",
          }} />

          {CARDS.map((card, index) => (
            <div
              key={card.id}
              data-reveal
              style={{
                position:     "relative",
                padding:      "48px 44px",
                borderRadius: 20,
                background:   card.accent
                  ? `linear-gradient(135deg, rgba(232,117,10,0.12) 0%, rgba(232,117,10,0.04) 100%)`
                  : MY_COLORS.bgSurface,
                border:       `1px solid ${card.accent ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
                overflow:     "hidden",
                transition:   "transform 0.3s ease, box-shadow 0.3s ease",
                opacity:      0,
                transform:    "translateY(30px) scale(0.98)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform  = "translateY(-4px) scale(1)";
                e.currentTarget.style.boxShadow  = card.accent
                  ? `0 20px 60px rgba(232,117,10,0.2)`
                  : `0 20px 60px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform  = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow  = "none";
              }}
            >

              {/* Corner glow for accent card */}
              {card.accent && (
                <div style={{
                  position:      "absolute",
                  top:           -60,
                  right:         -60,
                  width:         200,
                  height:        200,
                  borderRadius:  "50%",
                  background:    `radial-gradient(circle, rgba(232,117,10,0.2) 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />
              )}

              {/* Icon */}
              <div style={{
                width:          56,
                height:         56,
                borderRadius:   14,
                background:     card.accent ? MY_COLORS.orangeDim : MY_COLORS.bgSurfaceHover,
                border:         `1px solid ${card.accent ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                color:          MY_COLORS.orange,
                marginBottom:   32,
              }}>
                {card.icon}
              </div>

              {/* Label pill */}
              <div style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            6,
                padding:        "4px 12px",
                borderRadius:   9999,
                background:     MY_COLORS.orangeDim,
                border:         `1px solid ${MY_COLORS.orangeBorder}`,
                marginBottom:   16,
              }}>
                <span style={{
                  fontFamily:    FONTS.primary,
                  fontSize:      FONTS.size.xs,
                  fontWeight:    FONTS.weight.bold,
                  letterSpacing: FONTS.tracking.wider,
                  textTransform: "uppercase",
                  color:         MY_COLORS.orange,
                }}>
                  {card.label}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily:    FONTS.primary,
                fontSize:      "clamp(22px, 2vw, 28px)",
                fontWeight:    FONTS.weight.extrabold,
                letterSpacing: FONTS.tracking.tight,
                lineHeight:    FONTS.leading.snug,
                color:         MY_COLORS.textPrimary,
                margin:        "0 0 20px 0",
              }}>
                {card.title}
              </h3>

              {/* Divider */}
              <div style={{
                width:        48,
                height:       2,
                borderRadius: 9999,
                background:   MY_COLORS.gradientOrange,
                marginBottom: 20,
              }} />

              {/* Content */}
              <p style={{
                fontFamily:  FONTS.secondary,
                fontSize:    FONTS.size.base,
                fontWeight:  FONTS.weight.regular,
                lineHeight:  FONTS.leading.relaxed,
                color:       MY_COLORS.textSecondary,
                margin:      0,
              }}>
                {card.content}
              </p>

              {/* Bottom accent line for mission card */}
              {card.accent && (
                <div style={{
                  position:     "absolute",
                  bottom:       0,
                  left:         0,
                  right:        0,
                  height:       3,
                  borderRadius: "0 0 20px 20px",
                  background:   MY_COLORS.gradientOrange,
                  opacity:      0.6,
                }} />
              )}

            </div>
          ))}

        </div>

        {/* ── Bottom quote ── */}
        <div
          data-reveal
          style={{
            textAlign:    "center",
            marginTop:    64,
            padding:      "40px 48px",
            borderRadius: 16,
            background:   MY_COLORS.bgSurface,
            border:       `1px solid ${MY_COLORS.border}`,
            position:     "relative",
            overflow:     "hidden",
            opacity:      0,
            transform:    "translateY(20px)",
            transition:   "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Quote mark */}
          <div style={{
            position:    "absolute",
            top:         16,
            left:        32,
            fontFamily:  FONTS.primary,
            fontSize:    120,
            fontWeight:  FONTS.weight.extrabold,
            color:       MY_COLORS.orangeDim,
            lineHeight:  1,
            userSelect:  "none",
            pointerEvents: "none",
          }}>
            "
          </div>

          <p style={{
            fontFamily:    FONTS.primary,
            fontSize:      "clamp(16px, 2vw, 22px)",
            fontWeight:    FONTS.weight.semibold,
            letterSpacing: FONTS.tracking.tight,
            lineHeight:    FONTS.leading.normal,
            color:         MY_COLORS.textPrimary,
            margin:        "0 0 16px 0",
            position:      "relative",
            maxWidth:      700,
            marginLeft:    "auto",
            marginRight:   "auto",
          }}>
            African tech companies don't just match international standards — we{" "}
            <span style={{ color: MY_COLORS.orange }}>exceed them</span> where it matters most.
          </p>

          <span style={{
            fontFamily:    FONTS.secondary,
            fontSize:      FONTS.size.sm,
            fontWeight:    FONTS.weight.medium,
            color:         MY_COLORS.textMuted,
            letterSpacing: FONTS.tracking.wider,
            textTransform: "uppercase",
          }}>
            AlphaWaves — Core Belief
          </span>
        </div>

      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .mv-grid {
            grid-template-columns: 1fr !important;
          }
          .mv-divider {
            display: none !important;
          }
          .mv-section {
            padding: 64px 0 !important;
          }
          .mv-card {
            padding: 32px 24px !important;
          }
          .mv-quote {
            padding: 32px 24px !important;
          }
        }
      `}</style>

    </section>
  );
};

export default MissionVision;