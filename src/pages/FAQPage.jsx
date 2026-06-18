/**
 * FAQPage Full FAQ Page Assembly
 * AlphaWaves brand system
 *
 * Route: /faq
 *
 * Sections:
 * 1. HeroSection  with SearchBar child
 * 2. FAQContent   sticky category nav + accordion Q&As
 * 3. FAQBottomCTA "Didn't Find Your Answer?" banner
 */

import { useState } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "../components/sections/HeroSection.jsx";
import FAQContent from "../components/FAQ/Faqcontent.jsx";
import FAQBottomCTA from "../components/FAQ/Faqbottomcta.jsx";
import SearchBar from "../components/common/Searchbar.jsx";
import { FAQS } from "../data/faqData.js";
import { IMAGES } from "../assets/assets.js";

// ── FAQPage schema Google rich snippets ─────────────────────
const FAQSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.filter((f) => f.status === "published").map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
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
  const { t } = useTranslation(); // no namespace uses default "translation"
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <FAQSchema />

      <HeroSection
        eyebrow={t("FAQPage.hero.eyebrow")}
        headline={t("FAQPage.hero.headline")}
        subheadline={t("FAQPage.hero.subheadline")}
        image={IMAGES.hero.faq}
        imagePosition="center 25%"
        breadcrumb={false}
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("FAQPage.hero.searchPlaceholder")}
        />
      </HeroSection>

      <FAQContent searchQuery={searchQuery} />

      <FAQBottomCTA />
    </>
  );
};

export default FAQPage;