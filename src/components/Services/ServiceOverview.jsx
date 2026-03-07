import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "../../data/serviceData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

// ── Service icons ─────────────────────────────────────────────
const ICONS = {
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M8 6L2 12L8 18M16 6L22 12L16 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  brain: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 4C10.3 4 9 5.3 9 7C9 5.3 7.7 4 6 4C4.3 4 3 5.3 3 7C3 9 4 10.5 6 11.5V20H18V11.5C20 10.5 21 9 21 7C21 5.3 19.7 4 18 4C16.3 4 15 5.3 15 7C15 5.3 13.7 4 12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  chart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M3 20H21M5 20V14M9 20V8M13 20V11M17 20V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  cloud: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M6.5 19C4 19 2 17 2 14.5C2 12.3 3.6 10.5 5.7 10.1C5.3 9.4 5 8.7 5 8C5 5.8 6.8 4 9 4C10.5 4 11.8 4.8 12.6 6C13.1 5.7 13.8 5.5 14.5 5.5C16.4 5.5 18 7.1 18 9C18 9.3 18 9.6 17.9 9.9C19.7 10.4 21 12 21 14C21 16.2 19.2 18 17 18L6.5 19Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  mobile: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
    </svg>
  ),
  payment: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M2 10H22" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M6 15H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
};

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <circle cx="6.5" cy="6.5" r="6.5" fill="rgba(232,117,10,0.15)"/>
    <path d="M4 6.5L5.8 8.5L9 4.5" stroke="#E8750A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const useScrollReveal = (threshold = 0.08) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll("[data-reveal]").forEach((item, i) => {
          setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0)"; }, i * 100);
        });
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     "relative",
        padding:      "32px 28px",
        borderRadius: 16,
        background:   hovered ? "rgba(232,117,10,0.05)" : MY_COLORS.bgSurface,
        border:       `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        cursor:       "pointer",
        transition:   "all 0.3s ease",
        transform:    hovered ? "translateY(-4px)" : "translateY(0)",
        opacity:      0,
        display:      "flex",
        flexDirection:"column",
        gap:          0,
      }}
    >
      {/* Featured badge */}
      {service.is_featured && (
        <div style={{
          position:      "absolute",
          top:           16,
          right:         16,
          padding:       "3px 10px",
          borderRadius:  9999,
          background:    MY_COLORS.orangeDim,
          border:        `1px solid ${MY_COLORS.orangeBorder}`,
          fontFamily:    FONTS.primary,
          fontSize:      10,
          fontWeight:    FONTS.weight.bold,
          letterSpacing: FONTS.tracking.widest,
          textTransform: "uppercase",
          color:         MY_COLORS.orange,
        }}>
          Popular
        </div>
      )}

      {/* Number */}
      <div style={{
        fontFamily:    FONTS.primary,
        fontSize:      11,
        fontWeight:    FONTS.weight.bold,
        letterSpacing: FONTS.tracking.widest,
        color:         MY_COLORS.textDisabled,
        marginBottom:  16,
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div style={{
        width:        52,
        height:       52,
        borderRadius: 12,
        background:   hovered ? MY_COLORS.orangeDim : "rgba(255,255,255,0.04)",
        border:       `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        color:        hovered ? MY_COLORS.orange : MY_COLORS.textMuted,
        marginBottom: 20,
        transition:   "all 0.3s ease",
      }}>
        {ICONS[service.icon]}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily:    FONTS.primary,
        fontSize:      FONTS.size.md,
        fontWeight:    FONTS.weight.bold,
        letterSpacing: FONTS.tracking.tight,
        color:         MY_COLORS.textPrimary,
        margin:        "0 0 10px",
        lineHeight:    FONTS.leading.snug,
      }}>
        {service.title}
      </h3>

      {/* Desc */}
      <p style={{
        fontFamily:  FONTS.secondary,
        fontSize:    FONTS.size.sm,
        lineHeight:  FONTS.leading.relaxed,
        color:       MY_COLORS.textMuted,
        margin:      "0 0 20px",
        flex:        1,
      }}>
        {service.shortDesc}
      </p>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
        {service.features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ marginTop: 1, flexShrink: 0 }}><CheckIcon /></span>
            <span style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textSecondary, lineHeight: FONTS.leading.relaxed }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* Link */}
      <Link
        to="/contact"
        style={{
          textDecoration: "none",
          display:        "inline-flex",
          alignItems:     "center",
          gap:            6,
          fontFamily:     FONTS.primary,
          fontSize:       FONTS.size.xs,
          fontWeight:     FONTS.weight.bold,
          letterSpacing:  FONTS.tracking.wide,
          color:          hovered ? MY_COLORS.orange : MY_COLORS.textMuted,
          transition:     "color 0.3s ease",
        }}
      >
        Get Started <ArrowRight />
      </Link>

      {/* Bottom orange bar on hover */}
      <div style={{
        position:     "absolute",
        bottom:       0, left: "10%", right: "10%",
        height:       2,
        borderRadius: "9999px 9999px 0 0",
        background:   MY_COLORS.gradientOrange,
        opacity:      hovered ? 1 : 0,
        transition:   "opacity 0.3s ease",
      }} />
    </div>
  );
};

const ServicesOverview = () => {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgBase, padding: "100px 0", overflow: "hidden" }}>

      {/* Background glow */}
      <div style={{ position: "absolute", top: -200, left: -200, width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>
              What We Build
            </span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>

          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, color: MY_COLORS.textPrimary, margin: "0 auto 16px", maxWidth: 700, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            Complete Digital Solutions{" "}
            <span style={{ color: MY_COLORS.orange, textShadow: `0 0 30px ${MY_COLORS.orangeGlow}` }}>Under One Roof</span>
          </h2>

          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.md, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textSecondary, margin: "0 auto", maxWidth: 560, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
            From strategy to execution, we deliver integrated technology that drives measurable business outcomes.
          </p>
        </div>

        {/* 6-card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {SERVICES.filter(s => s.status === "published").map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default ServicesOverview;