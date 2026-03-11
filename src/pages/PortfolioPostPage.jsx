/**
 * PortfolioPostPage — Project Detail Page (Redesigned)
 * AlphaWaves brand system
 *
 * Route: /portfolio/:slug
 *
 * Sections:
 * 1.  Hero            — title, category, client, back button, reading progress
 * 2.  Cover Visual    — cinematic project banner
 * 3.  Project Brief   — quick meta strip (type, industry, status, client)
 * 4.  Description     — rich detailed project overview  ← NEW
 * 5.  Challenge       — the problem statement
 * 6.  Solution        — what was built + key deliverables
 * 7.  Results         — animated metric cards  ← FIXED
 * 8.  Tech Stack      — technologies used
 * 9.  Testimonial     — client quote (if available)
 * 10. Related         — 3 other projects
 * 11. CTA             — start your project
 */

import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PROJECTS, CATEGORIES } from "../data/portfolioData.js";
import { MY_COLORS } from "../constants/colors.js";
import { FONTS } from "../assets/fonts/fonts.js";
import useBreakpoint from "../hooks/useBreakpoint.js";

/* ─────────────────────────── Icons ─────────────────────────────── */
const ArrowLeft  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CheckIcon  = () => <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke={MY_COLORS.orange} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const StarIcon   = () => <svg width="14" height="14" viewBox="0 0 16 16" fill={MY_COLORS.orange}><path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z"/></svg>;
const QuoteIcon  = () => <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M8 26c0-6.8 4.3-11.8 10-13.6l1.8 3C16 17.2 14.2 20 13.6 23.5H18V33H8V26zm14 0c0-6.8 4.3-11.8 10-13.6l1.8 3C30 17.2 28.2 20 27.6 23.5H32V33H22V26z" fill={MY_COLORS.orange} opacity="0.25"/></svg>;
const CalendarIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M5 1v2M11 1v2M2 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
const LayersIcon   = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1L14 4.5L8 8L2 4.5L8 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M2 8L8 11.5L14 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 11.5L8 15L14 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const UserIcon     = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
const GlobeIcon    = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M8 2c-2 2-3 3.6-3 6s1 4 3 6M8 2c2 2 3 3.6 3 6s-1 4-3 6M2 8h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;

/* ─────────────────── Tech color map ────────────────────────────── */
const TECH_COLORS = {
  "React.js": "#61DAFB", "React Native": "#61DAFB",
  "Node.js": "#68A063", "Next.js": "#ffffff",
  "Python": "#FFD43B", "FastAPI": "#009688",
  "MongoDB": "#47A248", "PostgreSQL": "#336791",
  "MySQL": "#4479A1", "Vue.js": "#42B883",
  "MTN MoMo": "#FFCC00", "Orange Money": "#FF6600",
  "Stripe": "#635BFF", "AI/ML": "#E8750A",
  "SMS Integration": "#34B7F1", "Video Streaming": "#FF0000",
  "Booking Engine API": "#00B4D8", "Google Maps API": "#4285F4",
};

/* ─────────────────── Description paragraphs builder ───────────────
   Generates rich contextual paragraphs from project data fields.
─────────────────────────────────────────────────────────────────── */
const buildDescription = (post) => {
  const catMap = {
    ecommerce:   "e-commerce and retail",
    agriculture: "agricultural technology",
    healthcare:  "healthcare management",
    finance:     "financial technology",
    hospitality: "hospitality management",
    education:   "education technology",
  };
  const typeMap = {
    web:    "web application",
    mobile: "mobile application",
    ai:     "AI-powered platform",
  };
  const cat  = catMap[post.industry_category]  || post.industry_category;
  const type = typeMap[post.project_type]      || "digital solution";
  const client = post.client_confidential ? "a confidential client" : post.client_name;

  return [
    `${post.project_name} is a comprehensive ${type} built for ${client} operating in the ${cat} sector. ${post.short_description}`,
    `The project was conceived to address a real, measurable gap in the market. ${post.challenge_description} This created an urgent need for a robust, scalable digital solution that could function reliably under the unique conditions of the African technology landscape — including variable connectivity, diverse payment preferences, and mobile-first user behaviour.`,
    `${post.solution_description} The result is a platform that genuinely serves the people who use it every day — from the business operators managing their workflow to the end-users interacting with the product on their phones.`,
    `Every decision made throughout development — from technology selection to UX flows — was guided by real-world constraints and the goal of maximising impact. The technologies chosen (${post.technologies.slice(0, 3).join(", ")}) were selected specifically for their performance in the target deployment environment.`,
  ];
};

/* ────────────────────── Reading Progress Bar ───────────────────── */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(100, pct));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: "rgba(255,255,255,0.05)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: MY_COLORS.gradientOrange, transition: "width 0.1s linear", borderRadius: "0 2px 2px 0" }} />
    </div>
  );
};

/* ─────────────────── Scroll-reveal wrapper ─────────────────────── */
const Reveal = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {typeof children === "function" ? children(vis) : children}
    </div>
  );
};

/* ────────────────────── Animated counter ───────────────────────── */
const useCountUp = (rawValue, active, duration = 1600) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseFloat(String(rawValue).replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setVal(rawValue); return; }
    const start = performance.now();
    const tick = (now) => {
      const t    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * num));
      if (t < 1) requestAnimationFrame(tick);
      else       setVal(num);
    };
    requestAnimationFrame(tick);
  }, [active, rawValue, duration]);
  return val;
};

/* ──────────────── Metric card (properly fixed) ─────────────────── */
const MetricCard = ({ result, active, index, isMobile }) => {
  const [hovered, setHovered] = useState(false);
  const raw     = String(result.value);
  const num     = parseFloat(raw.replace(/[^0-9.]/g, ""));
  const prefix  = raw.match(/^[^0-9]*/)?.[0]  || "";
  const suffix  = raw.match(/[^0-9.]+$/)?.[0] || "";
  const counted = useCountUp(raw, active);
  const display = isNaN(num) ? raw : `${prefix}${counted}${suffix}`;

  return (
    <Reveal delay={index * 0.1}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: isMobile ? "24px 16px" : "32px 24px",
          borderRadius: 16,
          background: hovered ? "rgba(232,117,10,0.08)" : MY_COLORS.bgSurface,
          border: `1px solid ${hovered ? MY_COLORS.orange : MY_COLORS.orangeBorder}`,
          textAlign: "center",
          cursor: "default",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}>
        <div style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 36 : 48, fontWeight: 900, color: MY_COLORS.orange, lineHeight: 1, marginBottom: 10, letterSpacing: "-1.5px" }}>{display}</div>
        <div style={{ fontFamily: FONTS.secondary, fontSize: 13, color: MY_COLORS.textMuted, lineHeight: 1.4, fontWeight: 500 }}>{result.label}</div>
      </div>
    </Reveal>
  );
};

/* ─────────────────────── Tech badge ────────────────────────────── */
const TechBadge = ({ tech, index, isMobile }) => {
  const [hovered, setHovered] = useState(false);
  const color = TECH_COLORS[tech] || MY_COLORS.orange;
  return (
    <Reveal delay={index * 0.05}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: 9,
          padding: isMobile ? "8px 12px" : "10px 18px", borderRadius: 10,
          background: hovered ? `${color}14` : MY_COLORS.bgSurface,
          border: `1px solid ${hovered ? color : MY_COLORS.border}`,
          transition: "all 0.25s ease", cursor: "default",
        }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: hovered ? `0 0 10px ${color}` : "none", transition: "box-shadow 0.25s ease" }} />
        <span style={{ fontFamily: FONTS.secondary, fontSize: 13, fontWeight: 600, color: hovered ? MY_COLORS.textPrimary : MY_COLORS.textSecondary, transition: "color 0.25s ease" }}>{tech}</span>
      </div>
    </Reveal>
  );
};

/* ─────────────────── Related project card ──────────────────────── */
const RelatedCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  const catLabel = CATEGORIES.find(c => c.id === project.industry_category)?.label || project.industry_category;
  const initials = project.project_name.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: "none", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", background: MY_COLORS.bgSurface, border: `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`, transform: hovered ? "translateY(-5px)" : "translateY(0)", boxShadow: hovered ? "0 20px 48px rgba(232,117,10,0.1)" : "none", transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
      <div style={{ height: 130, background: "linear-gradient(135deg, rgba(232,117,10,0.16) 0%, rgba(10,10,10,0.9) 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <span style={{ fontFamily: FONTS.primary, fontSize: 44, fontWeight: 900, color: "rgba(232,117,10,0.2)" }}>{initials}</span>
        <div style={{ position: "absolute", top: 10, left: 10, padding: "3px 9px", borderRadius: 9999, background: "rgba(10,10,10,0.75)", border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 10, fontWeight: 700, color: MY_COLORS.orange, backdropFilter: "blur(8px)", textTransform: "uppercase" }}>{catLabel}</div>
      </div>
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.orange, fontWeight: 600, marginBottom: 5 }}>{project.client_name}</div>
        <h4 style={{ fontFamily: FONTS.primary, fontSize: 15, fontWeight: 700, color: MY_COLORS.textPrimary, margin: "0 0 9px", lineHeight: 1.35 }}>{project.project_name}</h4>
        <p style={{ fontFamily: FONTS.secondary, fontSize: 13, color: MY_COLORS.textMuted, margin: "0 0 14px", lineHeight: 1.6, flex: 1 }}>{project.short_description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONTS.primary, fontSize: 13, fontWeight: 700, color: hovered ? MY_COLORS.orange : MY_COLORS.textMuted, transition: "color 0.25s ease", borderTop: `1px solid ${MY_COLORS.border}`, paddingTop: 12, marginTop: "auto" }}>
          View Case Study <ArrowRight />
        </div>
      </div>
    </Link>
  );
};

/* ═══════════════════════════ MAIN PAGE ═══════════════════════════ */
const PortfolioPostPage = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const { isMobile, isTablet } = useBreakpoint();

  const post     = PROJECTS.find(p => p.slug === slug);
  const related  = post
    ? PROJECTS.filter(p => p.slug !== slug)
        .sort((a, b) => (b.industry_category === post.industry_category ? 1 : 0) - (a.industry_category === post.industry_category ? 1 : 0))
        .slice(0, 3)
    : [];
  const catLabel       = post ? CATEGORIES.find(c => c.id === post.industry_category)?.label || post.industry_category : "";
  const descParagraphs = post ? buildDescription(post) : [];

  const isNarrow = isMobile || isTablet;
  const px       = isMobile ? "20px" : isTablet ? "32px" : "48px";
  const py       = isMobile ? "40px" : "64px";
  const maxW     = 960;

  const typeLabels = { web: "Web Application", mobile: "Mobile App", ai: "AI Platform" };

  /* 404 */
  if (!post) return (
    <div style={{ minHeight: "100vh", background: MY_COLORS.bgBase, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "0 20px", textAlign: "center" }}>
      <div style={{ fontFamily: FONTS.primary, fontSize: 80, fontWeight: 900, color: MY_COLORS.orangeBorder, lineHeight: 1 }}>404</div>
      <h2 style={{ fontFamily: FONTS.primary, fontSize: 28, fontWeight: 800, color: MY_COLORS.textPrimary, margin: 0 }}>Project Not Found</h2>
      <p style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textMuted, margin: 0 }}>This project doesn't exist or has been removed.</p>
      <Link to="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 9999, background: MY_COLORS.gradientOrange, fontFamily: FONTS.primary, fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
        <ArrowLeft /> Back to Portfolio
      </Link>
    </div>
  );

  const typeLabel = typeLabels[post.project_type] || post.project_type;

  return (
    <div style={{ background: MY_COLORS.bgBase, minHeight: "100vh" }}>
      <ReadingProgress />

      {/* ══════════ 1. HERO ══════════ */}
      <section style={{ background: MY_COLORS.bgBase, padding: isMobile ? "96px 20px 52px" : isTablet ? "110px 32px 60px" : "128px 48px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,117,10,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(232,117,10,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(232,117,10,0.015) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

        <div style={{ maxWidth: maxW, margin: "0 auto", position: "relative" }}>
          {/* Breadcrumb */}
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
              <Link to="/" style={{ fontFamily: FONTS.secondary, fontSize: 12, color: MY_COLORS.textMuted, textDecoration: "none" }} onMouseEnter={e => e.target.style.color = MY_COLORS.orange} onMouseLeave={e => e.target.style.color = MY_COLORS.textMuted}>Home</Link>
              <span style={{ color: MY_COLORS.border, fontSize: 10 }}>›</span>
              <Link to="/portfolio" style={{ fontFamily: FONTS.secondary, fontSize: 12, color: MY_COLORS.textMuted, textDecoration: "none" }} onMouseEnter={e => e.target.style.color = MY_COLORS.orange} onMouseLeave={e => e.target.style.color = MY_COLORS.textMuted}>Portfolio</Link>
              <span style={{ color: MY_COLORS.border, fontSize: 10 }}>›</span>
              <span style={{ fontFamily: FONTS.secondary, fontSize: 12, color: MY_COLORS.textSecondary }}>{post.project_name}</span>
            </div>
          </Reveal>

          {/* Badges */}
          <Reveal delay={0.05}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              <span style={{ padding: "5px 14px", borderRadius: 9999, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.06em" }}>{catLabel}</span>
              {post.featured && <span style={{ padding: "5px 14px", borderRadius: 9999, background: MY_COLORS.gradientOrange, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em" }}>★ Featured</span>}
              <span style={{ padding: "5px 14px", borderRadius: 9999, background: "rgba(255,255,255,0.04)", border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 600, color: MY_COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{typeLabel}</span>
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 30 : isTablet ? 40 : 54, fontWeight: 900, color: MY_COLORS.textPrimary, margin: "0 0 20px", lineHeight: 1.1, letterSpacing: "-0.025em", maxWidth: 760 }}>
              {post.project_name}
            </h1>
          </Reveal>

          {/* Client row */}
          <Reveal delay={0.15}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.primary, fontSize: 15, fontWeight: 800, color: MY_COLORS.orange, flexShrink: 0 }}>
                {post.client_name[0]}
              </div>
              <div>
                <div style={{ fontFamily: FONTS.primary, fontSize: 14, fontWeight: 700, color: MY_COLORS.textSecondary }}>{post.client_confidential ? "Confidential Client" : post.client_name}</div>
                <div style={{ fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.textMuted, marginTop: 1 }}>Client</div>
              </div>
            </div>
          </Reveal>

          {/* Short desc */}
          <Reveal delay={0.2}>
            <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 15 : 18, lineHeight: 1.75, color: MY_COLORS.textSecondary, margin: "0 0 32px", maxWidth: 720 }}>
              {post.short_description}
            </p>
          </Reveal>

          {/* Back button */}
          <Reveal delay={0.25}>
            <button onClick={() => navigate(-1)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 9999, border: `1px solid ${MY_COLORS.border}`, background: "transparent", fontFamily: FONTS.primary, fontSize: 13, fontWeight: 600, color: MY_COLORS.textMuted, cursor: "pointer", transition: "all 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}>
              <ArrowLeft /> Back to Portfolio
            </button>
          </Reveal>
        </div>
      </section>

      {/* ══════════ 2. COVER VISUAL ══════════ */}
      <Reveal style={{ padding: `0 ${px}` }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div style={{ width: "100%", aspectRatio: isMobile ? "16/8" : isTablet ? "16/7" : "21/8", borderRadius: isMobile ? 16 : 24, overflow: "hidden", background: "linear-gradient(135deg, rgba(232,117,10,0.28) 0%, rgba(15,12,10,0.97) 50%, rgba(10,10,10,1) 100%)", border: `1px solid ${MY_COLORS.orangeBorder}`, boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,117,10,0.06)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 100 : 180, fontWeight: 900, color: "rgba(232,117,10,0.08)", userSelect: "none", letterSpacing: "-6px", lineHeight: 1, zIndex: 1 }}>
              {post.project_name.split(" ").map(w => w[0]).join("").slice(0, 3)}
            </div>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 36px, rgba(232,117,10,0.025) 36px, rgba(232,117,10,0.025) 37px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(10,10,10,0.85), transparent)" }} />
            <div style={{ position: "absolute", top: isMobile ? 14 : 20, right: isMobile ? 14 : 20, padding: "6px 14px", borderRadius: 9999, background: "rgba(10,10,10,0.8)", border: `1px solid ${MY_COLORS.orangeBorder}`, backdropFilter: "blur(12px)", fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.06em" }}>Case Study</div>
            <div style={{ position: "absolute", bottom: isMobile ? 14 : 20, left: isMobile ? 14 : 20, fontFamily: FONTS.primary, fontSize: isMobile ? 11 : 13, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>{typeLabel} · {catLabel}</div>
          </div>
        </div>
      </Reveal>

      {/* ══════════ 3. PROJECT BRIEF STRIP ══════════ */}
      <section style={{ padding: `${py} ${px}` }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 12 : 16 }}>
            {[
              { icon: <UserIcon />,     label: "Client",   value: post.client_confidential ? "Confidential" : post.client_name.split(",")[0] },
              { icon: <LayersIcon />,   label: "Type",     value: typeLabel },
              { icon: <GlobeIcon />,    label: "Industry", value: catLabel },
              { icon: <CalendarIcon />, label: "Status",   value: "Delivered" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ padding: isMobile ? "16px 14px" : "20px 20px", borderRadius: 14, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: MY_COLORS.textMuted, marginBottom: 8 }}>
                    {item.icon}
                    <span style={{ fontFamily: FONTS.secondary, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</span>
                  </div>
                  <div style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 13 : 14, fontWeight: 700, color: MY_COLORS.textPrimary, lineHeight: 1.3 }}>{item.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4. PROJECT DESCRIPTION ← NEW ══════════ */}
      <section style={{ padding: `0 ${px} ${py}`, background: MY_COLORS.bgBase }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>

          {/* Section header */}
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
              <div style={{ width: 3, height: 32, background: MY_COLORS.gradientOrange, borderRadius: 9999, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>Project Overview</div>
                <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 24 : 32, fontWeight: 900, color: MY_COLORS.textPrimary, margin: 0, letterSpacing: "-0.02em" }}>About This Project</h2>
              </div>
            </div>
          </Reveal>

          {/* Two-column: paragraphs left, sidebar right */}
          <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 320px", gap: isNarrow ? 32 : 56, alignItems: "start" }}>

            {/* Paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {descParagraphs.map((para, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 14 : 16, lineHeight: 1.85, color: i === 0 ? MY_COLORS.textSecondary : MY_COLORS.textMuted, margin: 0, fontWeight: i === 0 ? 500 : 400 }}>{para}</p>
                </Reveal>
              ))}
            </div>

            {/* Sidebar */}
            <Reveal delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                {/* Key highlights */}
                <div style={{ padding: "24px", borderRadius: 16, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}` }}>
                  <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Key Highlights</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "Built for African market conditions",
                      "Mobile-first, low-bandwidth ready",
                      "Mobile money payments integrated",
                      "Real-time analytics dashboard",
                      "Live in production",
                    ].map((point, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <CheckIcon />
                        </div>
                        <span style={{ fontFamily: FONTS.secondary, fontSize: 13, color: MY_COLORS.textSecondary, lineHeight: 1.5 }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact summary — pulls real results data */}
                <div style={{ padding: "20px 24px", borderRadius: 16, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}` }}>
                  <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Impact Summary</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    {post.results.map((r, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                        <span style={{ fontFamily: FONTS.secondary, fontSize: 12, color: MY_COLORS.textMuted, lineHeight: 1.3 }}>{r.label}</span>
                        <span style={{ fontFamily: FONTS.primary, fontSize: 16, fontWeight: 800, color: MY_COLORS.orange, flexShrink: 0 }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ 5. CHALLENGE ══════════ */}
      <section style={{ padding: `${py} ${px}`, background: MY_COLORS.bgSection }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <div style={{ width: 3, height: 28, background: "#ef4444", borderRadius: 9999 }} />
              <div>
                <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>The Problem</div>
                <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 22 : 28, fontWeight: 900, color: MY_COLORS.textPrimary, margin: 0 }}>The Challenge We Faced</h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 20 }}>
              <div style={{ padding: isMobile ? "24px 20px" : "32px 36px", borderRadius: 16, background: MY_COLORS.bgSurface, border: "1px solid rgba(239,68,68,0.2)", borderLeft: "3px solid #ef4444" }}>
                <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 14 : 16, lineHeight: 1.8, color: MY_COLORS.textSecondary, margin: 0 }}>{post.challenge_description}</p>
              </div>
              <div style={{ padding: isMobile ? "24px 20px" : "32px 36px", borderRadius: 16, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}` }}>
                <div style={{ fontFamily: FONTS.primary, fontSize: 12, fontWeight: 700, color: MY_COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Pain Points</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["No existing digital infrastructure", "Manual processes causing costly errors", "Restricted to cash-only transactions", "Unable to scale without automation"].map((pain, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontFamily: FONTS.secondary, fontSize: 13, color: MY_COLORS.textMuted, lineHeight: 1.5 }}>{pain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ 6. SOLUTION ══════════ */}
      <section style={{ padding: `${py} ${px}`, background: MY_COLORS.bgBase }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <div style={{ width: 3, height: 28, background: MY_COLORS.gradientOrange, borderRadius: 9999 }} />
              <div>
                <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>Our Approach</div>
                <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 22 : 28, fontWeight: 900, color: MY_COLORS.textPrimary, margin: 0 }}>What We Built</h2>
              </div>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 20 }}>
            <Reveal delay={0.05}>
              <div style={{ padding: isMobile ? "24px 20px" : "32px 36px", borderRadius: 16, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.orangeBorder}`, borderLeft: `3px solid ${MY_COLORS.orange}`, height: "100%" }}>
                <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 14 : 16, lineHeight: 1.8, color: MY_COLORS.textSecondary, margin: 0 }}>{post.solution_description}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ padding: isMobile ? "24px 20px" : "32px 36px", borderRadius: 16, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, height: "100%" }}>
                <div style={{ fontFamily: FONTS.primary, fontSize: 12, fontWeight: 700, color: MY_COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Key Deliverables</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {["Custom-built for African market conditions", "Mobile-first, offline-capable architecture", "Full mobile money payment integration", "Real-time analytics and reporting dashboard", "Comprehensive admin management panel"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <CheckIcon />
                      </div>
                      <span style={{ fontFamily: FONTS.secondary, fontSize: 13, color: MY_COLORS.textSecondary, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ 7. RESULTS — FIXED ══════════ */}
      <section style={{ padding: `${py} ${px}`, background: MY_COLORS.bgSection }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 40, textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 24, height: 1, background: MY_COLORS.orangeBorder }} />
                <span style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em" }}>Impact & Results</span>
                <div style={{ width: 24, height: 1, background: MY_COLORS.orangeBorder }} />
              </div>
              <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 26 : 36, fontWeight: 900, color: MY_COLORS.textPrimary, margin: 0, letterSpacing: "-0.02em" }}>The Numbers Don't Lie</h2>
            </div>
          </Reveal>

          {/* Each MetricCard handles its own Reveal + counter trigger */}
          <Reveal>
            {(visible) => (
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? (post.results.length === 2 ? "1fr 1fr" : "1fr") : "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
                {post.results.map((r, i) => (
                  <MetricCard key={i} result={r} active={visible} index={i} isMobile={isMobile} />
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ══════════ 8. TECH STACK ══════════ */}
      <section style={{ padding: `${py} ${px}`, background: MY_COLORS.bgBase }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <div style={{ width: 3, height: 28, background: MY_COLORS.gradientOrange, borderRadius: 9999 }} />
              <div>
                <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>Stack</div>
                <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 22 : 28, fontWeight: 900, color: MY_COLORS.textPrimary, margin: 0 }}>Technologies Used</h2>
              </div>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {post.technologies.map((tech, i) => <TechBadge key={i} tech={tech} index={i} isMobile={isMobile} />)}
          </div>
        </div>
      </section>

      {/* ══════════ 9. TESTIMONIAL ══════════ */}
      {post.testimonial && (
        <section style={{ padding: `${py} ${px}`, background: MY_COLORS.bgSection }}>
          <div style={{ maxWidth: maxW, margin: "0 auto" }}>
            <Reveal>
              <div style={{ position: "relative", padding: isMobile ? "32px 24px" : "52px 56px", borderRadius: 20, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.orangeBorder}`, overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -40, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,117,10,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: isMobile ? 20 : 32, left: isMobile ? 20 : 40 }}><QuoteIcon /></div>
                <div style={{ display: "flex", gap: 3, marginBottom: 24, paddingTop: isMobile ? 24 : 16 }}>
                  {Array.from({ length: post.testimonial.rating }).map((_, i) => <StarIcon key={i} />)}
                </div>
                <blockquote style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 16 : 21, lineHeight: 1.75, color: MY_COLORS.textPrimary, margin: "0 0 32px", fontStyle: "italic", fontWeight: 400, maxWidth: 760 }}>
                  "{post.testimonial.quote}"
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: MY_COLORS.gradientOrange, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.primary, fontSize: 18, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                    {post.testimonial.author[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONTS.primary, fontSize: 15, fontWeight: 700, color: MY_COLORS.textPrimary }}>{post.testimonial.author}</div>
                    <div style={{ fontFamily: FONTS.secondary, fontSize: 13, color: MY_COLORS.textMuted, marginTop: 2 }}>{post.testimonial.title} · {post.testimonial.company}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ══════════ 10. RELATED PROJECTS ══════════ */}
      {related.length > 0 && (
        <section style={{ padding: `${py} ${px} calc(${py} + 16px)`, background: MY_COLORS.bgBase }}>
          <div style={{ maxWidth: maxW, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
                <div>
                  <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>More Work</div>
                  <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 22 : 28, fontWeight: 900, color: MY_COLORS.textPrimary, margin: 0 }}>Related Projects</h2>
                </div>
                <Link to="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 9999, border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.primary, fontSize: 13, fontWeight: 600, color: MY_COLORS.textMuted, textDecoration: "none", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}>
                  View All <ArrowRight />
                </Link>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 20 }}>
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <RelatedCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ 11. CTA ══════════ */}
      <section style={{ padding: isMobile ? `${py} 20px` : `88px 48px`, background: MY_COLORS.bgSection, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(232,117,10,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <Reveal style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 16px", borderRadius: 9999, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}` }}>
            <span style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.08em" }}>Ready to Build?</span>
          </div>
          <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 28 : 40, fontWeight: 900, color: MY_COLORS.textPrimary, margin: "0 0 18px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Let's Build Your<br /><span style={{ color: MY_COLORS.orange }}>Success Story</span>
          </h2>
          <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 14 : 17, lineHeight: 1.75, color: MY_COLORS.textSecondary, margin: "0 0 36px" }}>
            This project is one example of what we achieve together. Tell us about your challenge — let's create something extraordinary for your market.
          </p>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center", alignItems: "center" }}>
            <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 9999, background: MY_COLORS.gradientOrange, fontFamily: FONTS.primary, fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none", boxShadow: "0 8px 28px rgba(232,117,10,0.3)", transition: "all 0.3s ease", width: isMobile ? "100%" : "auto", justifyContent: "center" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(232,117,10,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(232,117,10,0.3)"; }}>
              Start Your Project <ArrowRight />
            </Link>
            <Link to="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 9999, border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.primary, fontSize: 14, fontWeight: 700, color: MY_COLORS.textSecondary, textDecoration: "none", transition: "all 0.3s ease", width: isMobile ? "100%" : "auto", justifyContent: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textSecondary; }}>
              View All Projects
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default PortfolioPostPage;