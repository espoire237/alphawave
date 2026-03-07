/**
 * IndustriesServed — Portfolio Page Section 4 — FULLY RESPONSIVE
 */
import { useEffect, useRef } from "react";
import { INDUSTRIES } from "../../data/portfolioData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const ICONS = {
  cart:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6ZM16 10C16 11.66 14.21 13 12 13C9.79 13 8 11.66 8 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6H21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  finance:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M2 10H22M6 15H10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  leaf:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22C12 22 4 16 4 9C4 5.13 7.13 2 11 2C15 2 20 5 20 10C20 15 12 22 12 22Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M12 22V12M12 12C12 12 8 9 8 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  health:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  book:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 19.5C4 18.12 5.12 17 6.5 17H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M6.5 2H20V22H6.5C5.12 22 4 20.88 4 19.5V4.5C4 3.12 5.12 2 6.5 2Z" stroke="currentColor" strokeWidth="1.7"/></svg>,
  hotel:     <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 22V4C3 2.9 3.9 2 5 2H19C20.1 2 21 2.9 21 4V22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M3 22H21M9 22V17H15V22M9 7H10M14 7H15M9 11H10M14 11H15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  briefcase: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7M12 12V12.01M2 13H22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  truck:     <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M1 3H16V16H1V3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M16 8H20L23 11V16H16V8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.7"/></svg>,
};

const useScrollReveal = (t = 0.08) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.querySelectorAll("[data-reveal]").forEach((item, i) => { setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0)"; }, i * 80); }); obs.disconnect(); }
    }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return ref;
};

const IndustriesServed = () => {
  const sectionRef = useScrollReveal();
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();
  const padding  = isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 40px";
  const gridCols = isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(2,1fr)" : isLargeTablet ? "repeat(4,1fr)" : "repeat(4,1fr)";

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgBase, padding, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(232,117,10,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 56 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange }}>Sectors</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,4vw,48px)", fontWeight: 800, color: MY_COLORS.textPrimary, margin: "0 auto", maxWidth: 600, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            Industries We've <span style={{ color: MY_COLORS.orange }}>Transformed</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 10 : 20 }}>
          {INDUSTRIES.map((industry) => (
            <div key={industry.id} data-reveal
              style={{ padding: isMobile ? "20px 16px" : "28px 24px", borderRadius: 14, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, textAlign: "center", opacity: 0, transform: "translateY(24px)", transition: "all 0.5s ease", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: isMobile ? 44 : 52, height: isMobile ? 44 : 52, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: MY_COLORS.orange, margin: `0 auto ${isMobile ? 12 : 16}px` }}>
                {ICONS[industry.icon]}
              </div>
              <h3 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 12 : FONTS.size.sm, fontWeight: 700, color: MY_COLORS.textPrimary, margin: "0 0 4px" }}>{industry.name}</h3>
              <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: MY_COLORS.orange, marginBottom: isMobile ? 6 : 10 }}>{industry.projects} Projects</div>
              <div style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 11 : FONTS.size.xs, color: MY_COLORS.textMuted, lineHeight: "1.4" }}>{industry.metric}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default IndustriesServed;