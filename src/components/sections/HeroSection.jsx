/**
 * HeroSection — Universal Page Hero Component
 * AlphaWaves brand system
 *
 * Usage:
 * import HeroSection from "../../components/HeroSection";
 * import { IMAGES } from "../../assets/images";
 *
 * <HeroSection
 *   eyebrow="About Us"
 *   headline="Building Africa's Digital Future"
 *   subheadline="A full-service technology company..."
 *   image={IMAGES.hero.about}
 *   breadcrumb={true}
 *   cta={{
 *     primary:   { label: "Get Started",   path: "/contact"  },
 *     secondary: { label: "Our Services",  path: "/services" },
 *   }}
 * />
 */

import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

// ── Breadcrumb map ────────────────────────────────────────────
const BREADCRUMB_MAP = {
  "/about": "About Us",
  "/services": "Services",
  "/portfolio": "Portfolio",
  "/blog": "Blog",
  "/faq": "FAQ",
  "/contact": "Contact",
};

// ── ChevronRight ──────────────────────────────────────────────
const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M4 2L8 6L4 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── AnimatedWave — used for Contact page ─────────────────────
const AnimatedWave = () => (
  <div
    style={{
      position: "absolute",
      width: "100%",
      inset: 0,
      overflow: "hidden",
      zIndex: 1,
      opacity: 0.15,
    }}
  >
    <style>{`
      @keyframes waveDrift1 {
        0%   { transform: translateX(-100px) scaleY(1);   }
        50%  { transform: translateX(100px)  scaleY(1.2); }
        100% { transform: translateX(-100px) scaleY(1);   }
      }
      @keyframes waveDrift2 {
        0%   { transform: translateX(80px)  scaleY(0.9); }
        50%  { transform: translateX(-80px) scaleY(1.1); }
        100% { transform: translateX(80px)  scaleY(0.9); }
      }
      @keyframes waveDrift3 {
        0%   { transform: translateX(-60px) scaleY(1.1); }
        50%  { transform: translateX(60px)  scaleY(0.8); }
        100% { transform: translateX(-60px) scaleY(1.1); }
      }
    `}</style>
    {/* Wave 1 */}
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        width: "140%",
        height: 120,
        animation: "waveDrift1 10s ease-in-out infinite",
      }}
    >
      <path
        d="M0,60 Q180,10 360,60 Q540,110 720,60 Q900,10 1080,60 Q1260,110 1440,60"
        stroke={MY_COLORS.orange}
        strokeWidth="2"
        fill="none"
      />
    </svg>
    {/* Wave 2 */}
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: "45%",
        left: 0,
        right: 0,
        width: "140%",
        height: 120,
        animation: "waveDrift2 14s ease-in-out infinite",
      }}
    >
      <path
        d="M0,60 Q180,110 360,60 Q540,10 720,60 Q900,110 1080,60 Q1260,10 1440,60"
        stroke={MY_COLORS.orangeLight}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
    {/* Wave 3 */}
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: "65%",
        left: 0,
        right: 0,
        width: "140%",
        height: 120,
        animation: "waveDrift3 18s ease-in-out infinite",
      }}
    >
      <path
        d="M0,60 Q180,20 360,60 Q540,100 720,60 Q900,20 1080,60 Q1260,100 1440,60"
        stroke={MY_COLORS.orange}
        strokeWidth="1"
        fill="none"
      />
    </svg>
  </div>
);

// ══════════════════════════════════════════════════════════════
// HeroSection Component
// ══════════════════════════════════════════════════════════════
const HeroSection = ({
  eyebrow, // string  — small label e.g. "About Us"
  headline, // string  — REQUIRED — main bold title
  subheadline, // string  — REQUIRED — paragraph below headline
  image = null, // string  — path to bg image (null = no image)
  breadcrumb = true, // bool    — show breadcrumb
  cta = null, // object  — { primary, secondary } — each { label, path }
  children = null, // node    — optional slot: search bar, pills, stats
  animated = false, // bool    — true = animated wave bg (Contact page)
}) => {
  const location = useLocation();
  const contentRef = useRef(null);
  const pageLabel = BREADCRUMB_MAP[location.pathname] ?? eyebrow ?? "Page";

  // ── Staggered entrance animation ────────────────────────────
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const items = container.querySelectorAll("[data-animate]");
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
      el.style.transitionDelay = `${i * 0.12}s`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    });
  }, [location.pathname]);

  // ── Split last word for orange accent ───────────────────────
  const renderHeadline = (text) => {
    const words = text.trim().split(" ");
    const last = words.pop();
    return (
      <>
        {words.join(" ")}{" "}
        <span
          style={{
            color: MY_COLORS.orange,
            textShadow: `0 0 40px ${MY_COLORS.orangeGlow}`,
          }}
        >
          {last}
        </span>
      </>
    );
  };

  return (
    <section
  style={{
    position: "relative",
    width: "100%",
    maxWidth: "100vw", // Add this
    height: "clamp(380px, 500px, 55vh)",
    overflow: "hidden", // Ensure this is definitely here
    background: MY_COLORS.bgBase,
    marginTop: -14, 
    paddingTop: 24,
  }}
>
      {/* ── 1. Background Image (About, Services, Portfolio, Blog) ── */}
      {image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            animation: "heroZoom 8s ease-out forwards",
            zIndex: 0,
          }}
        />
      )}

      {/* ── 2. Animated Wave (Contact page) ── */}
      {animated && !image && <AnimatedWave />}

      {/* ── 3. Gradient Overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: image
            ? // Has image → dark left fade to transparent right
              `linear-gradient(
               105deg,
               ${MY_COLORS.bgBase}          0%,
               ${MY_COLORS.bgBase}          30%,
               rgba(10,10,10,0.92)          45%,
               rgba(10,10,10,0.72)          60%,
               rgba(10,10,10,0.35)          78%,
               transparent                  100%
             )`
            : // No image → solid dark with subtle depth
              `linear-gradient(
               160deg,
               #0f0f0f 0%,
               ${MY_COLORS.bgBase} 100%
             )`,
        }}
      />

      {/* ── 4. Orange glow — bottom left ── */}
<div
  style={{
    position: "absolute",
    bottom: -100,
    left: -100,
    width: "min(500px, 100vw)", // Use min() to ensure it never exceeds screen width
    height: "min(500px, 100vw)",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
    pointerEvents: "none",
    zIndex: 3,
  }}
/>

      {/* ── 5. Subtle grid texture ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* ── 6. Top accent line ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: MY_COLORS.gradientAccent,
          opacity: 0.45,
          zIndex: 4,
          pointerEvents: "none",
        }}
      />

      {/* ── 7. Content ── */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 5,
          height: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Breadcrumb */}
        {breadcrumb && (
          <div
            data-animate
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 20,
            }}
          >
            <Link
              to="/"
              style={{
                fontFamily: FONTS.primary,
                fontSize: FONTS.size.sm,
                fontWeight: FONTS.weight.medium,
                color: MY_COLORS.textMuted,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = MY_COLORS.textSecondary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = MY_COLORS.textMuted)
              }
            >
              Home
            </Link>
            <span style={{ color: MY_COLORS.textDisabled, display: "flex" }}>
              <ChevronRight />
            </span>
            <span
              style={{
                fontFamily: FONTS.primary,
                fontSize: FONTS.size.sm,
                fontWeight: FONTS.weight.medium,
                color: MY_COLORS.orange,
              }}
            >
              {pageLabel}
            </span>
          </div>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <div
            data-animate
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 28,
                height: 2,
                borderRadius: 9999,
                background: MY_COLORS.gradientOrange,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.primary,
                fontSize: FONTS.size.xs,
                fontWeight: FONTS.weight.bold,
                letterSpacing: FONTS.tracking.widest,
                textTransform: "uppercase",
                color: MY_COLORS.orange,
              }}
            >
              {eyebrow}
            </span>
          </div>
        )}

        {/* Headline */}
        <h1
          data-animate
          style={{
            fontFamily: FONTS.primary,
            fontSize: "clamp(30px, 4.5vw, 54px)",
            fontWeight: FONTS.weight.extrabold,
            letterSpacing: FONTS.tracking.tight,
            lineHeight: FONTS.leading.tight,
            color: MY_COLORS.textPrimary,
            margin: "0 0 16px 0",
            maxWidth: 660,
          }}
        >
          {renderHeadline(headline)}
        </h1>

        {/* Subheadline */}
        <p
          data-animate
          style={{
            fontFamily: FONTS.secondary,
            fontSize: "clamp(14px, 1.6vw, 17px)",
            fontWeight: FONTS.weight.regular,
            lineHeight: FONTS.leading.relaxed,
            color: MY_COLORS.textSecondary,
            margin: "0 0 28px 0",
            maxWidth: 500,
          }}
        >
          {subheadline}
        </p>

        {/* CTA Buttons */}
        {cta && (
          <div
            data-animate
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            {cta.primary && (
              <Link
                to={cta.primary.path}
                style={{
                  textDecoration: "none",
                  padding: "11px 26px",
                  borderRadius: 8,
                  fontSize: FONTS.size.sm,
                  fontWeight: FONTS.weight.semibold,
                  fontFamily: FONTS.primary,
                  letterSpacing: FONTS.tracking.wide,
                  color: "#ffffff",
                  background: MY_COLORS.gradientOrange,
                  boxShadow: `0 0 20px ${MY_COLORS.orangeGlow}`,
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 0 32px ${MY_COLORS.orangeGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 0 20px ${MY_COLORS.orangeGlow}`;
                }}
              >
                {cta.primary.label}
              </Link>
            )}
            {cta.secondary && (
              <Link
                to={cta.secondary.path}
                style={{
                  textDecoration: "none",
                  padding: "11px 26px",
                  borderRadius: 8,
                  fontSize: FONTS.size.sm,
                  fontWeight: FONTS.weight.semibold,
                  fontFamily: FONTS.primary,
                  letterSpacing: FONTS.tracking.wide,
                  color: MY_COLORS.textSecondary,
                  background: "transparent",
                  border: `1px solid ${MY_COLORS.border}`,
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = MY_COLORS.textPrimary;
                  e.currentTarget.style.borderColor = MY_COLORS.borderHover;
                  e.currentTarget.style.background = MY_COLORS.bgSurfaceHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = MY_COLORS.textSecondary;
                  e.currentTarget.style.borderColor = MY_COLORS.border;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {cta.secondary.label}
              </Link>
            )}
          </div>
        )}

        {/* Children slot — search bar, pills, stats */}
        {children && (
          <div data-animate style={{ marginTop: 8 }}>
            {children}
          </div>
        )}
      </div>

      {/* ── 8. Bottom fade into page ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          background: `linear-gradient(to bottom, transparent, ${MY_COLORS.bgBase})`,
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1);    }
        }
        @media (max-width: 768px) {
          .hero-content { padding: 0 20px !important; }
        }
        @media (max-width: 480px) {
          .hero-content { padding: 0 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
