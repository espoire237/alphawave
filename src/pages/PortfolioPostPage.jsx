/**
 * PortfolioPostPage — Project Detail Page
 * AlphaWaves brand system
 *
 * Route: /portfolio/:slug
 *
 * Sections:
 * 1. Hero          — title, category, tags, client, reading progress bar
 * 2. Cover Visual  — gradient project visual banner
 * 3. Overview      — quick stats strip
 * 4. Challenge     — problem statement
 * 5. Solution      — what we built
 * 6. Results       — animated metric cards
 * 7. Tech Stack    — technologies used
 * 8. Testimonial   — client quote (if available)
 * 9. Related       — 3 other projects
 * 10. CTA          — start your project
 */

import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PROJECTS, CATEGORIES } from "../data/portfolioData.js";
import { MY_COLORS } from "../constants/colors.js";
import { FONTS } from "../assets/fonts/fonts.js";
import useBreakpoint from "../hooks/useBreakpoint.js";

/* ── Icons ──────────────────────────────────────────────────────── */
const ArrowLeft  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CheckIcon  = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke={MY_COLORS.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const StarIcon   = () => <svg width="14" height="14" viewBox="0 0 16 16" fill={MY_COLORS.orange}><path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z"/></svg>;
const QuoteIcon  = () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 20c0-5.5 3.5-9.5 8-11l1.5 2.5C12 13 10.5 15 10 18h4v7H6v-5zm13 0c0-5.5 3.5-9.5 8-11l1.5 2.5C25 13 23.5 15 23 18h4v7h-8v-5z" fill={MY_COLORS.orange} opacity="0.3"/></svg>;

/* ── Tech icon map ──────────────────────────────────────────────── */
const TECH_COLORS = {
  "React.js":       "#61DAFB", "React Native": "#61DAFB",
  "Node.js":        "#68A063", "Next.js":       "#ffffff",
  "Python":         "#FFD43B", "FastAPI":        "#009688",
  "MongoDB":        "#47A248", "PostgreSQL":     "#336791",
  "MySQL":          "#4479A1", "Vue.js":         "#42B883",
  "MTN MoMo":       "#FFCC00", "Orange Money":   "#FF6600",
  "Stripe":         "#635BFF", "AI/ML":          "#E8750A",
  "SMS Integration":"#34B7F1", "Video Streaming":"#FF0000",
  "Booking Engine API": "#00B4D8", "Google Maps API": "#4285F4",
};

/* ── Reading Progress Bar ───────────────────────────────────────── */
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
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: "rgba(255,255,255,0.06)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: MY_COLORS.gradientOrange, transition: "width 0.1s linear", borderRadius: "0 2px 2px 0" }} />
    </div>
  );
};

/* ── Animated counter ───────────────────────────────────────────── */
const useCountUp = (target, active, duration = 1400) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setVal(target); return; }
    const start = performance.now();
    const tick  = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * num));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(num);
    };
    requestAnimationFrame(tick);
  }, [active, target]);
  return val;
};

const AnimatedMetric = ({ result, active, index }) => {
  const [hovered, setHovered] = useState(false);
  const raw    = result.value;
  const num    = parseFloat(raw.replace(/[^0-9.]/g, ""));
  const prefix = raw.match(/^[^0-9]*/)?.[0] || "";
  const suffix = raw.match(/[^0-9.]+$/)?.[0] || "";
  const count  = useCountUp(raw, active);
  const display = isNaN(num) ? raw : `${prefix}${count}${suffix}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-reveal
      style={{
        opacity: 0, transform: "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
        flex: 1, minWidth: 160,
        padding: "28px 24px",
        borderRadius: 16,
        background: hovered ? "rgba(232,117,10,0.08)" : MY_COLORS.bgSurface,
        border: `1px solid ${hovered ? MY_COLORS.orange : MY_COLORS.orangeBorder}`,
        textAlign: "center",
        cursor: "default",
        transition: "all 0.3s ease",
      }}>
      <div style={{ fontFamily: FONTS.primary, fontSize: 42, fontWeight: 900, color: MY_COLORS.orange, lineHeight: 1, marginBottom: 8, letterSpacing: "-1px" }}>{display}</div>
      <div style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, color: MY_COLORS.textMuted, lineHeight: 1.4 }}>{result.label}</div>
    </div>
  );
};

/* ── Tech Badge ─────────────────────────────────────────────────── */
const TechBadge = ({ tech }) => {
  const [hovered, setHovered] = useState(false);
  const color = TECH_COLORS[tech] || MY_COLORS.orange;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 16px", borderRadius: 10,
        background: hovered ? `${color}12` : MY_COLORS.bgSurface,
        border: `1px solid ${hovered ? color : MY_COLORS.border}`,
        transition: "all 0.25s ease", cursor: "default",
      }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: hovered ? `0 0 8px ${color}` : "none", transition: "box-shadow 0.25s ease" }} />
      <span style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, color: hovered ? MY_COLORS.textPrimary : MY_COLORS.textSecondary, fontWeight: 600, transition: "color 0.25s ease" }}>{tech}</span>
    </div>
  );
};

/* ── Related Project Card ───────────────────────────────────────── */
const RelatedCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  const catLabel = CATEGORIES.find(c => c.id === project.industry_category)?.label || project.industry_category;
  const initials = project.project_name.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none", display: "flex", flexDirection: "column",
        borderRadius: 16, overflow: "hidden",
        background: MY_COLORS.bgSurface,
        border: `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 48px rgba(232,117,10,0.12)` : "none",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
      {/* Visual */}
      <div style={{ height: 140, background: `linear-gradient(135deg, rgba(232,117,10,0.18) 0%, rgba(10,10,10,0.92) 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <span style={{ fontFamily: FONTS.primary, fontSize: 40, fontWeight: 900, color: "rgba(232,117,10,0.25)" }}>{initials}</span>
        <div style={{ position: "absolute", top: 10, left: 10, padding: "3px 8px", borderRadius: 9999, background: "rgba(10,10,10,0.7)", border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 10, fontWeight: 700, color: MY_COLORS.orange, backdropFilter: "blur(8px)", textTransform: "uppercase" }}>{catLabel}</div>
      </div>
      {/* Content */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.orange, fontWeight: 600, marginBottom: 5 }}>{project.client_name}</div>
        <h4 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: 700, color: MY_COLORS.textPrimary, margin: "0 0 10px", lineHeight: 1.35 }}>{project.project_name}</h4>
        <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, color: MY_COLORS.textMuted, margin: "0 0 14px", lineHeight: 1.6, flex: 1 }}>{project.short_description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: 700, color: hovered ? MY_COLORS.orange : MY_COLORS.textMuted, transition: "color 0.25s ease", borderTop: `1px solid ${MY_COLORS.border}`, paddingTop: 12, marginTop: "auto" }}>
          View Case Study <ArrowRight />
        </div>
      </div>
    </Link>
  );
};

/* ── Section wrapper with scroll reveal ────────────────────────── */
const RevealSection = ({ children, style = {} }) => {
  const ref  = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el  = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.65s ease, transform 0.65s ease", ...style }}>
      {typeof children === "function" ? children(vis) : children}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════ */
const PortfolioPostPage = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const { isMobile, isTablet, isSmall } = useBreakpoint();

  const post    = PROJECTS.find(p => p.slug === slug);
  const related = post ? PROJECTS.filter(p => p.slug !== slug).sort((a, b) => (b.industry_category === post.industry_category ? 1 : 0) - (a.industry_category === post.industry_category ? 1 : 0)).slice(0, 3) : [];
  const catLabel = post ? CATEGORIES.find(c => c.id === post.industry_category)?.label || post.industry_category : "";

  const px = isMobile ? "20px" : isTablet ? "32px" : "40px";

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

  return (
    <div style={{ background: MY_COLORS.bgBase, minHeight: "100vh" }}>
      <ReadingProgress />

      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section style={{ background: MY_COLORS.bgBase, padding: isMobile ? "100px 20px 48px" : isTablet ? "110px 32px 56px" : "120px 40px 64px", position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,117,10,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
            <Link to="/" style={{ fontFamily: FONTS.secondary, fontSize: 12, color: MY_COLORS.textMuted, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = MY_COLORS.orange}
              onMouseLeave={e => e.target.style.color = MY_COLORS.textMuted}>Home</Link>
            <span style={{ color: MY_COLORS.border, fontSize: 12 }}>/</span>
            <Link to="/portfolio" style={{ fontFamily: FONTS.secondary, fontSize: 12, color: MY_COLORS.textMuted, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = MY_COLORS.orange}
              onMouseLeave={e => e.target.style.color = MY_COLORS.textMuted}>Portfolio</Link>
            <span style={{ color: MY_COLORS.border, fontSize: 12 }}>/</span>
            <span style={{ fontFamily: FONTS.secondary, fontSize: 12, color: MY_COLORS.textSecondary }}>{post.project_name}</span>
          </div>

          {/* Badges row */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            <span style={{ padding: "5px 12px", borderRadius: 9999, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.05em" }}>{catLabel}</span>
            {post.featured && <span style={{ padding: "5px 12px", borderRadius: 9999, background: MY_COLORS.gradientOrange, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>Featured</span>}
            <span style={{ padding: "5px 12px", borderRadius: 9999, background: "rgba(255,255,255,0.04)", border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 600, color: MY_COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{post.project_type}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 28 : isTablet ? 36 : 48, fontWeight: 900, color: MY_COLORS.textPrimary, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            {post.project_name}
          </h1>

          {/* Client + short desc */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9999, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.primary, fontSize: 13, fontWeight: 800, color: MY_COLORS.orange, flexShrink: 0 }}>
              {post.client_name[0]}
            </div>
            <div>
              <div style={{ fontFamily: FONTS.primary, fontSize: 13, fontWeight: 700, color: MY_COLORS.textSecondary }}>
                {post.client_confidential ? "Confidential Client" : post.client_name}
              </div>
              <div style={{ fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.textMuted }}>Client</div>
            </div>
          </div>

          <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 15 : 17, lineHeight: 1.75, color: MY_COLORS.textSecondary, margin: "0 0 24px", maxWidth: 760 }}>
            {post.short_description}
          </p>

          {/* Back link */}
          <button onClick={() => navigate(-1)} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 9999, border: `1px solid ${MY_COLORS.border}`, background: "transparent", fontFamily: FONTS.primary, fontSize: 13, fontWeight: 600, color: MY_COLORS.textMuted, cursor: "pointer", transition: "all 0.2s ease" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}>
            <ArrowLeft /> Back to Portfolio
          </button>
        </div>
      </section>

      {/* ── 2. COVER VISUAL ──────────────────────────────────────── */}
      <div style={{ padding: isMobile ? "0 20px" : isTablet ? "0 32px" : "0 40px", background: MY_COLORS.bgBase }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            width: "100%", borderRadius: isMobile ? 16 : 20,
            overflow: "hidden", aspectRatio: isMobile ? "16/7" : "16/6",
            background: `linear-gradient(135deg, rgba(232,117,10,0.22) 0%, rgba(10,10,10,0.96) 55%, rgba(15,15,15,1) 100%)`,
            border: `1px solid ${MY_COLORS.orangeBorder}`,
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,117,10,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", marginBottom: isMobile ? 40 : 56,
          }}>
            {/* Large initials */}
            <div style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 80 : 130, fontWeight: 900, color: "rgba(232,117,10,0.12)", userSelect: "none", letterSpacing: "-4px", lineHeight: 1 }}>
              {post.project_name.split(" ").map(w => w[0]).join("").slice(0, 3)}
            </div>

            {/* Decorative lines */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(232,117,10,0.03) 40px, rgba(232,117,10,0.03) 41px)`, pointerEvents: "none" }} />

            {/* Corner accent */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(10,10,10,0.7), transparent)" }} />
            <div style={{ position: "absolute", top: 20, right: 20, padding: "6px 14px", borderRadius: 9999, background: "rgba(10,10,10,0.75)", border: `1px solid ${MY_COLORS.orangeBorder}`, backdropFilter: "blur(12px)", fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase" }}>
              Case Study
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. QUICK STATS STRIP ─────────────────────────────────── */}
      <RevealSection style={{ padding: `0 ${px}`, marginBottom: isMobile ? 48 : 64 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {post.results.map((r, i) => (
              <div key={i} data-reveal style={{
                opacity: 0, transform: "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
                flex: 1, minWidth: 140, padding: "20px 18px",
                borderRadius: 14, textAlign: "center",
                background: MY_COLORS.bgSurface,
                border: `1px solid ${MY_COLORS.orangeBorder}`,
              }}>
                <div style={{ fontFamily: FONTS.primary, fontSize: 30, fontWeight: 900, color: MY_COLORS.orange, lineHeight: 1, marginBottom: 6 }}>{r.value}</div>
                <div style={{ fontFamily: FONTS.secondary, fontSize: 12, color: MY_COLORS.textMuted }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── 4. CHALLENGE ─────────────────────────────────────────── */}
      <RevealSection style={{ padding: `0 ${px}`, marginBottom: isMobile ? 48 : 64 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr", gap: isMobile ? 20 : 48, alignItems: "start" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 3, height: 24, background: MY_COLORS.gradientOrange, borderRadius: 9999 }} />
                <span style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.1em" }}>The Challenge</span>
              </div>
            </div>
            <div style={{ padding: "28px 32px", borderRadius: 16, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, borderLeft: `3px solid #ef4444` }}>
              <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 20 : 24, fontWeight: 800, color: MY_COLORS.textPrimary, margin: "0 0 14px" }}>The Problem We Solved</h2>
              <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 14 : 16, lineHeight: 1.8, color: MY_COLORS.textSecondary, margin: 0 }}>{post.challenge_description}</p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── 5. SOLUTION ──────────────────────────────────────────── */}
      <RevealSection style={{ padding: `0 ${px}`, marginBottom: isMobile ? 48 : 64 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr", gap: isMobile ? 20 : 48, alignItems: "start" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 3, height: 24, background: MY_COLORS.gradientOrange, borderRadius: 9999 }} />
                <span style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.1em" }}>Our Solution</span>
              </div>
            </div>
            <div style={{ padding: "28px 32px", borderRadius: 16, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, borderLeft: `3px solid ${MY_COLORS.orange}` }}>
              <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 20 : 24, fontWeight: 800, color: MY_COLORS.textPrimary, margin: "0 0 14px" }}>What We Built</h2>
              <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 14 : 16, lineHeight: 1.8, color: MY_COLORS.textSecondary, margin: "0 0 20px" }}>{post.solution_description}</p>
              {/* Key deliverables */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Custom-built for African market conditions", "Mobile-first, offline-capable architecture", "Full mobile money payment integration", "Real-time analytics and reporting dashboard"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <CheckIcon />
                    </div>
                    <span style={{ fontFamily: FONTS.secondary, fontSize: 14, color: MY_COLORS.textSecondary, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── 6. RESULTS ───────────────────────────────────────────── */}
      <RevealSection style={{ padding: `56px ${px}`, background: MY_COLORS.bgSection, marginBottom: 0 }}>
        {(visible) => (
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ marginBottom: 32, textAlign: isMobile ? "left" : "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 3, height: 20, background: MY_COLORS.gradientOrange, borderRadius: 9999 }} />
                <span style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.1em" }}>Impact & Results</span>
                <div style={{ width: 3, height: 20, background: MY_COLORS.gradientOrange, borderRadius: 9999 }} />
              </div>
              <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 24 : 32, fontWeight: 900, color: MY_COLORS.textPrimary, margin: 0 }}>The Numbers Don't Lie</h2>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {post.results.map((r, i) => (
                <AnimatedMetric key={i} result={r} active={visible} index={i} />
              ))}
            </div>
          </div>
        )}
      </RevealSection>

      {/* ── 7. TECH STACK ────────────────────────────────────────── */}
      <RevealSection style={{ padding: `56px ${px}`, background: MY_COLORS.bgBase }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 3, height: 20, background: MY_COLORS.gradientOrange, borderRadius: 9999 }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.1em" }}>Tech Stack</span>
          </div>
          <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 22 : 28, fontWeight: 900, color: MY_COLORS.textPrimary, margin: "0 0 28px" }}>Technologies Used</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {post.technologies.map((tech, i) => <TechBadge key={i} tech={tech} />)}
          </div>
        </div>
      </RevealSection>

      {/* ── 8. TESTIMONIAL ───────────────────────────────────────── */}
      {post.testimonial && (
        <RevealSection style={{ padding: `56px ${px}`, background: MY_COLORS.bgSection }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ position: "relative", padding: isMobile ? "32px 24px" : "44px 48px", borderRadius: 20, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.orangeBorder}`, overflow: "hidden" }}>
              {/* BG glow */}
              <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,117,10,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

              <div style={{ position: "absolute", top: 24, left: isMobile ? 20 : 32 }}><QuoteIcon /></div>

              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 20, paddingTop: 8 }}>
                {Array.from({ length: post.testimonial.rating }).map((_, i) => <StarIcon key={i} />)}
              </div>

              <blockquote style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 16 : 20, lineHeight: 1.75, color: MY_COLORS.textPrimary, margin: "0 0 28px", fontStyle: "italic", fontWeight: 400 }}>
                "{post.testimonial.quote}"
              </blockquote>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: MY_COLORS.gradientOrange, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.primary, fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                  {post.testimonial.author[0]}
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.primary, fontSize: 15, fontWeight: 700, color: MY_COLORS.textPrimary }}>{post.testimonial.author}</div>
                  <div style={{ fontFamily: FONTS.secondary, fontSize: 13, color: MY_COLORS.textMuted }}>{post.testimonial.title} · {post.testimonial.company}</div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      )}

      {/* ── 9. RELATED PROJECTS ──────────────────────────────────── */}
      {related.length > 0 && (
        <RevealSection style={{ padding: `56px ${px} 72px`, background: MY_COLORS.bgBase }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 3, height: 20, background: MY_COLORS.gradientOrange, borderRadius: 9999 }} />
                  <span style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.1em" }}>More Work</span>
                </div>
                <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 22 : 28, fontWeight: 900, color: MY_COLORS.textPrimary, margin: 0 }}>Related Projects</h2>
              </div>
              <Link to="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 9999, border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.primary, fontSize: 13, fontWeight: 600, color: MY_COLORS.textMuted, textDecoration: "none", transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}>
                View All <ArrowRight />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 20 }}>
              {related.map(p => <RelatedCard key={p.id} project={p} />)}
            </div>
          </div>
        </RevealSection>
      )}

      {/* ── 10. CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? "56px 20px" : "72px 40px", background: MY_COLORS.bgSection, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(232,117,10,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "6px 14px", borderRadius: 9999, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}` }}>
            <span style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, color: MY_COLORS.orange, textTransform: "uppercase", letterSpacing: "0.08em" }}>Ready to Build?</span>
          </div>
          <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 26 : 36, fontWeight: 900, color: MY_COLORS.textPrimary, margin: "0 0 16px", lineHeight: 1.2 }}>
            Let's Build Your<br /><span style={{ color: MY_COLORS.orange }}>Success Story</span>
          </h2>
          <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 14 : 16, lineHeight: 1.75, color: MY_COLORS.textSecondary, margin: "0 0 32px" }}>
            This project is just one example of what we can achieve together. Tell us about your challenge and let's create something extraordinary.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 9999, background: MY_COLORS.gradientOrange, fontFamily: FONTS.primary, fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none", boxShadow: "0 8px 24px rgba(232,117,10,0.3)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(232,117,10,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,117,10,0.3)"; }}>
              Start Your Project <ArrowRight />
            </Link>
            <Link to="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 9999, border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.primary, fontSize: 14, fontWeight: 700, color: MY_COLORS.textSecondary, textDecoration: "none", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textSecondary; }}>
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPostPage;