/**
 * MissionVision About Page Section 3
 * AlphaWaves brand system FULLY RESPONSIVE
 */

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll("[data-reveal]").forEach((item, i) => {
          setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0) scale(1)"; }, i * 150);
        });
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

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

const EyeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M2 14C2 14 6 6 14 6C22 6 26 14 26 14C26 14 22 22 14 22C6 22 2 14 2 14Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="14" cy="14" r="1.5" fill="currentColor"/>
  </svg>
);

const MissionVision = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useBreakpoint();
  const sectionRef = useScrollReveal(0.1);

  // ✅ CARDS array inside component so t() is in scope
  const CARDS = [
    {
      id:      "mission",
      icon:    <TargetIcon />,
      label:   t("missionVision.mission.label"),
      title:   t("missionVision.mission.title"),
      content: t("missionVision.mission.content"),
      accent:  true,
    },
    {
      id:      "vision",
      icon:    <EyeIcon />,
      label:   t("missionVision.vision.label"),
      title:   t("missionVision.vision.title"),
      content: t("missionVision.vision.content"),
      accent:  false,
    },
  ];

  const isSingleCol   = isMobile || isTablet;
  const sectionPadY   = isMobile ? "64px" : isTablet ? "80px" : "100px";
  const outerPadX     = isMobile ? "20px" : isTablet ? "32px" : "40px";
  const headerMB      = isMobile ? 40 : isTablet ? 52 : 72;
  const gridCols      = isSingleCol ? "1fr" : "1fr 1fr";
  const gridGap       = isMobile ? 16 : 24;
  const cardPadding   = isMobile ? "28px 20px" : isTablet ? "36px 28px" : "48px 44px";
  const cardRadius    = isMobile ? 16 : 20;
  const quotePadding  = isMobile ? "28px 20px" : isTablet ? "32px 28px" : "40px 48px";
  const quoteMT       = isMobile ? 32 : isTablet ? 48 : 64;
  const h3Size        = isMobile ? "clamp(20px,5vw,24px)" : "clamp(22px,2vw,28px)";
  const subtitleMaxW  = isMobile ? "100%" : 520;
  const cardBodySize  = isMobile ? FONTS.size.sm : FONTS.size.base;
  const quoteTextSize = isMobile ? "clamp(14px,4vw,17px)" : "clamp(16px,2vw,22px)";
  const iconBoxSize   = isMobile ? 46 : 56;
  const iconBoxMB     = isMobile ? 20 : 32;

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgBase, padding: `${sectionPadY} 0`, overflow: "hidden" }}>

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: isMobile ? 400 : 800, height: isMobile ? 200 : 400, borderRadius: "50%", background: `radial-gradient(ellipse, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${outerPadX}`, position: "relative", boxSizing: "border-box" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: headerMB }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>
              {t("missionVision.eyebrow")}
            </span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>

          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(26px,7vw,36px)" : isTablet ? "clamp(28px,4vw,40px)" : "clamp(32px,3.5vw,48px)", fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, lineHeight: FONTS.leading.snug, color: MY_COLORS.textPrimary, margin: "0 0 16px 0", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            {t("missionVision.title")}{" "}
            <span style={{ color: MY_COLORS.orange, textShadow: `0 0 30px ${MY_COLORS.orangeGlow}` }}>
              {t("missionVision.titleAccent")}
            </span>
          </h2>

          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? FONTS.size.sm : FONTS.size.md, fontWeight: FONTS.weight.regular, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textMuted, maxWidth: subtitleMaxW, margin: "0 auto", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            {t("missionVision.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: gridGap, position: "relative" }}>
          {!isSingleCol && (
            <div style={{ position: "absolute", left: "50%", top: 40, bottom: 40, width: 1, background: `linear-gradient(to bottom, transparent, ${MY_COLORS.orangeBorder}, transparent)`, pointerEvents: "none", transform: "translateX(-50%)" }} />
          )}

          {CARDS.map((card) => (
            <div key={card.id} data-reveal style={{ position: "relative", padding: cardPadding, borderRadius: cardRadius, background: card.accent ? `linear-gradient(135deg, rgba(232,117,10,0.12) 0%, rgba(232,117,10,0.04) 100%)` : MY_COLORS.bgSurface, border: `1px solid ${card.accent ? MY_COLORS.orangeBorder : MY_COLORS.border}`, overflow: "hidden", transition: "transform 0.3s ease, box-shadow 0.3s ease", opacity: 0, transform: "translateY(30px) scale(0.98)", boxSizing: "border-box" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px) scale(1)"; e.currentTarget.style.boxShadow = card.accent ? "0 20px 60px rgba(232,117,10,0.2)" : "0 20px 60px rgba(0,0,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              {card.accent && (
                <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,117,10,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
              )}
              <div style={{ width: iconBoxSize, height: iconBoxSize, borderRadius: isMobile ? 12 : 14, background: card.accent ? MY_COLORS.orangeDim : MY_COLORS.bgSurfaceHover, border: `1px solid ${card.accent ? MY_COLORS.orangeBorder : MY_COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: MY_COLORS.orange, marginBottom: iconBoxMB, flexShrink: 0 }}>
                {card.icon}
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 9999, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, marginBottom: 16 }}>
                <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.wider, textTransform: "uppercase", color: MY_COLORS.orange }}>
                  {card.label}
                </span>
              </div>
              <h3 style={{ fontFamily: FONTS.primary, fontSize: h3Size, fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, lineHeight: FONTS.leading.snug, color: MY_COLORS.textPrimary, margin: "0 0 20px 0" }}>
                {card.title}
              </h3>
              <div style={{ width: 48, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange, marginBottom: isMobile ? 14 : 20 }} />
              <p style={{ fontFamily: FONTS.secondary, fontSize: cardBodySize, fontWeight: FONTS.weight.regular, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textSecondary, margin: 0 }}>
                {card.content}
              </p>
              {card.accent && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, borderRadius: "0 0 20px 20px", background: MY_COLORS.gradientOrange, opacity: 0.6 }} />
              )}
            </div>
          ))}
        </div>

        {/* Quote */}
        <div data-reveal style={{ textAlign: "center", marginTop: quoteMT, padding: quotePadding, borderRadius: isMobile ? 12 : 16, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, position: "relative", overflow: "hidden", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease", boxSizing: "border-box" }}>
          {!isMobile && (
            <div style={{ position: "absolute", top: 16, left: 32, fontFamily: FONTS.primary, fontSize: 120, fontWeight: FONTS.weight.extrabold, color: MY_COLORS.orangeDim, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>"</div>
          )}
          <p style={{ fontFamily: FONTS.primary, fontSize: quoteTextSize, fontWeight: FONTS.weight.semibold, letterSpacing: FONTS.tracking.tight, lineHeight: FONTS.leading.normal, color: MY_COLORS.textPrimary, margin: "0 auto 16px", position: "relative", maxWidth: isMobile ? "100%" : 700 }}>
            {t("missionVision.quote")}{" "}
            <span style={{ color: MY_COLORS.orange }}>{t("missionVision.quoteAccent")}</span>{" "}
            {t("missionVision.quoteEnd")}
          </p>
          <span style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 10 : FONTS.size.sm, fontWeight: FONTS.weight.medium, color: MY_COLORS.textMuted, letterSpacing: FONTS.tracking.wider, textTransform: "uppercase" }}>
            {t("missionVision.quoteAuthor")}
          </span>
        </div>

      </div>
    </section>
  );
};

export default MissionVision;