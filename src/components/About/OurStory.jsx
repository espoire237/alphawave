/**
 * OurStory — About Page Section 2
 * AlphaWaves brand system — FULLY RESPONSIVE
 *
 * Breakpoints: sm (≤480), md (481–768), lg (769–1024), xl (1025+)
 *
 * FIXES:
 * - Replaced dead CSS class media queries with useBreakpoint hook (inline styles)
 * - Single column on mobile + tablet, two columns on largeTablet+
 * - Sticky left column disabled on single-column layouts
 * - Section padding, font sizes, gaps all scale per breakpoint
 * - Stats grid goes 2-col on all sizes (works fine, just smaller on mobile)
 * - Paragraph translateX animation reduced on mobile to avoid overflow flash
 */

import { useEffect, useRef } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

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

// ── Data ─────────────────────────────────────────────────────
const PARAGRAPHS = [
  {
    id:    1,
    label: "Who We Are",
    text:  "AlphaWaves is a full-service technology company architecting Africa's digital future. We are a team of specialized engineers, AI researchers, data scientists, and digital strategists delivering enterprise-grade solutions that drive measurable business transformation across African and global markets.",
  },
  {
    id:    2,
    label: "Our Expertise",
    text:  "Our multidisciplinary team combines frontend and backend engineering, mobile application development, DevOps infrastructure, AI-powered analytics, SEO optimization, and strategic design expertise. This integrated capability enables us to solve complex business challenges end-to-end, delivering complete digital ecosystems rather than fragmented point solutions.",
  },
  {
    id:    3,
    label: "Our Position",
    text:  "Founded in Cameroon—Africa's bilingual technology hub—we possess unmatched expertise in both Francophone and Anglophone African markets. While international agencies import solutions that fail under African infrastructure conditions, payment ecosystems, and connectivity patterns, we engineer systems designed to thrive in these environments from day one.",
  },
  {
    id:    4,
    label: "Our Approach",
    text:  "We don't just implement technology—we craft scalable digital infrastructures that make businesses operationally excellent, market-visible, and data-driven. As we expand our impact across the continent and beyond, we remain committed to being strategic partners who deliver solutions grounded in African market realities and global technical standards.",
  },
];

const STATS = [
  { value: "50+",  label: "Projects Delivered"  },
  { value: "20+",  label: "Enterprise Clients"  },
  { value: "8+",   label: "Years of Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

// ══════════════════════════════════════════════════════════════
const OurStory = () => {
  const { isMobile, isTablet, isLargeTablet, isDesktop } = useBreakpoint();
  const sectionRef = useScrollReveal(0.1);

  // ── Responsive values ────────────────────────────────────────
  const isSingleCol   = isMobile || isTablet;               // below 1024px → stack
  const sectionPadY   = isMobile ? "64px" : isTablet ? "80px" : "100px";
  const outerPadX     = isMobile ? "20px" : isTablet ? "32px" : "40px";
  const gridCols      = isSingleCol ? "1fr" : isLargeTablet ? "1fr 1.4fr" : "1fr 1.6fr";
  const gridGap       = isMobile ? 40 : isTablet ? 48 : isLargeTablet ? 60 : 80;
  const h2Size        = isMobile ? "clamp(26px,7vw,36px)" : isTablet ? "clamp(28px,4vw,40px)" : "clamp(32px,3.5vw,48px)";
  const paraFontSize  = isMobile ? FONTS.size.sm : FONTS.size.md;
  const statValueSize = isMobile ? "clamp(20px,5vw,26px)" : "clamp(22px,2.5vw,30px)";
  const statPad       = isMobile ? "14px 12px" : "20px 16px";

  // Paragraphs slide in from right on desktop, from bottom on mobile (avoids horizontal overflow flash)
  const paraInitTransform = isSingleCol ? "translateY(24px)" : "translateX(30px)";

  return (
    <section
      ref={sectionRef}
      style={{
        position:   "relative",
        background: MY_COLORS.bgSection,
        padding:    `${sectionPadY} 0`,
        overflow:   "hidden",
      }}
    >

      {/* ── Background glow ── */}
      <div style={{
        position:     "absolute",
        top:          -150,
        right:        -150,
        width:        isMobile ? 300 : 600,
        height:       isMobile ? 300 : 600,
        borderRadius: "50%",
        background:   `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
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

      {/* ── Content wrapper ── */}
      <div style={{
        maxWidth:  1280,
        margin:    "0 auto",
        padding:   `0 ${outerPadX}`,
        position:  "relative",
        boxSizing: "border-box",
      }}>

        {/* ── Grid ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: gridCols,
          gap:                 gridGap,
          alignItems:          "start",
        }}>

          {/* ══ LEFT COLUMN ══ */}
          {/* sticky only on two-column layouts — on single col it just flows */}
          <div style={{
            position: isSingleCol ? "static" : "sticky",
            top:      120,
          }}>

            {/* Eyebrow */}
            <div
              data-reveal
              style={{
                display:    "inline-flex",
                alignItems: "center",
                gap:        10,
                marginBottom: 20,
                opacity:    0,
                transform:  "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <span style={{
                width:        28,
                height:       2,
                borderRadius: 9999,
                background:   MY_COLORS.gradientOrange,
                flexShrink:   0,
              }} />
              <span style={{
                fontFamily:    FONTS.primary,
                fontSize:      FONTS.size.xs,
                fontWeight:    FONTS.weight.bold,
                letterSpacing: FONTS.tracking.widest,
                textTransform: "uppercase",
                color:         MY_COLORS.orange,
              }}>
                Our Story
              </span>
            </div>

            {/* Section title */}
            <h2
              data-reveal
              style={{
                fontFamily:    FONTS.primary,
                fontSize:      h2Size,
                fontWeight:    FONTS.weight.extrabold,
                letterSpacing: FONTS.tracking.tight,
                lineHeight:    FONTS.leading.snug,
                color:         MY_COLORS.textPrimary,
                margin:        `0 0 24px 0`,
                opacity:       0,
                transform:     "translateY(20px)",
                transition:    "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              Who{" "}
              <span style={{
                color:      MY_COLORS.orange,
                textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
              }}>
                We Are
              </span>
            </h2>

            {/* Decorative line */}
            <div
              data-reveal
              style={{
                width:        2,
                height:       60,
                background:   MY_COLORS.gradientOrange,
                borderRadius: 9999,
                marginBottom: 24,
                opacity:      0,
                transform:    "translateY(20px)",
                transition:   "opacity 0.6s ease, transform 0.6s ease",
              }}
            />

            {/* Tagline */}
            <p
              data-reveal
              style={{
                fontFamily:  FONTS.secondary,
                fontSize:    isMobile ? FONTS.size.sm : FONTS.size.base,
                fontWeight:  FONTS.weight.regular,
                lineHeight:  FONTS.leading.relaxed,
                color:       MY_COLORS.textMuted,
                margin:      0,
                maxWidth:    isSingleCol ? "100%" : 340,
                opacity:     0,
                transform:   "translateY(20px)",
                transition:  "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              From Cameroon to the world — building technology that works in Africa and competes globally.
            </p>

            {/* ── Stats grid ── */}
            <div
              data-reveal
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 isMobile ? 10 : 16,
                marginTop:           isMobile ? 28 : 40,
                opacity:             0,
                transform:           "translateY(20px)",
                transition:          "opacity 0.6s ease, transform 0.6s ease",
                // On single column, limit stats width so they don't stretch across full screen
                maxWidth:            isSingleCol ? (isMobile ? "100%" : 480) : "100%",
              }}
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding:      statPad,
                    borderRadius: 12,
                    background:   MY_COLORS.bgSurface,
                    border:       `1px solid ${MY_COLORS.border}`,
                    transition:   "border-color 0.25s ease, transform 0.25s ease",
                    cursor:       "default",
                    boxSizing:    "border-box",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = MY_COLORS.orangeBorder;
                    e.currentTarget.style.transform   = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = MY_COLORS.border;
                    e.currentTarget.style.transform   = "translateY(0)";
                  }}
                >
                  <div style={{
                    fontFamily:    FONTS.primary,
                    fontSize:      statValueSize,
                    fontWeight:    FONTS.weight.extrabold,
                    letterSpacing: FONTS.tracking.tight,
                    color:         MY_COLORS.orange,
                    lineHeight:    1,
                    marginBottom:  6,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: FONTS.secondary,
                    fontSize:   isMobile ? 10 : FONTS.size.xs,
                    fontWeight: FONTS.weight.medium,
                    color:      MY_COLORS.textMuted,
                    lineHeight: 1.4,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
          {/* ══ END LEFT ══ */}

          {/* ══ RIGHT COLUMN — paragraphs ══ */}
          <div style={{
            display:       "flex",
            flexDirection: "column",
            gap:           0,
          }}>
            {PARAGRAPHS.map((para, index) => (
              <div
                key={para.id}
                data-reveal
                style={{
                  position:      "relative",
                  paddingBottom:  index < PARAGRAPHS.length - 1
                    ? (isMobile ? 32 : 48)
                    : 0,
                  opacity:   0,
                  transform: paraInitTransform,   // ← bottom on mobile, right on desktop
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                {/* Connector line */}
                {index < PARAGRAPHS.length - 1 && (
                  <div style={{
                    position:   "absolute",
                    left:       isMobile ? 13 : 13,   // aligns with center of 28px badge
                    top:        30,
                    bottom:     0,
                    width:      1,
                    background: `linear-gradient(to bottom, ${MY_COLORS.orangeBorder}, transparent)`,
                  }} />
                )}

                <div style={{
                  display:    "flex",
                  alignItems: "flex-start",
                  gap:        isMobile ? 14 : 20,
                }}>

                  {/* Number badge */}
                  <div style={{
                    width:          isMobile ? 26 : 28,
                    height:         isMobile ? 26 : 28,
                    borderRadius:   "50%",
                    background:     MY_COLORS.orangeDim,
                    border:         `1px solid ${MY_COLORS.orangeBorder}`,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                    marginTop:      2,
                  }}>
                    <span style={{
                      fontFamily: FONTS.primary,
                      fontSize:   FONTS.size.xs,
                      fontWeight: FONTS.weight.bold,
                      color:      MY_COLORS.orange,
                      lineHeight: 1,
                    }}>
                      {String(para.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Label */}
                    <span style={{
                      fontFamily:    FONTS.primary,
                      fontSize:      FONTS.size.xs,
                      fontWeight:    FONTS.weight.bold,
                      letterSpacing: FONTS.tracking.wider,
                      textTransform: "uppercase",
                      color:         MY_COLORS.orange,
                      display:       "block",
                      marginBottom:  10,
                    }}>
                      {para.label}
                    </span>

                    {/* Text */}
                    <p style={{
                      fontFamily:  FONTS.secondary,
                      fontSize:    paraFontSize,
                      fontWeight:  FONTS.weight.regular,
                      lineHeight:  FONTS.leading.relaxed,
                      color:       MY_COLORS.textSecondary,
                      margin:      0,
                    }}>
                      {para.text}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
          {/* ══ END RIGHT ══ */}

        </div>
      </div>

    </section>
  );
};

export default OurStory;