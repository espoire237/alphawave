/**
 * BlogFeaturedPost — Blog Page Section 2 — FULLY RESPONSIVE
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { POSTS, AUTHORS, CATEGORIES } from "../../data/blogData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const ArrowRight  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CalendarIcon = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 7H15M5 1V5M11 1V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const ClockIcon   = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;

const useScrollReveal = (t = 0.08) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.querySelectorAll("[data-reveal]").forEach((item, i) => { setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0)"; }, i * 120); }); obs.disconnect(); }
    }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return ref;
};

const BlogFeaturedPost = () => {
  const sectionRef = useScrollReveal();
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();
  const [hovered, setHover] = useState(false);

  const post     = POSTS.find(p => p.is_featured && p.status === "published") || POSTS[0];
  const author   = AUTHORS.find(a => a.id === post.author_id);
  const catLabel = CATEGORIES.find(c => c.id === post.category)?.label || post.category;
  const formattedDate = new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const padding    = isMobile ? "56px 20px 0" : isTablet ? "72px 32px 0" : "80px 40px 0";
  const isSmall    = isMobile || isTablet;
  const gridCols   = isSmall ? "1fr" : isLargeTablet ? "1fr 1.2fr" : "1.1fr 1fr";
  const contentPad = isMobile ? "24px 20px" : isTablet ? "32px 28px" : "48px 44px";

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgBase, padding, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, left: -100, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: isMobile ? 20 : 32, opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}>
          <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MY_COLORS.orange }}>Featured Article</span>
          <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
        </div>

        <div data-reveal onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          style={{ display: "grid", gridTemplateColumns: gridCols, borderRadius: isMobile ? 16 : 20, border: `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`, overflow: "hidden", transition: "border-color 0.3s ease", opacity: 0, transform: "translateY(24px)", background: MY_COLORS.bgSurface }}>

          {/* Visual header */}
          <div style={{ minHeight: isSmall ? 180 : 380, background: "linear-gradient(135deg, rgba(232,117,10,0.2) 0%, rgba(232,117,10,0.05) 50%, rgba(10,10,10,0.95) 100%)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {!isMobile && <div style={{ position: "absolute", fontFamily: FONTS.primary, fontSize: 180, fontWeight: 800, color: "rgba(232,117,10,0.07)", lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "-10px" }}>AW</div>}
            <div style={{ position: "absolute", top: isMobile ? 14 : 20, left: isMobile ? 14 : 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ padding: "4px 12px", borderRadius: 9999, background: MY_COLORS.gradientOrange, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#fff" }}>Featured</span>
              <span style={{ padding: "4px 12px", borderRadius: 9999, background: "rgba(10,10,10,0.7)", border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: MY_COLORS.orange, backdropFilter: "blur(8px)" }}>{catLabel}</span>
            </div>
            <div style={{ position: "absolute", bottom: 14, left: 14, display: "flex", alignItems: "center", gap: 6, color: MY_COLORS.textMuted }}>
              <ClockIcon />
              <span style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted }}>{post.read_time_minutes} min read</span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: contentPad, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: isSmall ? 20 : 0 }}>
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: isMobile ? 14 : 20 }}>
                {post.tags.slice(0, 3).map((tag, i) => <span key={i} style={{ padding: "3px 10px", borderRadius: 9999, background: "rgba(255,255,255,0.04)", border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.textMuted }}>{tag}</span>)}
              </div>
              <h2 style={{ fontFamily: FONTS.primary, fontSize: isMobile ? "clamp(16px,4.5vw,22px)" : "clamp(20px,2.2vw,28px)", fontWeight: 800, lineHeight: "1.3", color: MY_COLORS.textPrimary, margin: "0 0 12px" }}>{post.title}</h2>
              <p style={{ fontFamily: FONTS.secondary, fontSize: isMobile ? 13 : FONTS.size.base, lineHeight: "1.7", color: MY_COLORS.textMuted, margin: "0 0 20px" }}>{post.excerpt}</p>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 18, borderBottom: `1px solid ${MY_COLORS.border}`, flexWrap: "wrap" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.primary, fontSize: 12, fontWeight: 700, color: MY_COLORS.orange, flexShrink: 0 }}>{author?.name[0]}</div>
                <div>
                  <div style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: 700, color: MY_COLORS.textPrimary }}>{author?.name}</div>
                  <div style={{ fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.textMuted }}>{author?.role}</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, color: MY_COLORS.textMuted }}>
                  <CalendarIcon /><span style={{ fontFamily: FONTS.secondary, fontSize: 11, color: MY_COLORS.textMuted }}>{formattedDate}</span>
                </div>
              </div>
              <Link to={`/blog/${post.slug}`}
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: hovered ? 12 : 8, padding: isMobile ? "12px 22px" : "13px 28px", borderRadius: 10, background: MY_COLORS.gradientOrange, color: "#fff", fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: 700, boxShadow: hovered ? "0 0 32px rgba(232,117,10,0.5)" : "0 0 16px rgba(232,117,10,0.3)", transform: hovered ? "translateY(-2px)" : "translateY(0)", transition: "all 0.3s ease", width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "center" : "flex-start" }}>
                Read Article <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BlogFeaturedPost;