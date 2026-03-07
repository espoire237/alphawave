/**
 * HomeProcess — Homepage Section 7 — FULLY RESPONSIVE
 */
import { useEffect, useRef } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const STEPS = [
  { id: 1, number: "01", title: "Discover & Strategise", desc: "We deep-dive into your business goals, market position, and technical challenges. We define what success looks like — in numbers." },
  { id: 2, number: "02", title: "Build & Integrate",     desc: "Our engineers build your solution with sprint-based delivery, regular demos, and quality assurance baked in at every stage." },
  { id: 3, number: "03", title: "Launch & Grow",         desc: "We deploy, monitor, and continuously optimise. Post-launch support, data-driven improvements, and scaling as you grow." },
];

const HomeProcess = () => {
  const { isMobile, isTablet } = useBreakpoint();
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.querySelectorAll("[data-reveal]").forEach((node, i) => { setTimeout(() => { node.style.opacity = "1"; node.style.transform = "translateY(0)"; }, i * 180); }); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const padding  = isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 40px";
  const isSmall  = isMobile || isTablet;

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgBase, padding, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", right: -100, transform: "translateY(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,117,10,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange }}>How It Works</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,4vw,48px)", fontWeight: 800, color: MY_COLORS.textPrimary, margin: 0, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            From Idea to <span style={{ color: MY_COLORS.orange }}>Impact</span> in 3 Steps
          </h2>
        </div>

        {/* Steps — horizontal on desktop, vertical stack on mobile/tablet */}
        {isSmall ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {STEPS.map((step, i) => (
              <div key={step.id} data-reveal style={{ display: "flex", gap: 20, opacity: 0, transform: "translateY(28px)", transition: "all 0.6s ease" }}>
                {/* Left — circle + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: MY_COLORS.bgSurface, border: `2px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(232,117,10,0.2)", flexShrink: 0 }}>
                    <span style={{ fontFamily: FONTS.primary, fontSize: 13, fontWeight: 700, color: MY_COLORS.orange }}>{step.number}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 32, background: `linear-gradient(to bottom, ${MY_COLORS.orangeBorder}, transparent)`, margin: "8px 0" }} />
                  )}
                </div>
                {/* Right — text */}
                <div style={{ paddingBottom: i < STEPS.length - 1 ? 32 : 0 }}>
                  <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.md, fontWeight: 700, color: MY_COLORS.textPrimary, margin: "12px 0 8px", lineHeight: "1.3" }}>{step.title}</h3>
                  <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, lineHeight: "1.7", color: MY_COLORS.textMuted, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            {/* Connector line */}
            <div style={{ position: "absolute", top: 44, left: "17%", right: "17%", height: 1, background: `linear-gradient(to right, transparent, ${MY_COLORS.orangeBorder}, transparent)`, zIndex: 0 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, position: "relative", zIndex: 1 }}>
              {STEPS.map(step => (
                <div key={step.id} data-reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", opacity: 0, transform: "translateY(28px)", transition: "all 0.6s ease" }}>
                  <div style={{ width: 88, height: 88, borderRadius: "50%", background: MY_COLORS.bgSurface, border: `2px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 0 32px rgba(232,117,10,0.18)", position: "relative" }}>
                    <span style={{ fontFamily: FONTS.primary, fontSize: 13, fontWeight: 700, color: MY_COLORS.orange }}>{step.number}</span>
                    <div style={{ position: "absolute", inset: -6, borderRadius: "50%", border: "1px solid rgba(232,117,10,0.15)" }} />
                  </div>
                  <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.md, fontWeight: 700, color: MY_COLORS.textPrimary, margin: "0 0 12px" }}>{step.title}</h3>
                  <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, lineHeight: "1.7", color: MY_COLORS.textMuted, margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default HomeProcess;