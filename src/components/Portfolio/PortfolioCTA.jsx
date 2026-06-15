/**
 * PortfolioCTA — Portfolio Page Section 7 — FULLY RESPONSIVE + i18n READY
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ i18n
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7.5" fill="rgba(232,117,10,0.15)" />
    <path
      d="M4.5 7.5L6.5 9.5L10.5 5.5"
      stroke="#E8750A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const useScrollReveal = (t = 0.1) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.querySelectorAll("[data-reveal]").forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0) scale(1)";
            }, i * 130);
          });
          obs.disconnect();
        }
      },
      { threshold: t }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);

  return ref;
};

const PortfolioCTA = () => {
  const { t } = useTranslation(); // ✅ i18n hook
  const sectionRef = useScrollReveal();
  const { isMobile, isTablet } = useBreakpoint();

  const [p1, setP1] = useState(false);
  const [p2, setP2] = useState(false);

  // ✅ dynamic trust points from i18n
  const trustPoints = t("portfolioPage.cta.trustPoints", {
    returnObjects: true,
  });

  const sectionPad = isMobile
    ? "48px 20px 64px"
    : isTablet
    ? "64px 32px 80px"
    : "80px 40px 100px";

  const boxPad = isMobile
    ? "32px 20px"
    : isTablet
    ? "48px 40px"
    : "72px 80px";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: MY_COLORS.bgSection,
        padding: sectionPad,
        overflow: "hidden",
      }}
    >
      {/* background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 800,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(232,117,10,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div
          data-reveal
          style={{
            padding: boxPad,
            borderRadius: isMobile ? 16 : 24,
            background:
              "linear-gradient(135deg, rgba(232,117,10,0.1) 0%, rgba(232,117,10,0.05) 40%, rgba(10,10,10,0.9) 100%)",
            border: `1px solid ${MY_COLORS.orangeBorder}`,
            textAlign: "center",
            position: "relative",
            opacity: 0,
            transform: "translateY(30px) scale(0.98)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Eyebrow */}
          <div
            data-reveal
            style={{
              marginBottom: isMobile ? 14 : 20,
              opacity: 0,
              transform: "translateY(16px)",
              transition: "all 0.6s ease",
              color: MY_COLORS.orange,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {t("portfolioPage.cta.eyebrow")}
          </div>

          {/* Title */}
          <h2
            data-reveal
            style={{
              fontFamily: FONTS.primary,
              fontSize: isMobile
                ? "clamp(22px,6vw,32px)"
                : "clamp(28px,4vw,52px)",
              fontWeight: 800,
              color: MY_COLORS.textPrimary,
              marginBottom: 16,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {t("portfolioPage.cta.title")}{" "}
            <span style={{ color: MY_COLORS.orange }}>
              {t("portfolioPage.cta.titleAccent")}
            </span>
          </h2>

          {/* Subtitle */}
          <p
            data-reveal
            style={{
              fontFamily: FONTS.secondary,
              color: MY_COLORS.textSecondary,
              marginBottom: 32,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {t("portfolioPage.cta.subtitle")}
          </p>

          {/* Trust points */}
          <div
            data-reveal
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)",
              gap: 16,
              justifyContent: "center",
              marginBottom: 32,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {trustPoints.map((point, i) => (
              <div key={i} style={{ display: "flex", gap: 6 }}>
                <CheckIcon />
                <span style={{ color: MY_COLORS.textSecondary }}>
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            data-reveal
            style={{
              display: "flex",
              gap: 16,
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <Link
              to="/contact"
              onMouseEnter={() => setP1(true)}
              onMouseLeave={() => setP1(false)}
              style={{
                padding: "14px 28px",
                borderRadius: 10,
                background: MY_COLORS.gradientOrange,
                color: "#fff",
                fontWeight: 700,
                transform: p1 ? "translateY(-3px)" : "none",
                transition: "0.3s",
              }}
            >
              {t("portfolioPage.cta.primaryBtn")} <ArrowRight />
            </Link>

            <Link
              to="/contact"
              onMouseEnter={() => setP2(true)}
              onMouseLeave={() => setP2(false)}
              style={{
                padding: "14px 28px",
                borderRadius: 10,
                border: `1px solid ${MY_COLORS.border}`,
                color: MY_COLORS.textSecondary,
                transform: p2 ? "translateY(-3px)" : "none",
                transition: "0.3s",
              }}
            >
              {t("portfolioPage.cta.secondaryBtn")} <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCTA;