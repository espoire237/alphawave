/**
 * OurApproach — About Page Section 7
 * AlphaWaves brand system
 *
 * Usage:
 * import OurApproach from "../components/sections/OurApproach";
 * <OurApproach />
 */

import { useEffect, useRef, useState } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

// ── Scroll reveal hook ────────────────────────────────────────
const useScrollReveal = (threshold = 0.08) => {
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
              item.style.transform = "translateY(0) translateX(0)";
            }, i * 120);
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

// ── Approach steps data ───────────────────────────────────────
const STEPS = [
  {
    id:       1,
    title:    "We Start With Business, Not Technology",
    content:  "Before writing a single line of code, we understand your business model, market position, competitive landscape, and growth objectives. Technology serves strategy, not the other way around.",
    tag:      "Strategy First",
  },
  {
    id:       2,
    title:    "We Build For African Realities",
    content:  "Every solution is architected for African infrastructure conditions: intermittent connectivity, mobile-first users, multiple payment providers, varying device capabilities, and bandwidth constraints.",
    tag:      "Africa-Ready",
  },
  {
    id:       3,
    title:    "We Deliver Complete Solutions",
    content:  "No coordination headaches. Strategy, design, development, AI integration, deployment, and growth optimization — all under one accountable team with seamless execution.",
    tag:      "End-to-End",
  },
  {
    id:       4,
    title:    "We Measure What Matters",
    content:  "Success means business outcomes: increased revenue, reduced costs, operational efficiency, market expansion. We track ROI metrics, not just technical milestones.",
    tag:      "ROI Focused",
  },
  {
    id:       5,
    title:    "We Scale With You",
    content:  "Modular architecture means you start with core functionality and expand as your business grows. No massive upfront investment required — just scalable, compounding value.",
    tag:      "Future-Proof",
  },
];

// ── Step item ─────────────────────────────────────────────────
const StepItem = ({ step, index, isLast }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:   "grid",
        gridTemplateColumns: "80px 1fr",
        gap:       32,
        opacity:   0,
        transform: "translateX(-24px)",
        transition:"opacity 0.6s ease, transform 0.6s ease",
        cursor:    "default",
      }}
    >

      {/* ── Left — number + connector line ── */}
      <div style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            0,
      }}>

        {/* Number circle */}
        <div style={{
          width:          56,
          height:         56,
          borderRadius:   "50%",
          background:     hovered
            ? MY_COLORS.gradientOrange
            : MY_COLORS.bgSurface,
          border:         `2px solid ${hovered ? MY_COLORS.orange : MY_COLORS.border}`,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
          transition:     "all 0.3s ease",
          boxShadow:      hovered ? `0 0 24px ${MY_COLORS.orangeGlow}` : "none",
          zIndex:         1,
        }}>
          <span style={{
            fontFamily:  FONTS.primary,
            fontSize:    FONTS.size.base,
            fontWeight:  FONTS.weight.extrabold,
            color:       hovered ? "#fff" : MY_COLORS.orange,
            transition:  "color 0.3s ease",
          }}>
            {String(step.id).padStart(2, "0")}
          </span>
        </div>

        {/* Connector line */}
        {!isLast && (
          <div style={{
            width:      2,
            flex:       1,
            minHeight:  40,
            background: `linear-gradient(to bottom, ${MY_COLORS.orangeBorder}, transparent)`,
            marginTop:  4,
          }} />
        )}

      </div>

      {/* ── Right — content ── */}
      <div style={{ paddingBottom: isLast ? 0 : 48 }}>

        {/* Tag pill */}
        <div style={{
          display:        "inline-flex",
          alignItems:     "center",
          padding:        "4px 12px",
          borderRadius:   9999,
          background:     hovered ? MY_COLORS.orangeDim : MY_COLORS.bgSurface,
          border:         `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
          marginBottom:   14,
          transition:     "all 0.3s ease",
        }}>
          <span style={{
            fontFamily:    FONTS.primary,
            fontSize:      FONTS.size.xs,
            fontWeight:    FONTS.weight.bold,
            letterSpacing: FONTS.tracking.wider,
            textTransform: "uppercase",
            color:         hovered ? MY_COLORS.orange : MY_COLORS.textMuted,
            transition:    "color 0.3s ease",
          }}>
            {step.tag}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    FONTS.primary,
          fontSize:      "clamp(18px, 2vw, 22px)",
          fontWeight:    FONTS.weight.bold,
          letterSpacing: FONTS.tracking.tight,
          color:         hovered ? MY_COLORS.orange : MY_COLORS.textPrimary,
          margin:        "0 0 12px 0",
          lineHeight:    FONTS.leading.snug,
          transition:    "color 0.3s ease",
        }}>
          {step.title}
        </h3>

        {/* Content */}
        <p style={{
          fontFamily:  FONTS.secondary,
          fontSize:    FONTS.size.base,
          fontWeight:  FONTS.weight.regular,
          lineHeight:  FONTS.leading.relaxed,
          color:       MY_COLORS.textSecondary,
          margin:      0,
          maxWidth:    560,
        }}>
          {step.content}
        </p>

      </div>

    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// OurApproach Component
// ══════════════════════════════════════════════════════════════
const OurApproach = () => {
  const sectionRef = useScrollReveal(0.08);

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

      {/* ── Background glow ── */}
      <div style={{
        position:      "absolute",
        top:           -100,
        right:         -200,
        width:         700,
        height:        700,
        borderRadius:  "50%",
        background:    `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
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

        {/* ── Two column layout ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap:                 100,
          alignItems:          "start",
        }}>

          {/* ── LEFT — sticky header ── */}
          <div style={{ position: "sticky", top: 120 }}>

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
                Our Process
              </span>
            </div>

            <h2
              data-reveal
              style={{
                fontFamily:    FONTS.primary,
                fontSize:      "clamp(32px, 3.5vw, 48px)",
                fontWeight:    FONTS.weight.extrabold,
                letterSpacing: FONTS.tracking.tight,
                lineHeight:    FONTS.leading.snug,
                color:         MY_COLORS.textPrimary,
                margin:        "0 0 20px 0",
                opacity:       0,
                transform:     "translateY(20px)",
                transition:    "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              How We're{" "}
              <span style={{
                color:      MY_COLORS.orange,
                textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
              }}>
                Different
              </span>
            </h2>

            <div
              data-reveal
              style={{
                width:        2,
                height:       48,
                background:   MY_COLORS.gradientOrange,
                borderRadius: 9999,
                marginBottom: 20,
                opacity:      0,
                transform:    "translateY(20px)",
                transition:   "opacity 0.6s ease, transform 0.6s ease",
              }}
            />

            <p
              data-reveal
              style={{
                fontFamily:  FONTS.secondary,
                fontSize:    FONTS.size.base,
                lineHeight:  FONTS.leading.relaxed,
                color:       MY_COLORS.textMuted,
                margin:      "0 0 40px 0",
                opacity:     0,
                transform:   "translateY(20px)",
                transition:  "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              More than just developers — we're strategic technology partners who care about your business outcomes as much as you do.
            </p>

            {/* Summary card */}
            <div
              data-reveal
              style={{
                padding:      "24px",
                borderRadius: 14,
                background:   `linear-gradient(135deg, rgba(232,117,10,0.1) 0%, rgba(232,117,10,0.04) 100%)`,
                border:       `1px solid ${MY_COLORS.orangeBorder}`,
                opacity:      0,
                transform:    "translateY(20px)",
                transition:   "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div style={{
                fontFamily:    FONTS.primary,
                fontSize:      FONTS.size.sm,
                fontWeight:    FONTS.weight.bold,
                letterSpacing: FONTS.tracking.wide,
                color:         MY_COLORS.orange,
                marginBottom:  10,
                textTransform: "uppercase",
              }}>
                The AlphaWaves Difference
              </div>
              <p style={{
                fontFamily:  FONTS.secondary,
                fontSize:    FONTS.size.sm,
                lineHeight:  FONTS.leading.relaxed,
                color:       MY_COLORS.textSecondary,
                margin:      0,
              }}>
                5 proven steps that transform your technology investment into measurable competitive advantage.
              </p>
            </div>

          </div>

          {/* ── RIGHT — timeline steps ── */}
          <div style={{ paddingTop: 8 }}>
            {STEPS.map((step, index) => (
              <StepItem
                key={step.id}
                step={step}
                index={index}
                isLast={index === STEPS.length - 1}
              />
            ))}
          </div>

        </div>

      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 1024px) {
          .approach-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .approach-sticky { position: static !important; }
        }
        @media (max-width: 640px) {
          .approach-section { padding: 64px 0 !important; }
          .approach-step-grid {
            grid-template-columns: 60px 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>

    </section>
  );
};

export default OurApproach;