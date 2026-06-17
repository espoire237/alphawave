/**
 * FAQBottomCTA FAQ Page Section 3
 * "Didn't Find Your Answer?" banner
 * AlphaWaves brand system
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS }     from "../../assets/fonts/fonts.js";

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll("[data-reveal]").forEach((item, i) => {
            setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0) scale(1)"; }, i * 130);
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

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FAQBottomCTA = () => {
  const { t } = useTranslation(); // no namespace uses default "translation"
  const sectionRef                  = useScrollReveal(0.1);
  const [primaryHover, setPrimary]  = useState(false);
  const [secondaryHover, setSecond] = useState(false);

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgSection, padding: "80px 0 100px", overflow: "hidden" }}>

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, height: 400, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(232,117,10,0.08) 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative" }}>
        <div data-reveal style={{ position: "relative", padding: "64px 80px", borderRadius: 24, background: `linear-gradient(135deg, rgba(232,117,10,0.1) 0%, rgba(232,117,10,0.05) 40%, rgba(10,10,10,0.9) 100%)`, border: `1px solid ${MY_COLORS.orangeBorder}`, overflow: "hidden", textAlign: "center", opacity: 0, transform: "translateY(30px) scale(0.98)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>

          {/* Corner brackets */}
          {[{ top: 20, left: 20 }, { top: 20, right: 20 }, { bottom: 20, left: 20 }, { bottom: 20, right: 20 }].map((pos, i) => (
            <div key={i} style={{ position: "absolute", width: 24, height: 24, ...pos, borderTop: i < 2 ? `1.5px solid ${MY_COLORS.orangeBorder}` : "none", borderBottom: i >= 2 ? `1.5px solid ${MY_COLORS.orangeBorder}` : "none", borderLeft: i % 2 === 0 ? `1.5px solid ${MY_COLORS.orangeBorder}` : "none", borderRight: i % 2 !== 0 ? `1.5px solid ${MY_COLORS.orangeBorder}` : "none", pointerEvents: "none" }} />
          ))}

          {/* Top accent line */}
          <div style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: 2, background: MY_COLORS.gradientOrange, borderRadius: "0 0 9999px 9999px" }} />

          {/* Eyebrow */}
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, opacity: 0, transform: "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <span style={{ width: 24, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>
              {t("FAQPage.cta.eyebrow")}
            </span>
            <span style={{ width: 24, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>

          {/* Headline */}
          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, lineHeight: FONTS.leading.snug, color: MY_COLORS.textPrimary, margin: "0 auto 16px", maxWidth: 600, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            {t("FAQPage.cta.headlinePre")}{" "}
            <span style={{ color: MY_COLORS.orange, textShadow: `0 0 30px ${MY_COLORS.orangeGlow}` }}>
              {t("FAQPage.cta.headlineHighlight")}
            </span>
          </h2>

          {/* Subtext */}
          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.md, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textSecondary, margin: "0 auto 40px", maxWidth: 480, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            {t("FAQPage.cta.subtext")}
          </p>

          {/* Buttons */}
          <div data-reveal style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <Link to="/contact" onMouseEnter={() => setPrimary(true)} onMouseLeave={() => setPrimary(false)}
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: primaryHover ? 12 : 8, padding: "14px 32px", borderRadius: 10, background: MY_COLORS.gradientOrange, color: "#fff", fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.wide, boxShadow: primaryHover ? `0 0 40px rgba(232,117,10,0.55)` : `0 0 24px rgba(232,117,10,0.35)`, transform: primaryHover ? "translateY(-3px)" : "translateY(0)", transition: "all 0.3s ease" }}>
              {t("FAQPage.cta.primaryButton")} <ArrowRight />
            </Link>
            <Link to="/contact" onMouseEnter={() => setSecond(true)} onMouseLeave={() => setSecond(false)}
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: secondaryHover ? 12 : 8, padding: "14px 32px", borderRadius: 10, background: "transparent", color: secondaryHover ? MY_COLORS.textPrimary : MY_COLORS.textSecondary, border: `1px solid ${secondaryHover ? MY_COLORS.borderHover : MY_COLORS.border}`, fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: FONTS.weight.semibold, letterSpacing: FONTS.tracking.wide, transform: secondaryHover ? "translateY(-3px)" : "translateY(0)", transition: "all 0.3s ease" }}>
              {t("FAQPage.cta.secondaryButton")} <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQBottomCTA;