/**
 * BlogPostPage — Full Article Detail Page
 * Route: /blog/:slug
 *
 * Layout:
 *   1. Reading progress bar (fixed top)
 *   2. Post Hero — title, meta, breadcrumb
 *   3. Magazine layout: sidebar (TOC + share) | article body
 *   4. Author bio card
 *   5. Related posts grid
 *   6. Back to blog CTA
 *
 * Body block types rendered:
 *   heading, paragraph, list, callout, code, divider
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { POSTS, AUTHORS, CATEGORIES } from "../data/blogData.js";
import { MY_COLORS } from "../constants/colors.js";
import { FONTS } from "../assets/fonts/fonts.js";
import useBreakpoint from "../hooks/useBreakpoint.js";

// ─── Callout colours ──────────────────────────────────────────
const CALLOUT_STYLES = {
  info:    { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.3)",  icon: "ℹ",  label: "Note",    color: "#60A5FA" },
  warning: { bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.3)",  icon: "⚠",  label: "Warning", color: "#FBBF24" },
  success: { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.3)",  icon: "✓",  label: "Result",  color: "#34D399" },
  tip:     { bg: "rgba(232,117,10,0.08)",  border: "rgba(232,117,10,0.3)",  icon: "💡", label: "Tip",     color: "#E8750A" },
};

// ─── Icons ────────────────────────────────────────────────────
const ArrowLeft  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowRight = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevronRight = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ClockIcon  = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const CalIcon    = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 7H15M5 1V5M11 1V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const ShareIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="1.8"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="1.8"/></svg>;
const CopyIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
const CheckIcon  = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const LinkedInIcon = () => <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/></svg>;
const TwitterIcon = () => <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

// ─── Reading Progress Bar ─────────────────────────────────────
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 999, background: "rgba(255,255,255,0.06)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: MY_COLORS.gradientOrange, transition: "width 0.1s linear", borderRadius: "0 9999px 9999px 0" }} />
    </div>
  );
};

// ─── Table of Contents ────────────────────────────────────────
const TableOfContents = ({ body, activeId }) => {
  const headings = body.filter(b => b.type === "heading");
  if (headings.length < 2) return null;
  return (
    <div style={{ padding: "24px 20px", borderRadius: 12, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}` }}>
      <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange, marginBottom: 14 }}>Contents</div>
      <nav>
        {headings.map((h, i) => {
          const id = `heading-${i}`;
          const active = activeId === id;
          return (
            <a key={i} href={`#${id}`}
              onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              style={{ display: "block", padding: `${h.level === 3 ? "5px 0 5px 12px" : "6px 0"}`, fontFamily: FONTS.primary, fontSize: h.level === 3 ? 12 : 13, fontWeight: active ? 700 : 500, color: active ? MY_COLORS.orange : MY_COLORS.textMuted, textDecoration: "none", borderLeft: h.level === 3 ? `2px solid ${active ? MY_COLORS.orange : MY_COLORS.border}` : "none", transition: "all 0.2s ease", lineHeight: "1.4" }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = MY_COLORS.textSecondary; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = MY_COLORS.textMuted; }}>
              {h.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

// ─── Share Buttons ────────────────────────────────────────────
const ShareButtons = ({ title }) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = () => {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const openShare = (platform) => {
    const encoded = encodeURIComponent(url);
    const encTitle = encodeURIComponent(title);
    const urls = {
      twitter:  `https://twitter.com/intent/tweet?text=${encTitle}&url=${encoded}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=450");
  };

  return (
    <div style={{ padding: "20px", borderRadius: 12, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}` }}>
      <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
        <ShareIcon /> Share
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { label: "Copy link", icon: copied ? <CheckIcon /> : <CopyIcon />, action: copyLink, active: copied },
          { label: "LinkedIn",  icon: <LinkedInIcon />, action: () => openShare("linkedin") },
          { label: "Twitter/X", icon: <TwitterIcon />,  action: () => openShare("twitter")  },
        ].map((btn, i) => (
          <button key={i} onClick={btn.action}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: btn.active ? MY_COLORS.orangeDim : "transparent", border: `1px solid ${btn.active ? MY_COLORS.orangeBorder : MY_COLORS.border}`, color: btn.active ? MY_COLORS.orange : MY_COLORS.textMuted, fontFamily: FONTS.primary, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease", textAlign: "left" }}
            onMouseEnter={e => { if (!btn.active) { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.textSecondary; }}}
            onMouseLeave={e => { if (!btn.active) { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}}>
            {btn.icon} {btn.active ? "Copied!" : btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Body Block Renderer ──────────────────────────────────────
const BodyBlock = ({ block, index, isMobile }) => {
  const baseText = { fontFamily: FONTS.secondary, fontSize: isMobile ? 15 : 16, lineHeight: "1.85", color: MY_COLORS.textSecondary };

  switch (block.type) {

    case "heading": {
      const isH2 = block.level === 2;
      return (
        <h2 id={`heading-${index}`}
          style={{ fontFamily: FONTS.primary, fontSize: isH2 ? (isMobile ? "clamp(18px,4.5vw,22px)" : "clamp(20px,2vw,26px)") : (isMobile ? "clamp(15px,3.5vw,17px)" : "clamp(16px,1.5vw,19px)"), fontWeight: isH2 ? 800 : 700, color: MY_COLORS.textPrimary, margin: isH2 ? "40px 0 16px" : "28px 0 12px", lineHeight: "1.3", paddingTop: 8, ...(isH2 ? { borderTop: `1px solid ${MY_COLORS.border}` } : {}) }}>
          {isH2 ? (
            <>{block.text.split(" ").slice(0, -1).join(" ")}{" "}
              <span style={{ color: MY_COLORS.orange }}>{block.text.split(" ").slice(-1)[0]}</span></>
          ) : block.text}
        </h2>
      );
    }

    case "paragraph":
      return <p style={{ ...baseText, margin: "0 0 20px" }}>{block.text}</p>;

    case "list":
      return (
        <ul style={{ margin: "0 0 20px", padding: "0 0 0 0", listStyle: "none" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 3 }}>
                {block.ordered
                  ? <span style={{ fontFamily: FONTS.primary, fontSize: 9, fontWeight: 800, color: MY_COLORS.orange }}>{i + 1}</span>
                  : <span style={{ width: 5, height: 5, borderRadius: "50%", background: MY_COLORS.orange, display: "block" }} />
                }
              </span>
              <span style={{ ...baseText, margin: 0, flex: 1 }}>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const cs = CALLOUT_STYLES[block.variant] || CALLOUT_STYLES.info;
      return (
        <div style={{ margin: "24px 0", padding: isMobile ? "16px 16px" : "20px 24px", borderRadius: 12, background: cs.bg, border: `1px solid ${cs.border}`, borderLeft: `4px solid ${cs.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>{cs.icon}</span>
            <span style={{ fontFamily: FONTS.primary, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: cs.color }}>{block.title || cs.label}</span>
          </div>
          <p style={{ ...baseText, margin: 0, fontSize: isMobile ? 14 : 15 }}>{block.text}</p>
        </div>
      );
    }

    case "code":
      return (
        <div style={{ margin: "24px 0", borderRadius: 12, overflow: "hidden", border: `1px solid ${MY_COLORS.border}` }}>
          <div style={{ padding: "10px 16px", background: "rgba(255,255,255,0.04)", borderBottom: `1px solid ${MY_COLORS.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#FF5F57","#FEBC2E","#28C840"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
            </div>
            {block.language && <span style={{ fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.textDisabled, marginLeft: 6 }}>{block.language}</span>}
          </div>
          <pre style={{ margin: 0, padding: isMobile ? "16px 14px" : "20px 24px", background: "#0d0d0d", overflowX: "auto", fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: isMobile ? 12 : 13, lineHeight: "1.7", color: "#e2e8f0", whiteSpace: "pre" }}>
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "divider":
      return <hr style={{ margin: "32px 0", border: "none", borderTop: `1px solid ${MY_COLORS.border}` }} />;

    default:
      return null;
  }
};

// ─── Author Bio Card ──────────────────────────────────────────
const AuthorCard = ({ author, isMobile }) => (
  <div style={{ margin: "56px 0 0", padding: isMobile ? "24px 20px" : "36px 40px", borderRadius: 16, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, display: "flex", gap: isMobile ? 16 : 24, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
    <div style={{ flexShrink: 0, width: isMobile ? 52 : 64, height: isMobile ? 52 : 64, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `2px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.primary, fontSize: isMobile ? 20 : 24, fontWeight: 800, color: MY_COLORS.orange }}>
      {author.name[0]}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
        <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.md, fontWeight: 700, color: MY_COLORS.textPrimary }}>{author.name}</span>
        <span style={{ padding: "2px 10px", borderRadius: 9999, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 600, color: MY_COLORS.orange }}>{author.role}</span>
      </div>
      <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, lineHeight: "1.7", color: MY_COLORS.textMuted, margin: "0 0 16px" }}>{author.bio}</p>
      <a href={author.linkedin_url}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, background: "transparent", border: `1px solid ${MY_COLORS.border}`, color: MY_COLORS.textMuted, fontFamily: FONTS.primary, fontSize: 12, fontWeight: 600, textDecoration: "none", transition: "all 0.2s ease" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}>
        <LinkedInIcon /> View on LinkedIn
      </a>
    </div>
  </div>
);

// ─── Related Post Card ────────────────────────────────────────
const RelatedCard = ({ post }) => {
  const [hovered, setHover] = useState(false);
  const catLabel = CATEGORIES.find(c => c.id === post.category)?.label || post.category;
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ borderRadius: 14, background: hovered ? "rgba(232,117,10,0.03)" : MY_COLORS.bgSurface, border: `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`, overflow: "hidden", transition: "all 0.3s ease", transform: hovered ? "translateY(-4px)" : "translateY(0)" }}>
        <div style={{ height: 120, background: "linear-gradient(135deg, rgba(232,117,10,0.14) 0%, rgba(10,10,10,0.95) 100%)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: FONTS.primary, fontSize: 60, fontWeight: 800, color: "rgba(232,117,10,0.07)", lineHeight: 1, userSelect: "none" }}>AW</div>
          <div style={{ position: "absolute", top: 10, left: 10, padding: "3px 8px", borderRadius: 9999, background: "rgba(10,10,10,0.75)", border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: MY_COLORS.orange, backdropFilter: "blur(6px)" }}>{catLabel}</div>
        </div>
        <div style={{ padding: "16px 16px 18px" }}>
          <h4 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: 700, lineHeight: "1.4", color: hovered ? MY_COLORS.orange : MY_COLORS.textPrimary, margin: "0 0 8px", transition: "color 0.3s ease" }}>{post.title}</h4>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: MY_COLORS.textDisabled }}>
              <ClockIcon /><span style={{ fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.textDisabled }}>{post.read_time_minutes} min read</span>
            </div>
            <span style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: 600, color: hovered ? MY_COLORS.orange : MY_COLORS.textDisabled, display: "flex", alignItems: "center", gap: 4, marginLeft: "auto", transition: "color 0.3s ease" }}>Read <ArrowRight /></span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ══════════════════════════════════════════════════════════════
// BlogPostPage
// ══════════════════════════════════════════════════════════════
const BlogPostPage = () => {
  const { slug }      = useParams();
  const navigate      = useNavigate();
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();
  const isSmall       = isMobile || isTablet;
  const articleRef    = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const post    = POSTS.find(p => p.slug === slug && p.status === "published");
  const author  = post ? AUTHORS.find(a => a.id === post.author_id) : null;
  const catLabel = post ? CATEGORIES.find(c => c.id === post.category)?.label : "";
  const related  = post ? POSTS.filter(p => p.id !== post.id && p.status === "published" && p.category === post.category).slice(0, 3) : [];
  const moreRelated = related.length < 3 ? POSTS.filter(p => p.id !== post.id && p.status === "published" && !related.find(r => r.id === p.id)).slice(0, 3 - related.length) : [];
  const relatedPosts = [...related, ...moreRelated].slice(0, 3);

  // Collect heading indices from body for TOC active tracking
  const headingIndices = post ? post.body.reduce((acc, b, i) => { if (b.type === "heading") acc.push(i); return acc; }, []) : [];

  // Active heading tracking via IntersectionObserver
  useEffect(() => {
    if (!post || isSmall) return;
    const observers = [];
    headingIndices.forEach(i => {
      const el = document.getElementById(`heading-${i}`);
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(`heading-${i}`);
      }, { rootMargin: "-20% 0px -70% 0px" });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [post, isSmall, headingIndices]);

  // Scroll to top on slug change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [slug]);

  // 404 — post not found
  if (!post) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: MY_COLORS.bgBase, padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>📄</div>
        <h1 style={{ fontFamily: FONTS.primary, fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: MY_COLORS.textPrimary, marginBottom: 12 }}>Article Not Found</h1>
        <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textMuted, marginBottom: 32 }}>The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: MY_COLORS.gradientOrange, color: "#fff", fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: 700 }}>
          <ArrowLeft /> Back to Blog
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const sectionPad    = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 40px";

  return (
    <>
      <ReadingProgress />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section style={{ position: "relative", background: MY_COLORS.bgBase, padding: isMobile ? "40px 20px 48px" : isTablet ? "56px 32px 64px" : "72px 40px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(232,117,10,0.07) 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: MY_COLORS.gradientOrange, opacity: 0.5 }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: isMobile ? 20 : 28 }}>
            <Link to="/" style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = MY_COLORS.textSecondary}
              onMouseLeave={e => e.currentTarget.style.color = MY_COLORS.textMuted}>Home</Link>
            <ChevronRight />
            <Link to="/blog" style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.color = MY_COLORS.textSecondary}
              onMouseLeave={e => e.currentTarget.style.color = MY_COLORS.textMuted}>Blog</Link>
            <ChevronRight />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, color: MY_COLORS.orange, maxWidth: isMobile ? 160 : 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</span>
          </div>

          {/* Category + featured badge */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: isMobile ? 16 : 20 }}>
            <span style={{ padding: "4px 14px", borderRadius: 9999, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: MY_COLORS.orange }}>{catLabel}</span>
            {post.is_featured && <span style={{ padding: "4px 14px", borderRadius: 9999, background: MY_COLORS.gradientOrange, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#fff" }}>Featured</span>}
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(22px,6vw,30px)" : isTablet ? "clamp(26px,4.5vw,38px)" : "clamp(28px,3.5vw,48px)", fontWeight: 800, lineHeight: "1.2", letterSpacing: "-0.02em", color: MY_COLORS.textPrimary, margin: `0 0 ${isMobile ? 16 : 24}px`, maxWidth: 900 }}>
            {post.title}
          </h1>

          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 14 : 24, flexWrap: "wrap" }}>
            {/* Author avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.primary, fontSize: 13, fontWeight: 800, color: MY_COLORS.orange, flexShrink: 0 }}>{author?.name[0]}</div>
              <div>
                <div style={{ fontFamily: FONTS.primary, fontSize: 13, fontWeight: 700, color: MY_COLORS.textPrimary }}>{author?.name}</div>
                <div style={{ fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.textMuted }}>{author?.role}</div>
              </div>
            </div>
            {/* Divider */}
            <div style={{ width: 1, height: 28, background: MY_COLORS.border }} />
            {/* Date */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: MY_COLORS.textMuted }}>
              <CalIcon /><span style={{ fontFamily: FONTS.secondary, fontSize: 13, color: MY_COLORS.textMuted }}>{formattedDate}</span>
            </div>
            {/* Read time */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: MY_COLORS.textMuted }}>
              <ClockIcon /><span style={{ fontFamily: FONTS.secondary, fontSize: 13, color: MY_COLORS.textMuted }}>{post.read_time_minutes} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: isMobile ? 16 : 20 }}>
            {post.tags.map((tag, i) => (
              <span key={i} style={{ padding: "3px 10px", borderRadius: 9999, background: "rgba(255,255,255,0.04)", border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.textMuted }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cover Image ────────────────────────────────────── */}
      {post.coverImage && (
        <div style={{ width: "100%", background: MY_COLORS.bgSection, padding: isMobile ? "0 20px" : isTablet ? "0 32px" : "0 40px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{
              width: "100%",
              borderRadius: isMobile ? 12 : 16,
              overflow: "hidden",
              aspectRatio: isMobile ? "16/9" : "21/9",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              border: `1px solid ${MY_COLORS.border}`,
              transform: "translateY(50px)",
              position: "relative",
            }}>
              <img
                src={post.coverImage}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Subtle bottom fade into content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, rgba(15,15,15,0.6), transparent)" }} />
            </div>
          </div>
        </div>
      )}

      {/* ── Magazine body ──────────────────────────────────── */}
      <section style={{ background: MY_COLORS.bgSection, padding: isMobile ? "40px 20px 64px" : isTablet ? "48px 32px 80px" : "56px 40px 100px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isSmall ? "1fr" : isLargeTablet ? "1fr 240px" : "1fr 280px", gap: isSmall ? 0 : 48, alignItems: "start" }}>

            {/* ── Left: Article body ─────────────────────── */}
            <article ref={articleRef} style={{ minWidth: 0 }}>

              {/* Excerpt lead */}
              <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 15 : 17, lineHeight: "1.8", color: MY_COLORS.textSecondary, margin: "0 0 32px", padding: isMobile ? "16px 16px" : "20px 24px", borderRadius: 12, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, borderLeft: `4px solid ${MY_COLORS.orange}`, fontStyle: "italic" }}>
                {post.excerpt}
              </p>

              {/* Body blocks */}
              {post.body.map((block, i) => (
                <BodyBlock key={i} block={block} index={i} isMobile={isMobile} />
              ))}

              {/* Author card */}
              {author && <AuthorCard author={author} isMobile={isMobile} />}
            </article>

            {/* ── Right: Sticky sidebar ──────────────────── */}
            {!isSmall && (
              <aside style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 16 }}>
                <TableOfContents body={post.body} activeId={activeId} />
                <ShareButtons title={post.title} />
                {/* Back to blog */}
                <Link to="/blog"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 12, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, color: MY_COLORS.textMuted, fontFamily: FONTS.primary, fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}>
                  <ArrowLeft /> Back to Blog
                </Link>
              </aside>
            )}

            {/* Mobile: share + back inline after article */}
            {isSmall && (
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14 }}>
                <ShareButtons title={post.title} />
                <Link to="/blog"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px", borderRadius: 12, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, color: MY_COLORS.textMuted, fontFamily: FONTS.primary, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}>
                  <ArrowLeft /> Back to Blog
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Related Posts ───────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section style={{ background: MY_COLORS.bgBase, padding: isMobile ? "48px 20px 64px" : isTablet ? "64px 32px 80px" : "80px 40px 100px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isMobile ? 24 : 40, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 24, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
                  <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange }}>Continue Reading</span>
                </div>
                <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(20px,5vw,28px)" : "clamp(22px,3vw,32px)", fontWeight: 800, color: MY_COLORS.textPrimary, margin: 0 }}>
                  Related <span style={{ color: MY_COLORS.orange }}>Articles</span>
                </h2>
              </div>
              <Link to="/blog"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 8, background: "transparent", border: `1px solid ${MY_COLORS.border}`, color: MY_COLORS.textMuted, fontFamily: FONTS.primary, fontSize: 12, fontWeight: 600, textDecoration: "none", transition: "all 0.2s ease", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orange; e.currentTarget.style.color = MY_COLORS.orange; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}>
                View All Posts <ArrowRight />
              </Link>
            </div>

            {/* Related grid */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 14 : 24 }}>
              {relatedPosts.map(p => <RelatedCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPostPage;