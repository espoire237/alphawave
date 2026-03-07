/**
 * HomePortfolioTeaser — Homepage Section 6 — FULLY RESPONSIVE
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const FEATURED = [
  { id: 1, slug: "ecommerce-fashion-retailer", category: "E-commerce",  title: "Fashion E-commerce Platform", metric: "250%", metricLabel: "Revenue Increase",  tech: ["React.js", "MTN MoMo"], accent: MY_COLORS.orange },
  { id: 2, slug: "fintech-lending-platform",   category: "Fintech",     title: "AI Lending Platform",         metric: "70%",  metricLabel: "Faster Approvals",   tech: ["Python", "AI/ML"],      accent: "#60a5fa"       },
  { id: 3, slug: "agricultural-marketplace",   category: "Agriculture", title: "Farmer Marketplace App",      metric: "500+", metricLabel: "Farmers Empowered",  tech: ["React Native", "Maps"], accent: "#4ade80"       },
];

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div data-reveal onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 16, background: MY_COLORS.bgSurface, border: `1px solid ${hovered ? project.accent + "55" : MY_COLORS.border}`, overflow: "hidden", transition: "all 0.3s ease", transform: hovered ? "translateY(-5px)" : "translateY(0)", opacity: 0, boxShadow: hovered ? `0 16px 48px ${project.accent}18` : "none" }}>
      {/* Visual header */}
      <div style={{ height: 180, background: `linear-gradient(135deg, ${project.accent}22 0%, rgba(10,10,10,0.95) 100%)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ fontFamily: FONTS.primary, fontSize: 72, fontWeight: 800, color: `${project.accent}12`, lineHeight: 1, userSelect: "none" }}>
          {project.title.split(" ").map(w => w[0]).join("").slice(0, 2)}
        </div>
        <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 12px", borderRadius: 9999, background: "rgba(10,10,10,0.75)", border: `1px solid ${project.accent}44`, fontFamily: FONTS.primary, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: project.accent, backdropFilter: "blur(8px)" }}>
          {project.category}
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 12, textAlign: "right" }}>
          <div style={{ fontFamily: FONTS.primary, fontSize: 26, fontWeight: 800, color: project.accent, lineHeight: 1, textShadow: `0 0 20px ${project.accent}66` }}>{project.metric}</div>
          <div style={{ fontFamily: FONTS.secondary, fontSize: 10, color: MY_COLORS.textMuted }}>{project.metricLabel}</div>
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: "20px" }}>
        <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: 700, color: MY_COLORS.textPrimary, margin: "0 0 10px" }}>{project.title}</h3>
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{ padding: "3px 10px", borderRadius: 9999, background: "rgba(255,255,255,0.04)", border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.secondary, fontSize: 10, color: MY_COLORS.textMuted }}>{t}</span>
          ))}
        </div>
        <Link to={`/portfolio/${project.slug}`} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: hovered ? 10 : 6, fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, color: hovered ? project.accent : MY_COLORS.textMuted, transition: "all 0.3s ease", paddingTop: 12, borderTop: `1px solid ${MY_COLORS.border}`, width: "100%" }}>
          View Case Study <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

const HomePortfolioTeaser = () => {
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();
  const sectionRef = useRef(null);
  const [ctaH, setCtaH] = useState(false);

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll("[data-reveal]").forEach((node, i) => {
          setTimeout(() => { node.style.opacity = "1"; node.style.transform = "translateY(0)"; node.style.transition = "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease"; }, i * 120);
        });
        obs.disconnect();
      }
    }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const padding  = isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 40px";
  const gridCols = isMobile ? "1fr" : isTablet || isLargeTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgSection, padding, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(232,117,10,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row", gap: 16, marginBottom: isMobile ? 28 : 56 }}>
          <div>
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
              <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
              <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange }}>Our Work</span>
              <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            </div>
            <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,4vw,48px)", fontWeight: 800, color: MY_COLORS.textPrimary, margin: 0, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
              Real Projects. <span style={{ color: MY_COLORS.orange }}>Real Results.</span>
            </h2>
          </div>
          <Link to="/portfolio" data-reveal onMouseEnter={() => setCtaH(true)} onMouseLeave={() => setCtaH(false)}
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ctaH ? 10 : 6, padding: "10px 20px", borderRadius: 10, border: `1px solid ${ctaH ? MY_COLORS.orange : MY_COLORS.border}`, color: ctaH ? MY_COLORS.orange : MY_COLORS.textMuted, fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: 700, transition: "all 0.3s ease", opacity: 0, transform: "translateY(20px)", whiteSpace: "nowrap", flexShrink: 0 }}>
            View All Projects <ArrowRight />
          </Link>
        </div>
        {/* Grid — on mobile shows only first 2 projects */}
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 14 : 24 }}>
          {(isMobile ? FEATURED.slice(0, 2) : FEATURED).map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
        {/* Mobile — show all CTA */}
        {isMobile && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link to="/portfolio" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 24px", borderRadius: 10, border: `1px solid ${MY_COLORS.border}`, color: MY_COLORS.textMuted, fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: 700, transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orange; e.currentTarget.style.color = MY_COLORS.orange; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}>
              See All Projects <ArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default HomePortfolioTeaser;