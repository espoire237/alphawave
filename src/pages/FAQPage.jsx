/**
 * FAQPage — Full FAQ Page Assembly
 * AlphaWaves brand system
 *
 * Route: /faq
 *
 * Sections:
 * 1. HeroSection  — with SearchBar child
 * 2. FAQContent   — sticky category nav + accordion Q&As
 * 3. FAQBottomCTA — "Didn't Find Your Answer?" banner
 */

import { useState }    from "react";
import HeroSection     from "../components/sections/HeroSection.jsx";
import FAQContent      from "../components/FAQ/Faqcontent.jsx";
import FAQBottomCTA    from "../components/FAQ/Faqbottomcta.jsx";
import SearchBar       from "../components/common/Searchbar.jsx";
import { FAQS }        from "../data/faqData.js";

// ── FAQPage schema — Google rich snippets ─────────────────────
const FAQSchema = () => {
  const schema = {
    "@context":   "https://schema.org",
    "@type":      "FAQPage",
    "mainEntity": FAQS
      .filter(f => f.status === "published")
      .map(f => ({
        "@type":          "Question",
        "name":           f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// ══════════════════════════════════════════════════════════════
// FAQPage
// ══════════════════════════════════════════════════════════════
const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Google rich snippets schema */}
      <FAQSchema />

      {/* Section 1 — Hero with SearchBar passed as child */}
      <HeroSection
        eyebrow="FAQ"
        headline="Got Questions? We Have Answers."
        subheadline="Everything you need to know about working with AlphaWaves — from pricing and process to delivery and support."
        breadcrumb={true}
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search questions — e.g. pricing, mobile money..."
        />
      </HeroSection>

      {/* Section 2 — Category nav + accordion */}
      <FAQContent searchQuery={searchQuery} />

      {/* Section 3 — Bottom CTA */}
      <FAQBottomCTA />
    </>
  );
};

export default FAQPage;