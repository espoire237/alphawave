/**
 * AboutCTA — About Page Section 10 — Final CTA
 * AlphaWaves brand system
 *
 * Usage:
 * import AboutCTA from "../components/sections/AboutCTA";
 * <AboutCTA />
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

// ── ArrowRight icon ───────────────────────────────────────────
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Trust badges ──────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: "⚡", label: "24hr Response"    },
  { icon: "🔒", label: "No Lock-in"       },
  { icon: "📊", label: "ROI Guaranteed"   },
  { icon: "🌍", label: "Africa-Ready"     },
];

// ══════════════════════════════════════════════════════════════
// AboutCTA Component
// ══════════════════════════════════════════════════════════════
const AboutCTA = () => {
  const sectionRef                  = useScrollReveal(0.1);
  const [primaryHover, setPrimary]  = useState(false);
  const [secondaryHover, setSecond] = useState(false);

  return (
    <section
      ref={sectionRef}
      style={{
        position:   "relative",
        background: MY_COLORS.bgBase,
        padding:    "100px 0 120px",
        overflow:   "hidden",
      }}
    >

      {/* ── Background — brand gradient ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: `
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(232,117,10,0.12) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 20% 50%,  rgba(232,117,10,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 50%,  rgba(232,117,10,0.06) 0%, transparent 60%)
        `,
        pointerEvents: "none",
      }} />

      {/* ── Grid texture ── */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize:  "60px 60px",
        pointerEvents:   "none",
      }} />

      {/* ── Animated floating orbs ── */}
      <div style={{
        position:      "absolute",
        top:           "20%",
        left:          "8%",
        width:         300,
        height:        300,
        borderRadius:  "50%",
        background:    `radial-gradient(circle, rgba(232,117,10,0.08) 0%, transparent 70%)`,
        animation:     "ctaOrb1 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position:      "absolute",
        bottom:        "10%",
        right:         "8%",
        width:         250,
        height:        250,
        borderRadius:  "50%",
        background:    `radial-gradient(circle, rgba(232,117,10,0.06) 0%, transparent 70%)`,
        animation:     "ctaOrb2 10s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1280,
        margin:   "0 auto",
        padding:  "0 40px",
        position: "relative",
      }}>

        {/* ── Main CTA card ── */}
        <div
          data-reveal
          style={{
            position:     "relative",
            padding:      "80px 80px 72px",
            borderRadius: 28,
            background:   `linear-gradient(135deg,
              rgba(232,117,10,0.12) 0%,
              rgba(232,117,10,0.06) 35%,
              rgba(16,16,16,0.95)  70%,
              rgba(10,10,10,1)     100%
            )`,
            border:       `1px solid ${MY_COLORS.orangeBorder}`,
            overflow:     "hidden",
            textAlign:    "center",
            opacity:      0,
            transform:    "translateY(30px) scale(0.98)",
            transition:   "opacity 0.7s ease, transform 0.7s ease",
          }}
        >

          {/* Decorative corner brackets */}
          {[
            { top: 20,    left: 20,    borderTop: true,    borderLeft: true  },
            { top: 20,    right: 20,   borderTop: true,    borderRight: true },
            { bottom: 20, left: 20,    borderBottom: true, borderLeft: true  },
            { bottom: 20, right: 20,   borderBottom: true, borderRight: true },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position:     "absolute",
                width:        28,
                height:       28,
                top:          pos.top,
                left:         pos.left,
                right:        pos.right,
                bottom:       pos.bottom,
                borderTop:    pos.borderTop    ? `1.5px solid ${MY_COLORS.orangeBorder}` : "none",
                borderBottom: pos.borderBottom ? `1.5px solid ${MY_COLORS.orangeBorder}` : "none",
                borderLeft:   pos.borderLeft   ? `1.5px solid ${MY_COLORS.orangeBorder}` : "none",
                borderRight:  pos.borderRight  ? `1.5px solid ${MY_COLORS.orangeBorder}` : "none",
                borderRadius: i === 0 ? "4px 0 0 0" : i === 1 ? "0 4px 0 0" : i === 2 ? "0 0 0 4px" : "0 0 4px 0",
                pointerEvents:"none",
              }}
            />
          ))}

          {/* Top accent line */}
          <div style={{
            position:   "absolute",
            top:        0, left: "20%", right: "20%",
            height:     2,
            background: MY_COLORS.gradientOrange,
            borderRadius: "0 0 9999px 9999px",
          }} />

          {/* Eyebrow */}
          <div
            data-reveal
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            10,
              marginBottom:   28,
              opacity:        0,
              transform:      "translateY(16px)",
              transition:     "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span style={{
              width: 24, height: 2,
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
              Let's Build Together
            </span>
            <span style={{
              width: 24, height: 2,
              borderRadius: 9999,
              background:   MY_COLORS.gradientOrange,
            }} />
          </div>

          {/* Headline */}
          <h2
            data-reveal
            style={{
              fontFamily:    FONTS.primary,
              fontSize:      "clamp(32px, 5vw, 60px)",
              fontWeight:    FONTS.weight.extrabold,
              letterSpacing: FONTS.tracking.tight,
              lineHeight:    FONTS.leading.tight,
              color:         MY_COLORS.textPrimary,
              margin:        "0 auto 20px",
              maxWidth:      720,
              opacity:       0,
              transform:     "translateY(20px)",
              transition:    "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Ready to Partner{" "}
            <span style={{
              color:      MY_COLORS.orange,
              textShadow: `0 0 40px ${MY_COLORS.orangeGlow}`,
            }}>
              With Us?
            </span>
          </h2>

          {/* Subtext */}
          <p
            data-reveal
            style={{
              fontFamily:  FONTS.secondary,
              fontSize:    "clamp(15px, 1.8vw, 19px)",
              fontWeight:  FONTS.weight.regular,
              lineHeight:  FONTS.leading.relaxed,
              color:       MY_COLORS.textSecondary,
              margin:      "0 auto 44px",
              maxWidth:    540,
              opacity:     0,
              transform:   "translateY(20px)",
              transition:  "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Let's discuss how AlphaWaves can accelerate your digital transformation and drive measurable business growth.
          </p>

          {/* CTA Buttons */}
          <div
            data-reveal
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              gap:            16,
              flexWrap:       "wrap",
              marginBottom:   48,
              opacity:        0,
              transform:      "translateY(20px)",
              transition:     "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {/* Primary */}
            <Link
              to="/contact"
              onMouseEnter={() => setPrimary(true)}
              onMouseLeave={() => setPrimary(false)}
              style={{
                textDecoration: "none",
                display:        "inline-flex",
                alignItems:     "center",
                gap:            primaryHover ? 12 : 8,
                padding:        "14px 32px",
                borderRadius:   10,
                fontFamily:     FONTS.primary,
                fontSize:       FONTS.size.base,
                fontWeight:     FONTS.weight.bold,
                letterSpacing:  FONTS.tracking.wide,
                color:          "#ffffff",
                background:     MY_COLORS.gradientOrange,
                boxShadow:      primaryHover
                  ? `0 0 48px rgba(232,117,10,0.6), 0 8px 32px rgba(232,117,10,0.3)`
                  : `0 0 28px rgba(232,117,10,0.4)`,
                transform:      primaryHover ? "translateY(-3px)" : "translateY(0)",
                transition:     "all 0.3s ease",
              }}
            >
              Schedule a Consultation
              <ArrowRight />
            </Link>

            {/* Secondary */}
            <Link
              to="/services"
              onMouseEnter={() => setSecond(true)}
              onMouseLeave={() => setSecond(false)}
              style={{
                textDecoration: "none",
                display:        "inline-flex",
                alignItems:     "center",
                gap:            secondaryHover ? 12 : 8,
                padding:        "14px 32px",
                borderRadius:   10,
                fontFamily:     FONTS.primary,
                fontSize:       FONTS.size.base,
                fontWeight:     FONTS.weight.semibold,
                letterSpacing:  FONTS.tracking.wide,
                color:          secondaryHover ? MY_COLORS.textPrimary : MY_COLORS.textSecondary,
                background:     secondaryHover ? MY_COLORS.bgSurfaceHover : "transparent",
                border:         `1px solid ${secondaryHover ? MY_COLORS.borderHover : MY_COLORS.border}`,
                transform:      secondaryHover ? "translateY(-3px)" : "translateY(0)",
                transition:     "all 0.3s ease",
              }}
            >
              View Our Services
              <ArrowRight />
            </Link>
          </div>

          {/* Trust badges */}
          <div
            data-reveal
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              gap:            32,
              flexWrap:       "wrap",
              paddingTop:     32,
              borderTop:      `1px solid ${MY_COLORS.border}`,
              opacity:        0,
              transform:      "translateY(20px)",
              transition:     "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        8,
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{
                  fontFamily:    FONTS.primary,
                  fontSize:      FONTS.size.sm,
                  fontWeight:    FONTS.weight.semibold,
                  letterSpacing: FONTS.tracking.wide,
                  color:         MY_COLORS.textMuted,
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ── Keyframes + Responsive ── */}
      <style>{`
        @keyframes ctaOrb1 {
          0%, 100% { transform: translate(0, 0)    scale(1);    }
          50%       { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes ctaOrb2 {
          0%, 100% { transform: translate(0, 0)     scale(1);    }
          50%       { transform: translate(-20px, 20px) scale(1.1); }
        }
        @media (max-width: 900px) {
          .about-cta-card { padding: 56px 40px !important; }
        }
        @media (max-width: 640px) {
          .about-cta-section { padding: 64px 0 80px !important; }
          .about-cta-card    { padding: 40px 24px !important;   }
          .about-cta-buttons { flex-direction: column !important; }
          .about-cta-trust   { gap: 20px !important;            }
        }
      `}</style>

    </section>
  );
};

export default AboutCTA;