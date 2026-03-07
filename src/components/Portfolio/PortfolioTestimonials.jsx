/**
 * PortfolioTestimonials — Portfolio Page Section 5 — FULLY RESPONSIVE
 */
import { useState, useEffect, useRef } from "react";
import { PROJECTS } from "../../data/portfolioData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const StarIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill={MY_COLORS.orange}><path d="M8 1L9.8 6H15L10.6 9.2L12.4 14.2L8 11L3.6 14.2L5.4 9.2L1 6H6.2L8 1Z"/></svg>;
const ChevronLeft  = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevronRight = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const useScrollReveal = (t = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.querySelectorAll("[data-reveal]").forEach((item, i) => { setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0)"; }, i * 130); }); obs.disconnect(); }
    }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return ref;
};

const PortfolioTestimonials = () => {
  const sectionRef = useScrollReveal();
  const { isMobile, isTablet } = useBreakpoint();
  const testimonials = PROJECTS.filter(p => p.testimonial && p.status === "published").map(p => ({ ...p.testimonial, project: p.project_name }));
  const [active, setActive]       = useState(0);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => goTo((active + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [active, testimonials.length]);
  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive(index); setAnimating(false); }, 300);
  };
  if (!testimonials.length) return null;
  const current = testimonials[active];

  const padding  = isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 40px";
  const cardPad  = isMobile ? "28px 20px" : isTablet ? "40px 36px" : "52px 60px";
  const quoteSize = isMobile ? "clamp(14px,4vw,16px)" : "clamp(16px,2vw,19px)";

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgSection, padding, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 56 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange }}>Client Voices</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,4vw,48px)", fontWeight: 800, color: MY_COLORS.textPrimary, margin: 0, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            What Our <span style={{ color: MY_COLORS.orange }}>Clients Say</span>
          </h2>
        </div>
        <div data-reveal style={{ maxWidth: isMobile ? "100%" : 800, margin: "0 auto", opacity: 0, transform: "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ padding: cardPad, borderRadius: isMobile ? 16 : 20, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, textAlign: "center", position: "relative", overflow: "hidden", opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
            <div style={{ position: "absolute", top: 0, left: isMobile ? "20%" : "30%", right: isMobile ? "20%" : "30%", height: 2, background: MY_COLORS.gradientOrange, borderRadius: "0 0 9999px 9999px" }} />
            {/* Quote mark — hidden on smallest mobile */}
            {!isMobile && <div style={{ fontFamily: "Georgia, serif", fontSize: 96, lineHeight: 0.7, color: MY_COLORS.orangeBorder, marginBottom: 24, userSelect: "none" }}>"</div>}
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: isMobile ? 14 : 24 }}>{Array(current.rating).fill(0).map((_, i) => <StarIcon key={i} />)}</div>
            <p style={{ fontFamily: FONTS.secondary, fontSize: quoteSize, lineHeight: "1.8", color: MY_COLORS.textSecondary, margin: `0 0 ${isMobile ? 20 : 32}px`, fontStyle: "italic" }}>"{current.quote}"</p>
            <div style={{ width: 48, height: 2, background: MY_COLORS.gradientOrange, borderRadius: 9999, margin: `0 auto ${isMobile ? 16 : 24}px` }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: 700, color: MY_COLORS.orange, flexShrink: 0 }}>{current.author[0]}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: 700, color: MY_COLORS.textPrimary }}>{current.author}</div>
                <div style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted }}>{current.title} · {current.company}</div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <span style={{ padding: "4px 14px", borderRadius: 9999, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 600, color: MY_COLORS.orange }}>{current.project}</span>
            </div>
          </div>
          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 28 }}>
            <button onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)} style={{ width: 38, height: 38, borderRadius: "50%", background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, color: MY_COLORS.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }} onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orange; e.currentTarget.style.color = MY_COLORS.orange; }} onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}><ChevronLeft /></button>
            {testimonials.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 9999, background: i === active ? MY_COLORS.orange : MY_COLORS.border, border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />)}
            <button onClick={() => goTo((active + 1) % testimonials.length)} style={{ width: 38, height: 38, borderRadius: "50%", background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, color: MY_COLORS.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }} onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orange; e.currentTarget.style.color = MY_COLORS.orange; }} onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}><ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PortfolioTestimonials;