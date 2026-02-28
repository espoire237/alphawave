/**
 * FAQPage — Full FAQ Page Assembly
 * AlphaWaves brand system
 *
 * Sections:
 * 1. Hero        — HeroSection with search bar child
 * 2. FAQContent  — Sticky category nav + accordion Q&As
 * 3. FAQBottomCTA — "Didn't Find Your Answer?" banner
 *
 * Route: /faq
 *
 * FAQPage Schema (Google Rich Snippets) — injected via script tag
 * Deep-linkable categories via id attributes on each category block
 */

import { useState } from "react";
import HeroSection  from "../components/sections/HeroSection.jsx";
import FAQContent   from "../components/sections/FAQContent.jsx";
import FAQBottomCTA from "../components/sections/FAQBottomCTA.jsx";
import { MY_COLORS } from "../constants/colors.js";
import { FONTS }     from "../assets/fonts/fonts.js";
import { FAQS }      from "../components/sections/FAQContent.jsx";

// ── Search icon ───────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

// ── FAQPage Schema — for Google rich snippets ─────────────────
const FAQSchema = () => {
  const schema = {
    "@context":   "https://schema.org",
    "@type":      "FAQPage",
    "mainEntity": FAQS
      .filter(f => f.status === "published")
      .map(f => ({
        "@type":          "Question",
        "name":           f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text":  f.answer,
        },
      })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// ── Search bar — passed as child to HeroSection ───────────────
const SearchBar = ({ value, onChange }) => (
  <div style={{
    display:        "flex",
    alignItems:     "center",
    gap:            12,
    marginTop:      28,
    maxWidth:       520,
    position:       "relative",
  }}>
    <div style={{
      position:       "relative",
      flex:           1,
    }}>
      {/* Search icon */}
      <div style={{
        position:      "absolute",
        left:          16,
        top:           "50%",
        transform:     "translateY(-50%)",
        color:         MY_COLORS.textMuted,
        pointerEvents: "none",
        display:       "flex",
      }}>
        <SearchIcon />
      </div>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search questions — e.g. pricing, mobile money..."
        style={{
          width:           "100%",
          padding:         "14px 16px 14px 44px",
          borderRadius:    12,
          background:      "rgba(255,255,255,0.06)",
          border:          `1px solid rgba(255,255,255,0.12)`,
          color:           MY_COLORS.textPrimary,
          fontFamily:      FONTS.secondary,
          fontSize:        FONTS.size.base,
          outline:         "none",
          backdropFilter:  "blur(8px)",
          boxSizing:       "border-box",
          transition:      "border-color 0.25s ease, box-shadow 0.25s ease",
        }}
        onFocus={e => {
          e.target.style.borderColor = MY_COLORS.orangeBorder;
          e.target.style.boxShadow   = `0 0 0 3px ${MY_COLORS.orangeDim}`;
        }}
        onBlur={e => {
          e.target.style.borderColor = "rgba(255,255,255,0.12)";
          e.target.style.boxShadow   = "none";
        }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position:   "absolute",
            right:      12,
            top:        "50%",
            transform:  "translateY(-50%)",
            background: "transparent",
            border:     "none",
            color:      MY_COLORS.textMuted,
            cursor:     "pointer",
            fontSize:   16,
            lineHeight: 1,
            padding:    4,
          }}
        >
          ✕
        </button>
      )}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════
// FAQPage
// ══════════════════════════════════════════════════════════════
const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* FAQPage schema for Google rich snippets */}
      <FAQSchema />

      {/* Section 1 — Hero with embedded search bar */}
      <HeroSection
        eyebrow="FAQ"
        headline="Got Questions? We Have Answers."
        subheadline="Everything you need to know about working with AlphaWaves — from pricing and process to delivery and support."
        breadcrumb={true}
      >
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </HeroSection>

      {/* Section 2 — Category nav + accordion content */}
      <FAQContent searchQuery={searchQuery} />

      {/* Section 3 — Bottom CTA */}
      <FAQBottomCTA />
    </>
  );
};

export default FAQPage;