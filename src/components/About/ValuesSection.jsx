/**
 * CoreValues — About Page Section 4
 * AlphaWaves brand system
 *
 * Usage:
 * import CoreValues from "../components/sections/CoreValues";
 * <CoreValues />
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
              item.style.transform = "translateY(0) scale(1)";
            }, i * 100);
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

// ── Icons ─────────────────────────────────────────────────────
const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HandshakeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12V19A2 2 0 0119 21H5A2 2 0 013 19V5A2 2 0 015 3H16"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="8,6 2,12 8,18"   stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22S3 17 3 11V5L12 2L21 5V11C21 17 12 22 12 22Z"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="9,12 11,14 15,10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 11.3894 7.3457 13.4608 9.33333 14.5333V17H14.6667V14.5333C16.6543 13.4608 18 11.3894 18 9C18 5.68629 15.3137 3 12 3Z"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Values data ───────────────────────────────────────────────
const VALUES = [
  {
    id:          1,
    icon:        <StarIcon />,
    value:       "African Excellence",
    description: "We prove African technology companies can deliver world-class solutions while understanding local market realities better than any international agency.",
    highlight:   true,
  },
  {
    id:          2,
    icon:        <ChartIcon />,
    value:       "Results Over Trends",
    description: "We measure success by business outcomes — revenue growth, cost reduction, market expansion — not by how cutting-edge the technology is.",
    highlight:   false,
  },
  {
    id:          3,
    icon:        <HandshakeIcon />,
    value:       "True Partnership",
    description: "We serve as your strategic technology partner, not just a vendor. Your success is our success, and we're accountable for measurable results.",
    highlight:   false,
  },
  {
    id:          4,
    icon:        <CodeIcon />,
    value:       "Technical Excellence",
    description: "We deliver enterprise-grade solutions architected to global standards while optimized for African infrastructure, connectivity, and payment ecosystems.",
    highlight:   false,
  },
  {
    id:          5,
    icon:        <ShieldIcon />,
    value:       "Transparency Always",
    description: "Clear communication, honest timelines, transparent pricing. No hidden costs, no vendor lock-in, no technical jargon — just straightforward partnership.",
    highlight:   false,
  },
  {
    id:          6,
    icon:        <LightbulbIcon />,
    value:       "Innovation & Learning",
    description: "We stay at the forefront of AI, cloud technologies, and digital transformation trends to ensure our clients always have competitive advantage.",
    highlight:   false,
  },
];

// ── Value Card ────────────────────────────────────────────────
const ValueCard = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     "relative",
        padding:      "36px 32px",
        borderRadius: 16,
        background:   item.highlight
          ? `linear-gradient(135deg, rgba(232,117,10,0.1) 0%, rgba(232,117,10,0.04) 100%)`
          : MY_COLORS.bgSurface,
        border:       `1px solid ${hovered || item.highlight ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        overflow:     "hidden",
        cursor:       "default",
        transition:   "all 0.3s ease",
        transform:    hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow:    hovered
          ? `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${MY_COLORS.orangeBorder}`
          : "none",
        opacity:      0,
      }}
    >

      {/* Top orange bar — shows on hover or highlight */}
      <div style={{
        position:     "absolute",
        top:          0,
        left:         0,
        right:        0,
        height:       2,
        borderRadius: "16px 16px 0 0",
        background:   MY_COLORS.gradientOrange,
        opacity:      hovered || item.highlight ? 1 : 0,
        transition:   "opacity 0.3s ease",
      }} />

      {/* Corner number */}
      <div style={{
        position:   "absolute",
        top:        16,
        right:      20,
        fontFamily: FONTS.primary,
        fontSize:   40,
        fontWeight: FONTS.weight.extrabold,
        color:      MY_COLORS.orangeDim,
        lineHeight: 1,
        userSelect: "none",
        transition: "color 0.3s ease",
      }}>
        {String(item.id).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div style={{
        width:          48,
        height:         48,
        borderRadius:   12,
        background:     hovered ? MY_COLORS.orangeDim : MY_COLORS.bgSurfaceHover,
        border:         `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        color:          MY_COLORS.orange,
        marginBottom:   24,
        transition:     "all 0.3s ease",
      }}>
        {item.icon}
      </div>

      {/* Value name */}
      <h3 style={{
        fontFamily:    FONTS.primary,
        fontSize:      FONTS.size.lg,
        fontWeight:    FONTS.weight.bold,
        letterSpacing: FONTS.tracking.tight,
        color:         hovered ? MY_COLORS.orange : MY_COLORS.textPrimary,
        margin:        "0 0 12px 0",
        transition:    "color 0.3s ease",
        paddingRight:  40,
      }}>
        {item.value}
      </h3>

      {/* Divider */}
      <div style={{
        width:        hovered ? 40 : 24,
        height:       2,
        borderRadius: 9999,
        background:   MY_COLORS.gradientOrange,
        marginBottom: 16,
        transition:   "width 0.3s ease",
      }} />

      {/* Description */}
      <p style={{
        fontFamily:  FONTS.secondary,
        fontSize:    FONTS.size.sm,
        fontWeight:  FONTS.weight.regular,
        lineHeight:  FONTS.leading.relaxed,
        color:       MY_COLORS.textSecondary,
        margin:      0,
      }}>
        {item.description}
      </p>

    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// CoreValues Component
// ══════════════════════════════════════════════════════════════
const CoreValues = () => {
  const sectionRef = useScrollReveal(0.05);

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

      {/* ── Background glow — bottom left ── */}
      <div style={{
        position:      "absolute",
        bottom:        -200,
        left:          -200,
        width:         700,
        height:        700,
        borderRadius:  "50%",
        background:    `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
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

        {/* ── Section header ── */}
        <div style={{ marginBottom: 64 }}>

          <div
            data-reveal
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          10,
              marginBottom: 20,
              opacity:      0,
              transform:    "translateY(20px)",
              transition:   "opacity 0.6s ease, transform 0.6s ease",
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
              What We Stand For
            </span>
          </div>

          <div style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 40,
            alignItems:          "end",
          }}>

            <h2
              data-reveal
              style={{
                fontFamily:    FONTS.primary,
                fontSize:      "clamp(32px, 3.5vw, 48px)",
                fontWeight:    FONTS.weight.extrabold,
                letterSpacing: FONTS.tracking.tight,
                lineHeight:    FONTS.leading.snug,
                color:         MY_COLORS.textPrimary,
                margin:        0,
                opacity:       0,
                transform:     "translateY(20px)",
                transition:    "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              Our{" "}
              <span style={{
                color:      MY_COLORS.orange,
                textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
              }}>
                Values
              </span>
            </h2>

            <p
              data-reveal
              style={{
                fontFamily:  FONTS.secondary,
                fontSize:    FONTS.size.base,
                fontWeight:  FONTS.weight.regular,
                lineHeight:  FONTS.leading.relaxed,
                color:       MY_COLORS.textMuted,
                margin:      0,
                opacity:     0,
                transform:   "translateY(20px)",
                transition:  "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              The principles that guide every solution we build, every team we grow, and every partnership we forge across Africa and beyond.
            </p>

          </div>
        </div>

        {/* ── Values grid — 3 columns ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 20,
        }}>
          {VALUES.map((item, index) => (
            <ValueCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 1024px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .values-header-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .values-grid {
            grid-template-columns: 1fr !important;
          }
          .values-section {
            padding: 64px 0 !important;
          }
        }
      `}</style>

    </section>
  );
};

export default CoreValues;