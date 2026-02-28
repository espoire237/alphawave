/**
 * OurCommitment — About Page Section 9
 * AlphaWaves brand system
 *
 * Usage:
 * import OurCommitment from "../components/sections/OurCommitment";
 * <OurCommitment />
 */

import { useEffect, useRef } from "react";
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

// ── Commitment points ─────────────────────────────────────────
const COMMITMENTS = [
  {
    id:      1,
    heading: "We Exceed Standards",
    text:    "Every project proves that African technology companies don't just match international standards — we exceed them where it matters most: delivering solutions that actually work in African market conditions.",
  },
  {
    id:      2,
    heading: "We Measure Your Success",
    text:    "We measure success by your business outcomes: revenue growth, cost reduction, market expansion, operational efficiency. When our clients dominate their markets, we've delivered the value that matters.",
  },
  {
    id:      3,
    heading: "We Grow With You",
    text:    "From Cameroonian startups to pan-African enterprises to international corporations entering African markets — AlphaWaves is your strategic technology partner for digital transformation that drives measurable competitive advantage.",
  },
];

// ══════════════════════════════════════════════════════════════
// OurCommitment Component
// ══════════════════════════════════════════════════════════════
const OurCommitment = () => {
  const sectionRef = useScrollReveal(0.1);

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

      {/* ── Large background glow center ── */}
      <div style={{
        position:      "absolute",
        top:           "50%",
        left:          "50%",
        transform:     "translate(-50%, -50%)",
        width:         1000,
        height:        600,
        borderRadius:  "50%",
        background:    `radial-gradient(ellipse, rgba(232,117,10,0.07) 0%, transparent 65%)`,
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

        {/* ── Top eyebrow + main statement ── */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>

          <div
            data-reveal
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            10,
              marginBottom:   24,
              opacity:        0,
              transform:      "translateY(20px)",
              transition:     "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span style={{
              width: 28, height: 2,
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
              Our Promise
            </span>
            <span style={{
              width: 28, height: 2,
              borderRadius: 9999,
              background:   MY_COLORS.gradientOrange,
            }} />
          </div>

          <h2
            data-reveal
            style={{
              fontFamily:    FONTS.primary,
              fontSize:      "clamp(32px, 4vw, 56px)",
              fontWeight:    FONTS.weight.extrabold,
              letterSpacing: FONTS.tracking.tight,
              lineHeight:    FONTS.leading.snug,
              color:         MY_COLORS.textPrimary,
              margin:        "0 0 24px 0",
              opacity:       0,
              transform:     "translateY(20px)",
              transition:    "opacity 0.6s ease, transform 0.6s ease",
              maxWidth:      760,
              marginLeft:    "auto",
              marginRight:   "auto",
            }}
          >
            Our Commitment{" "}
            <span style={{
              color:      MY_COLORS.orange,
              textShadow: `0 0 40px ${MY_COLORS.orangeGlow}`,
            }}>
              To You
            </span>
          </h2>

          {/* Main statement */}
          <p
            data-reveal
            style={{
              fontFamily:    FONTS.primary,
              fontSize:      "clamp(18px, 2.2vw, 24px)",
              fontWeight:    FONTS.weight.semibold,
              letterSpacing: FONTS.tracking.tight,
              lineHeight:    FONTS.leading.normal,
              color:         MY_COLORS.textSecondary,
              margin:        "0 auto",
              maxWidth:      680,
              opacity:       0,
              transform:     "translateY(20px)",
              transition:    "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            We're building Africa's digital future —{" "}
            <span style={{ color: MY_COLORS.orange }}>
              one transformative solution at a time.
            </span>
          </p>

        </div>

        {/* ── 3 commitment cards ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 24,
          marginBottom:        72,
        }}>
          {COMMITMENTS.map((item, index) => (
            <div
              key={item.id}
              data-reveal
              style={{
                position:     "relative",
                padding:      "40px 36px",
                borderRadius: 16,
                background:   MY_COLORS.bgSurface,
                border:       `1px solid ${MY_COLORS.border}`,
                overflow:     "hidden",
                opacity:      0,
                transform:    "translateY(30px)",
                transition:   "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = MY_COLORS.orangeBorder;
                e.currentTarget.style.boxShadow   = `0 20px 48px rgba(0,0,0,0.3)`;
                e.currentTarget.style.transform   = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = MY_COLORS.border;
                e.currentTarget.style.boxShadow   = "none";
                e.currentTarget.style.transform   = "translateY(0)";
              }}
            >

              {/* Top accent */}
              <div style={{
                position:     "absolute",
                top: 0, left: 0, right: 0,
                height:       2,
                background:   MY_COLORS.gradientOrange,
                opacity:      index === 0 ? 1 : 0.3,
                borderRadius: "16px 16px 0 0",
                transition:   "opacity 0.3s ease",
              }} />

              {/* Large number */}
              <div style={{
                fontFamily:  FONTS.primary,
                fontSize:    72,
                fontWeight:  FONTS.weight.extrabold,
                color:       MY_COLORS.orangeDim,
                lineHeight:  1,
                marginBottom: 20,
                userSelect:  "none",
              }}>
                {String(item.id).padStart(2, "0")}
              </div>

              {/* Heading */}
              <h3 style={{
                fontFamily:    FONTS.primary,
                fontSize:      FONTS.size.lg,
                fontWeight:    FONTS.weight.bold,
                letterSpacing: FONTS.tracking.tight,
                color:         MY_COLORS.textPrimary,
                margin:        "0 0 8px 0",
                lineHeight:    FONTS.leading.snug,
              }}>
                {item.heading}
              </h3>

              {/* Divider */}
              <div style={{
                width:        36,
                height:       2,
                borderRadius: 9999,
                background:   MY_COLORS.gradientOrange,
                marginBottom: 16,
              }} />

              {/* Text */}
              <p style={{
                fontFamily:  FONTS.secondary,
                fontSize:    FONTS.size.base,
                fontWeight:  FONTS.weight.regular,
                lineHeight:  FONTS.leading.relaxed,
                color:       MY_COLORS.textSecondary,
                margin:      0,
              }}>
                {item.text}
              </p>

            </div>
          ))}
        </div>

        {/* ── Bottom full-width statement banner ── */}
        <div
          data-reveal
          style={{
            position:     "relative",
            padding:      "64px 80px",
            borderRadius: 24,
            background:   `linear-gradient(105deg,
              rgba(232,117,10,0.12) 0%,
              rgba(232,117,10,0.06) 40%,
              rgba(10,10,10,0.8) 100%
            )`,
            border:       `1px solid ${MY_COLORS.orangeBorder}`,
            overflow:     "hidden",
            textAlign:    "center",
            opacity:      0,
            transform:    "translateY(30px)",
            transition:   "opacity 0.6s ease, transform 0.6s ease",
          }}
        >

          {/* Animated glow orb */}
          <div style={{
            position:      "absolute",
            top:           "50%",
            left:          "50%",
            transform:     "translate(-50%, -50%)",
            width:         400,
            height:        400,
            borderRadius:  "50%",
            background:    `radial-gradient(circle, rgba(232,117,10,0.15) 0%, transparent 65%)`,
            pointerEvents: "none",
            animation:     "commitmentPulse 4s ease-in-out infinite",
          }} />

          {/* Decorative corner lines */}
          {[
            { top: 20, left: 20, rotate: 0 },
            { top: 20, right: 20, rotate: 90 },
            { bottom: 20, left: 20, rotate: 270 },
            { bottom: 20, right: 20, rotate: 180 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width:    24,
                height:   24,
                ...pos,
                borderTop:  `2px solid ${MY_COLORS.orangeBorder}`,
                borderLeft: `2px solid ${MY_COLORS.orangeBorder}`,
                transform:  `rotate(${pos.rotate}deg)`,
              }}
            />
          ))}

          <div style={{ position: "relative" }}>

            {/* Quote marks */}
            <div style={{
              fontFamily:  FONTS.primary,
              fontSize:    80,
              fontWeight:  FONTS.weight.extrabold,
              color:       MY_COLORS.orangeDim,
              lineHeight:  0.8,
              marginBottom: 16,
              userSelect:  "none",
            }}>
              "
            </div>

            <p style={{
              fontFamily:    FONTS.primary,
              fontSize:      "clamp(18px, 2.5vw, 28px)",
              fontWeight:    FONTS.weight.bold,
              letterSpacing: FONTS.tracking.tight,
              lineHeight:    FONTS.leading.normal,
              color:         MY_COLORS.textPrimary,
              margin:        "0 auto 24px",
              maxWidth:      760,
            }}>
              When our clients dominate their markets through superior technology execution,{" "}
              <span style={{
                color:      MY_COLORS.orange,
                textShadow: `0 0 20px ${MY_COLORS.orangeGlow}`,
              }}>
                we've delivered the value that matters.
              </span>
            </p>

            <div style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              gap:            12,
            }}>
              {/* Orange dot */}
              <div style={{
                width:        8,
                height:       8,
                borderRadius: "50%",
                background:   MY_COLORS.orange,
                boxShadow:    `0 0 12px ${MY_COLORS.orangeGlow}`,
              }} />
              <span style={{
                fontFamily:    FONTS.secondary,
                fontSize:      FONTS.size.sm,
                fontWeight:    FONTS.weight.medium,
                letterSpacing: FONTS.tracking.wider,
                textTransform: "uppercase",
                color:         MY_COLORS.textMuted,
              }}>
                AlphaWaves — Our Core Commitment
              </span>
              <div style={{
                width:        8,
                height:       8,
                borderRadius: "50%",
                background:   MY_COLORS.orange,
                boxShadow:    `0 0 12px ${MY_COLORS.orangeGlow}`,
              }} />
            </div>

          </div>

        </div>

      </div>

      {/* ── Keyframes + Responsive ── */}
      <style>{`
        @keyframes commitmentPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1);    }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.15); }
        }
        @media (max-width: 900px) {
          .commitment-grid {
            grid-template-columns: 1fr !important;
          }
          .commitment-banner {
            padding: 40px 32px !important;
          }
        }
        @media (max-width: 640px) {
          .commitment-section { padding: 64px 0 !important; }
          .commitment-banner  { padding: 32px 20px !important; }
        }
      `}</style>

    </section>
  );
};

export default OurCommitment;