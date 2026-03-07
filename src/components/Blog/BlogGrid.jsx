/**
 * BlogGrid — Blog Page Section 3 + 4
 * Category filters + sort + paginated posts grid
 * AlphaWaves brand system
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { POSTS, AUTHORS, CATEGORIES, POSTS_PER_PAGE } from "../../data/blogData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

// ── Icons ─────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1 7H15M5 1V5M11 1V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Filter pill ───────────────────────────────────────────────
const FilterPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display:       "inline-flex",
      alignItems:    "center",
      padding:       "7px 16px",
      borderRadius:  9999,
      border:        `1px solid ${active ? MY_COLORS.orange : MY_COLORS.border}`,
      background:    active ? MY_COLORS.orangeDim : "transparent",
      color:         active ? MY_COLORS.orange : MY_COLORS.textMuted,
      fontFamily:    FONTS.primary,
      fontSize:      FONTS.size.xs,
      fontWeight:    FONTS.weight.semibold,
      letterSpacing: FONTS.tracking.wide,
      cursor:        "pointer",
      transition:    "all 0.2s ease",
      whiteSpace:    "nowrap",
    }}
    onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.textSecondary; }}}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; }}}
  >
    {label}
  </button>
);

// ── Blog post card ────────────────────────────────────────────
const PostCard = ({ post }) => {
  const [hovered, setHover]  = useState(false);
  const author               = AUTHORS.find(a => a.id === post.author_id);
  const catLabel             = CATEGORIES.find(c => c.id === post.category)?.label || post.category;
  const formattedDate        = new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius:  14,
        background:    hovered ? "rgba(232,117,10,0.03)" : MY_COLORS.bgSurface,
        border:        `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        overflow:      "hidden",
        transition:    "all 0.3s ease",
        transform:     hovered ? "translateY(-4px)" : "translateY(0)",
        display:       "flex",
        flexDirection: "column",
        position:      "relative",
      }}
    >
      {/* Image placeholder */}
      <div style={{
        height:         180,
        background:     `linear-gradient(135deg, rgba(232,117,10,0.12) 0%, rgba(10,10,10,0.95) 100%)`,
        position:       "relative",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        flexShrink:     0,
        overflow:       "hidden",
      }}>
        {/* Watermark */}
        <div style={{ fontFamily: FONTS.primary, fontSize: 80, fontWeight: FONTS.weight.extrabold, color: "rgba(232,117,10,0.08)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
          AW
        </div>

        {/* Category badge */}
        <div style={{ position: "absolute", top: 12, left: 12, padding: "3px 10px", borderRadius: 9999, background: "rgba(10,10,10,0.75)", border: `1px solid ${MY_COLORS.orangeBorder}`, fontFamily: FONTS.primary, fontSize: 10, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange, backdropFilter: "blur(8px)" }}>
          {catLabel}
        </div>

        {/* Read time */}
        <div style={{ position: "absolute", bottom: 10, right: 12, display: "flex", alignItems: "center", gap: 4, color: MY_COLORS.textMuted }}>
          <ClockIcon />
          <span style={{ fontFamily: FONTS.secondary, fontSize: 10, color: MY_COLORS.textMuted }}>{post.read_time_minutes} min</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "22px 22px 20px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Title */}
        <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.tight, lineHeight: FONTS.leading.snug, color: hovered ? MY_COLORS.orange : MY_COLORS.textPrimary, margin: "0 0 10px", transition: "color 0.3s ease" }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textMuted, margin: "0 0 16px", flex: 1 }}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {post.tags.slice(0, 2).map((tag, i) => (
            <span key={i} style={{ padding: "2px 8px", borderRadius: 9999, background: "rgba(255,255,255,0.04)", border: `1px solid ${MY_COLORS.border}`, fontFamily: FONTS.secondary, fontSize: 10, color: MY_COLORS.textMuted }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Author + date + link */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 14, borderTop: `1px solid ${MY_COLORS.border}` }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.primary, fontSize: 11, fontWeight: FONTS.weight.bold, color: MY_COLORS.orange, flexShrink: 0 }}>
            {author?.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONTS.primary, fontSize: 11, fontWeight: FONTS.weight.bold, color: MY_COLORS.textSecondary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {author?.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: MY_COLORS.textMuted }}>
              <CalendarIcon />
              <span style={{ fontFamily: FONTS.secondary, fontSize: 10, color: MY_COLORS.textMuted }}>{formattedDate}</span>
            </div>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, color: hovered ? MY_COLORS.orange : MY_COLORS.textMuted, transition: "color 0.3s ease", flexShrink: 0 }}
          >
            Read <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

// ── Empty state ───────────────────────────────────────────────
const EmptyState = ({ query }) => (
  <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 0" }}>
    <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
    <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.lg, fontWeight: FONTS.weight.bold, color: MY_COLORS.textPrimary, marginBottom: 10 }}>No articles found</h3>
    <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textMuted }}>
      {query ? `No results for "${query}" — try different keywords.` : "No posts in this category yet."}
    </p>
  </div>
);

// ── Pagination ────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 56 }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ width: 40, height: 40, borderRadius: "50%", background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, color: currentPage === 1 ? MY_COLORS.textDisabled : MY_COLORS.textMuted, cursor: currentPage === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
        onMouseEnter={e => { if (currentPage !== 1) { e.currentTarget.style.borderColor = MY_COLORS.orange; e.currentTarget.style.color = MY_COLORS.orange; }}}
        onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = currentPage === 1 ? MY_COLORS.textDisabled : MY_COLORS.textMuted; }}
      >
        <ChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ width: 40, height: 40, borderRadius: "50%", background: page === currentPage ? MY_COLORS.gradientOrange : MY_COLORS.bgSurface, border: `1px solid ${page === currentPage ? MY_COLORS.orange : MY_COLORS.border}`, color: page === currentPage ? "#fff" : MY_COLORS.textMuted, cursor: "pointer", fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: FONTS.weight.bold, transition: "all 0.2s ease" }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ width: 40, height: 40, borderRadius: "50%", background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, color: currentPage === totalPages ? MY_COLORS.textDisabled : MY_COLORS.textMuted, cursor: currentPage === totalPages ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
        onMouseEnter={e => { if (currentPage !== totalPages) { e.currentTarget.style.borderColor = MY_COLORS.orange; e.currentTarget.style.color = MY_COLORS.orange; }}}
        onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = currentPage === totalPages ? MY_COLORS.textDisabled : MY_COLORS.textMuted; }}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// BlogGrid
// ══════════════════════════════════════════════════════════════
const BlogGrid = ({ searchQuery = "" }) => {
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();
  const [activeCategory, setCategory] = useState("all");
  const [sortBy,         setSort]     = useState("recent");
  const [currentPage,    setPage]     = useState(1);
  const sectionRef                    = useRef(null);

  // Reset to page 1 on filter/search change
  useEffect(() => { setPage(1); }, [activeCategory, sortBy, searchQuery]);

  // Filter
  const filtered = POSTS
    .filter(p => p.status === "published")
    .filter(p => activeCategory === "all" || p.category === activeCategory)
    .filter(p => {
      const q = searchQuery.toLowerCase();
      return !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      if (sortBy === "recent")  return new Date(b.published_at) - new Date(a.published_at);
      if (sortBy === "oldest")  return new Date(a.published_at) - new Date(b.published_at);
      if (sortBy === "popular") return b.read_time_minutes - a.read_time_minutes;
      return 0;
    });

  const totalPages  = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated   = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll("[data-reveal]").forEach((item, i) => {
          setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0)"; }, i * 80);
        });
        observer.disconnect();
      }
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", background: MY_COLORS.bgBase, padding: isMobile ? "48px 20px 80px" : isTablet ? "56px 32px 90px" : "64px 40px 100px", overflow: "hidden" }}>

      <div style={{ position: "absolute", bottom: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>

        {/* Filter bar */}
        <div data-reveal style={{ opacity: 0, transform: "translateY(16px)", transition: "all 0.6s ease", marginBottom: 48 }}>

          {/* Top row — categories + sort */}
          <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 12, flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", marginBottom: 0 }}>

            {/* Category pills */}
            <div style={{ display: "flex", flexWrap: isMobile ? "nowrap" : "wrap", gap: 8, overflowX: isMobile ? "auto" : "visible", WebkitOverflowScrolling: "touch", paddingBottom: isMobile ? 4 : 0 }}>
              {CATEGORIES.map(cat => (
                <FilterPill key={cat.id} label={cat.label} active={activeCategory === cat.id} onClick={() => setCategory(cat.id)} />
              ))}
            </div>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={e => setSort(e.target.value)}
              style={{ padding: "8px 16px", borderRadius: 9999, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, color: MY_COLORS.textSecondary, fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.semibold, cursor: "pointer", outline: "none", appearance: "none", paddingRight: 32 }}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* Results count */}
          <div style={{ marginTop: 16, fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted }}>
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {searchQuery ? ` for "${searchQuery}"` : ""}
            {activeCategory !== "all" ? ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}` : ""}
          </div>
        </div>

        {/* Posts grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : isLargeTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 14 : 24 }}>
          {paginated.length === 0
            ? <EmptyState query={searchQuery} />
            : paginated.map(post => <PostCard key={post.id} post={post} />)
          }
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />

      </div>

      <style>{`
        @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px)  { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default BlogGrid;