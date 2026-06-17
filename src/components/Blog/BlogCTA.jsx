/**
 * BlogCTA Blog Page Section 5 FULLY RESPONSIVE
 */
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const useScrollReveal = (t = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.querySelectorAll("[data-reveal]").forEach((item, i) => { setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0) scale(1)"; }, i * 130); }); obs.disconnect(); }
    }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return ref;
};

const BlogCTA = () => {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal();
  const { isMobile, isTablet } = useBreakpoint();
  const [p1, setP1] = useState(false);
  const [p2, setP2] = useState(false);
  const sectionPad = isMobile ? "48px 20px 64px" : isTablet ? "64px 32px 80px" : "80px 40px 100px";
  const boxPad     = isMobile ? "32px 20px" : isTablet ? "48px 40px" : "72px 80px";

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgSection, padding: sectionPad, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(232,117,10,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div data-reveal style={{ padding: boxPad, borderRadius: isMobile ? 16 : 24, background: "linear-gradient(135deg, rgba(232,117,10,0.1) 0%, rgba(232,117,10,0.05) 40%, rgba(10,10,10,0.9) 100%)", border: `1px solid ${MY_COLORS.orangeBorder}`, overflow: "hidden", textAlign: "center", position: "relative", opacity: 0, transform: "translateY(30px) scale(0.98)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          {!isMobile && [{top:20,left:20},{top:20,right:20},{bottom:20,left:20},{bottom:20,right:20}].map((pos, i) => <div key={i} style={{ position: "absolute", width: 24, height: 24, ...pos, borderTop: i<2?`1.5px solid ${MY_COLORS.orangeBorder}`:"none", borderBottom: i>=2?`1.5px solid ${MY_COLORS.orangeBorder}`:"none", borderLeft: i%2===0?`1.5px solid ${MY_COLORS.orangeBorder}`:"none", borderRight: i%2!==0?`1.5px solid ${MY_COLORS.orangeBorder}`:"none", pointerEvents:"none" }} />)}
          <div style={{ position: "absolute", top: 0, left: isMobile ? "10%" : "25%", right: isMobile ? "10%" : "25%", height: 2, background: MY_COLORS.gradientOrange, borderRadius: "0 0 9999px 9999px" }} />
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: isMobile ? 14 : 20, opacity: 0, transform: "translateY(16px)", transition: "all 0.6s ease" }}>
            <span style={{ width: 24, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange }}>{t("blogPage.cta.eyebrow")}</span>
            <span style={{ width: 24, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,4vw,52px)", fontWeight: 800, color: MY_COLORS.textPrimary, margin: `0 auto ${isMobile ? 12 : 16}px`, maxWidth: 600, lineHeight: "1.15", opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            {t("blogPage.cta.headlinePart1")} <span style={{ color: MY_COLORS.orange }}>{t("blogPage.cta.headlineAccent")}</span>
          </h2>
          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? FONTS.size.sm : FONTS.size.md, lineHeight: "1.7", color: MY_COLORS.textSecondary, margin: `0 auto ${isMobile ? 24 : 40}px`, maxWidth: 520, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            {t("blogPage.cta.description")}
          </p>
          <div data-reveal style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 12 : 16, flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            <Link to="/contact" onMouseEnter={() => setP1(true)} onMouseLeave={() => setP1(false)}
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: p1 ? 12 : 8, padding: isMobile ? "13px 24px" : "14px 32px", borderRadius: 10, background: MY_COLORS.gradientOrange, color: "#fff", fontFamily: FONTS.primary, fontSize: isMobile ? FONTS.size.sm : FONTS.size.base, fontWeight: 700, boxShadow: p1 ? "0 0 40px rgba(232,117,10,0.55)" : "0 0 24px rgba(232,117,10,0.35)", transform: p1 ? "translateY(-3px)" : "translateY(0)", transition: "all 0.3s ease", width: isMobile ? "100%" : "auto" }}>
              {t("blogPage.cta.primaryBtn")} <ArrowRight />
            </Link>
            <Link to="/services" onMouseEnter={() => setP2(true)} onMouseLeave={() => setP2(false)}
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: p2 ? 12 : 8, padding: isMobile ? "13px 24px" : "14px 32px", borderRadius: 10, background: "transparent", color: p2 ? MY_COLORS.textPrimary : MY_COLORS.textSecondary, border: `1px solid ${p2 ? MY_COLORS.borderHover : MY_COLORS.border}`, fontFamily: FONTS.primary, fontSize: isMobile ? FONTS.size.sm : FONTS.size.base, fontWeight: 600, transform: p2 ? "translateY(-3px)" : "translateY(0)", transition: "all 0.3s ease", width: isMobile ? "100%" : "auto" }}>
              {t("blogPage.cta.secondaryBtn")} <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BlogCTA;