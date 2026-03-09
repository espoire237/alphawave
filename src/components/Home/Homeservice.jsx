/**
 * HomeServices — Homepage Section 3 — FULLY RESPONSIVE
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const SERVICES = [
  { id: 1, icon: "code",    title: "Custom Software",        desc: "Web and mobile apps engineered for African infrastructure with global technical standards.",    slug: "custom-software"        },
  { id: 2, icon: "brain",   title: "AI & Data Analytics",    desc: "Turn data into competitive advantage with predictive intelligence and automation.",             slug: "ai-analytics"           },
  { id: 3, icon: "chart",   title: "Digital Marketing",      desc: "Engineer discoverability with SEO and brand strategies that convert visitors into clients.",     slug: "digital-marketing"      },
  { id: 4, icon: "cloud",   title: "Cloud & DevOps",         desc: "Scalable, secure infrastructure with 99.9% uptime and enterprise-grade reliability.",           slug: "cloud-devops"           },
  { id: 5, icon: "mobile",  title: "Mobile Development",     desc: "Offline-first iOS and Android apps optimised for African connectivity.",                        slug: "mobile-first"           },
  { id: 6, icon: "payment", title: "Payment Infrastructure", desc: "MTN MoMo, Orange Money, Airtel Money and international gateways — unified in one system.",     slug: "payment-infrastructure" },
];
const ICONS = {
  code:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 6L2 12L8 18M16 6L22 12L16 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  brain:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4C10.3 4 9 5.3 9 7C9 5.3 7.7 4 6 4C4.3 4 3 5.3 3 7C3 9 4 10.5 6 11.5V20H18V11.5C20 10.5 21 9 21 7C21 5.3 19.7 4 18 4C16.3 4 15 5.3 15 7C15 5.3 13.7 4 12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  chart:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 20H21M5 20V14M9 20V8M13 20V11M17 20V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  cloud:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6.5 19C4 19 2 17 2 14.5C2 12.3 3.6 10.5 5.7 10.1C5.3 9.4 5 8.7 5 8C5 5.8 6.8 4 9 4C10.5 4 11.8 4.8 12.6 6C13.1 5.7 13.8 5.5 14.5 5.5C16.4 5.5 18 7.1 18 9C18 9.3 18 9.6 17.9 9.9C19.7 10.4 21 12 21 14C21 16.2 19.2 18 17 18L6.5 19Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  mobile:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>,
  payment: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M2 10H22M6 15H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
};
const ArrowRight = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const ServiceCard = ({ svc, revealed }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div data-reveal onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ padding: "24px 20px", borderRadius: 14, background: hovered ? "rgba(232,117,10,0.05)" : MY_COLORS.bgSurface, border: `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`, transition: "all 0.3s ease", transform: hovered ? "translateY(-4px)" : "translateY(0)", opacity: revealed ? 1 : 0, position: "relative", overflow: "hidden", boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.3)" : "none" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: MY_COLORS.gradientOrange, opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }} />
      <div style={{ width: 44, height: 44, borderRadius: 11, background: hovered ? MY_COLORS.orangeDim : "rgba(255,255,255,0.04)", border: `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: hovered ? MY_COLORS.orange : MY_COLORS.textMuted, marginBottom: 14, transition: "all 0.3s ease" }}>{ICONS[svc.icon]}</div>
      <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: FONTS.weight.bold, color: MY_COLORS.textPrimary, margin: "0 0 8px" }}>{svc.title}</h3>
      <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textMuted, margin: "0 0 16px" }}>{svc.desc}</p>
      <Link to={`/services#${svc.slug}`} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, color: hovered ? MY_COLORS.orange : MY_COLORS.textDisabled, transition: "color 0.3s ease" }}>Learn More <ArrowRight /></Link>
    </div>
  );
};

const HomeServices = () => {
  const { isMobile, isTablet } = useBreakpoint();
  const sectionRef  = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";
  const padding  = isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 40px";

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgBase, padding, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,117,10,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row", gap: 16, marginBottom: isMobile ? 32 : 56 }}>
          <div>
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
              <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
              <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>What We Do</span>
              <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            </div>
            <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,4vw,48px)", fontWeight: FONTS.weight.extrabold, color: MY_COLORS.textPrimary, margin: 0, opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
              Everything You Need, <span style={{ color: MY_COLORS.orange }}>Under One Roof</span>
            </h2>
          </div>
          <Link data-reveal to="/services" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: FONTS.weight.bold, color: MY_COLORS.orange, opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s", whiteSpace: "nowrap", flexShrink: 0 }}>
            View All Services <ArrowRight />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 12 : 20 }}>
          {SERVICES.map(svc => <ServiceCard key={svc.id} svc={svc} revealed={revealed} />)}
        </div>
      </div>
    </section>
  );
};
export default HomeServices;