/**
 * FAQContent FAQ Page Section 2
 * Category navigation + accordion Q&As
 * AlphaWaves brand system
 */

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useTranslatedFAQs } from "../../data/faqData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS }     from "../../assets/fonts/fonts.js";

// ── Chevron icon ──────────────────────────────────────────────
const ChevronDown = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", flexShrink: 0 }}>
    <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Highlight matching search text ────────────────────────────
const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts  = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} style={{ background: MY_COLORS.orangeDim, color: MY_COLORS.orange, borderRadius: 3, padding: "0 2px" }}>{part}</mark>
      : part
  );
};

// ── Single FAQ accordion item ─────────────────────────────────
const FAQItem = ({ faq, isOpen, onToggle, highlight }) => (
  <div
    id={`faq-${faq.id}`}
    style={{
      borderRadius: 12,
      background:   MY_COLORS.bgSurface,
      border:       `1px solid ${isOpen ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
      overflow:     "hidden",
      transition:   "border-color 0.3s ease",
    }}
  >
    <button
      onClick={onToggle}
      style={{
        width:          "100%",
        padding:        "20px 24px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        gap:            16,
        background:     "transparent",
        border:         "none",
        cursor:         "pointer",
        textAlign:      "left",
      }}
    >
      <span style={{
        fontFamily: FONTS.primary,
        fontSize:   FONTS.size.base,
        fontWeight: FONTS.weight.semibold,
        lineHeight: FONTS.leading.snug,
        color:      isOpen ? MY_COLORS.orange : MY_COLORS.textPrimary,
        transition: "color 0.3s ease",
      }}>
        {highlight ? highlightText(faq.question, highlight) : faq.question}
      </span>
      <span style={{ color: MY_COLORS.orange }}>
        <ChevronDown open={isOpen} />
      </span>
    </button>

    <div style={{ maxHeight: isOpen ? "600px" : "0px", overflow: "hidden", transition: "max-height 0.4s ease" }}>
      <div style={{ padding: "0 24px 22px", borderTop: `1px solid ${MY_COLORS.border}`, paddingTop: 16 }}>
        <div style={{ display: "flex", gap: 14 }}>
          <div style={{ width: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange, flexShrink: 0 }} />
          <p style={{
            fontFamily: FONTS.secondary,
            fontSize:   FONTS.size.base,
            fontWeight: FONTS.weight.regular,
            lineHeight: FONTS.leading.relaxed,
            color:      MY_COLORS.textSecondary,
            margin:     0,
          }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ── Empty state ───────────────────────────────────────────────
const EmptyState = ({ query }) => {
  const { t } = useTranslation(); // no namespace uses default "translation"
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
      <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.lg, fontWeight: FONTS.weight.bold, color: MY_COLORS.textPrimary, marginBottom: 10 }}>
        {t("FAQPage.content.emptyState.title", { query })}
      </h3>
      <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textMuted }}>
        {t("FAQPage.content.emptyState.subtitle")}
      </p>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// FAQContent Component
// ══════════════════════════════════════════════════════════════
const FAQContent = ({ searchQuery = "" }) => {
  const FAQS = useTranslatedFAQs();
  const { t } = useTranslation(); // no namespace uses default "translation"
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems,      setOpenItems]       = useState({});
  const categoryRefs = useRef({});

  // Categories built from translation keys so labels switch with language
  const CATEGORIES = [
    { id: "all",      label: t("FAQPage.content.categories.all")      },
    { id: "services", label: t("FAQPage.content.categories.services") },
    { id: "pricing",  label: t("FAQPage.content.categories.pricing")  },
    { id: "process",  label: t("FAQPage.content.categories.process")  },
    { id: "tech",     label: t("FAQPage.content.categories.tech")     },
    { id: "africa",   label: t("FAQPage.content.categories.africa")   },
    { id: "support",  label: t("FAQPage.content.categories.support")  },
  ];

  const filtered = FAQS.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const q               = searchQuery.toLowerCase();
    const matchesSearch   = !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q);
    return matchesCategory && matchesSearch && faq.status === "published";
  });

  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const items = filtered.filter(f => f.category === cat.id);
    if (items.length) acc[cat.id] = { label: cat.label, items };
    return acc;
  }, {});

  useEffect(() => {
    if (searchQuery) {
      const autoOpen = {};
      filtered.forEach(f => { autoOpen[f.id] = true; });
      setOpenItems(autoOpen);
    }
  }, [searchQuery]);

  const toggleItem = (id) =>
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  const scrollToCategory = (catId) => {
    setActiveCategory(catId);
    if (catId !== "all" && categoryRefs.current[catId]) {
      const top = categoryRefs.current[catId].getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section style={{ position: "relative", background: MY_COLORS.bgBase, padding: "0 0 100px", overflow: "hidden" }}>

      <div style={{ position: "absolute", top: 200, right: -200, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      {/* Sticky category nav */}
      <div style={{ position: "sticky", top: 70, zIndex: 40, background: `${MY_COLORS.bgBase}ee`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: `1px solid ${MY_COLORS.border}`, padding: "0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto", scrollbarWidth: "none", padding: "12px 0" }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count    = cat.id === "all" ? filtered.length : filtered.filter(f => f.category === cat.id).length;
            return (
              <button key={cat.id} onClick={() => scrollToCategory(cat.id)}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9999, border: `1px solid ${isActive ? MY_COLORS.orange : MY_COLORS.border}`, background: isActive ? MY_COLORS.orangeDim : "transparent", color: isActive ? MY_COLORS.orange : MY_COLORS.textMuted, fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.semibold, letterSpacing: FONTS.tracking.wide, cursor: "pointer", transition: "all 0.2s ease", whiteSpace: "nowrap", flexShrink: 0 }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.textSecondary; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; } }}
              >
                {cat.label}
                <span style={{ padding: "1px 7px", borderRadius: 9999, background: isActive ? MY_COLORS.orange : MY_COLORS.bgSurface, color: isActive ? "#fff" : MY_COLORS.textMuted, fontSize: 10, fontWeight: FONTS.weight.bold, transition: "all 0.2s ease" }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 40px 0", position: "relative" }}>
        {filtered.length === 0 && <EmptyState query={searchQuery} />}
        {Object.entries(grouped).map(([catId, group]) => (
          <div key={catId} id={`category-${catId}`} ref={el => { categoryRefs.current[catId] = el; }} style={{ marginBottom: 60 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${MY_COLORS.border}` }}>
              <span style={{ width: 4, height: 20, borderRadius: 9999, background: MY_COLORS.gradientOrange, flexShrink: 0 }} />
              <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.lg, fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, color: MY_COLORS.textPrimary, margin: 0 }}>{group.label}</h3>
              <span style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted, marginLeft: "auto" }}>
                {t("FAQPage.content.questionCount", { count: group.items.length })}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {group.items.map(faq => (
                <FAQItem key={faq.id} faq={faq} isOpen={!!openItems[faq.id]} onToggle={() => toggleItem(faq.id)} highlight={searchQuery} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQContent;