import { useEffect, useRef } from "react";
import { DIFFERENTIATORS } from "../../data/serviceData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

const ICONS = {
  africa: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 14C8 14 9 17 12 17C15 17 16 14 16 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="9"  cy="10" r="1" fill="currentColor"/>
      <circle cx="15" cy="10" r="1" fill="currentColor"/>
    </svg>
  ),
  network: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="4"  cy="6"  r="2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="20" cy="6"  r="2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="4"  cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="20" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M6 7L10 11M14 13L18 17M18 7L14 11M10 13L6 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  ai: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 10H9M11 10H13M15 10H17M7 14H11M13 14H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M8 6V4M16 6V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  trophy: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M8 21H16M12 17V21M7 3H17V10C17 13.31 14.76 16 12 16C9.24 16 7 13.31 7 10V3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M7 5H3V9C3 11.21 4.79 13 7 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M17 5H21V9C21 11.21 19.21 13 17 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

const useScrollReveal = (threshold = 0.08) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll("[data-reveal]").forEach((item, i) => {
          setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0)"; }, i * 120);
        });
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

const WhyChooseUs = () => {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgSection, padding: "100px 0", overflow: "hidden" }}>

      <div style={{ position: "absolute", top: "50%", right: -200, transform: "translateY(-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>Why AlphaWaves</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>

          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, color: MY_COLORS.textPrimary, margin: "0 auto 16px", maxWidth: 600, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            What Makes Us{" "}
            <span style={{ color: MY_COLORS.orange, textShadow: `0 0 30px ${MY_COLORS.orangeGlow}` }}>Different</span>
          </h2>

          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.md, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textSecondary, margin: "0 auto", maxWidth: 500, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            African market expertise meets global technical excellence.
          </p>
        </div>

        {/* 2x2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {DIFFERENTIATORS.map((item, i) => (
            <div
              key={item.id}
              data-reveal
              style={{
                padding:      "40px 36px",
                borderRadius: 16,
                background:   MY_COLORS.bgSurface,
                border:       `1px solid ${MY_COLORS.border}`,
                display:      "flex",
                gap:          24,
                opacity:      0,
                transform:    "translateY(24px)",
                transition:   "all 0.6s ease",
              }}
            >
              {/* Icon */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: MY_COLORS.orange }}>
                  {ICONS[item.icon]}
                </div>
              </div>

              {/* Text */}
              <div>
                {/* Number */}
                <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, color: MY_COLORS.orange, marginBottom: 8 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.md, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.tight, color: MY_COLORS.textPrimary, margin: "0 0 10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textMuted, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`@media (max-width: 768px) { .why-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

export default WhyChooseUs;