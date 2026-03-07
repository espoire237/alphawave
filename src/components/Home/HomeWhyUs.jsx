/**
 * HomeWhyUs — Homepage Section 4 — FULLY RESPONSIVE
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const POINTS = [
  { id: 1, number: "01", title: "Built for African Realities", desc: "Every solution is architected for African infrastructure — intermittent connectivity, mobile-first users, multiple payment providers, and varying device capabilities.", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 3C12 3 8 7 8 12C8 17 12 21 12 21M12 3C12 3 16 7 16 12C16 17 12 21 12 21M3 12H21" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { id: 2, number: "02", title: "One Team, Full Execution",   desc: "Strategy, design, development, AI integration, deployment, and optimization — all under one accountable team. No vendor chaos. Seamless execution, faster delivery.",         icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="4" cy="6" r="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="20" cy="6" r="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="4" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="20" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/><path d="M6 7L10 11M14 13L18 17M18 7L14 11M10 13L6 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { id: 3, number: "03", title: "Results, Not Just Tech",     desc: "We measure success by business outcomes — revenue growth, cost reduction, market expansion. Our clients see an average ROI of 300%+ within 12 months.",                       icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 20H21M5 20V14M9 20V8M13 20V11M17 20V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
];
const ArrowRight = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const HomeWhyUs = () => {
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.querySelectorAll("[data-reveal]").forEach((node, i) => { setTimeout(() => { node.style.opacity = "1"; node.style.transform = "translateY(0)"; }, i * 150); }); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const isSmall   = isMobile || isTablet;
  const padding   = isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 40px";
  const gridCols  = isSmall || isLargeTablet ? "1fr" : "1fr 2fr";

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgSection, padding, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: -200, transform: "translateY(-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(232,117,10,0.06) 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isSmall ? 40 : 80, alignItems: "center" }}>
          {/* Left label */}
          <div>
            <div data-reveal style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
                <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>Why AlphaWaves</span>
              </div>
              <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,3.5vw,44px)", fontWeight: FONTS.weight.extrabold, color: MY_COLORS.textPrimary, margin: "0 0 16px", lineHeight: "1.15" }}>
                Why Businesses <span style={{ color: MY_COLORS.orange }}>Choose Us</span>
              </h2>
              <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textMuted, margin: "0 0 28px" }}>
                African market expertise meets global technical excellence — delivered by one unified team.
              </p>
              {!isSmall && (
                <Link to="/about" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, border: `1px solid ${MY_COLORS.orangeBorder}`, color: MY_COLORS.orange, fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: FONTS.weight.bold, transition: "all 0.3s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.background = MY_COLORS.orangeDim; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  About Us <ArrowRight />
                </Link>
              )}
            </div>
          </div>
          {/* Right — stacked cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 16 }}>
            {POINTS.map((point) => (
              <div key={point.id} data-reveal style={{ display: "flex", gap: isMobile ? 16 : 24, padding: isMobile ? "20px 16px" : "28px", borderRadius: 14, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, opacity: 0, transform: "translateY(24px)", transition: "all 0.6s ease", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: 3, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
                <div style={{ flexShrink: 0, width: isMobile ? 44 : 52, height: isMobile ? 44 : 52, borderRadius: 12, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: MY_COLORS.orange }}>
                  {point.icon}
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.primary, fontSize: 10, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, color: MY_COLORS.orange, marginBottom: 6 }}>{point.number}</div>
                  <h3 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? FONTS.size.base : FONTS.size.md, fontWeight: FONTS.weight.bold, color: MY_COLORS.textPrimary, margin: "0 0 6px" }}>{point.title}</h3>
                  <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textMuted, margin: 0 }}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeWhyUs;