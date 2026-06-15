/**
 * PortfolioPage — Full Portfolio Page Assembly
 * AlphaWaves brand system
 *
 * Route: /portfolio
 *
 * Sections:
 * 1. HeroSection         — reused universal hero
 * 2. PortfolioStatsBar   — 4 key metrics below hero
 * 3. PortfolioGrid       — filters + project cards
 * 4. FeaturedCaseStudy   — spotlight on top project
 * 5. IndustriesServed    — 8 industry cards
 * 6. PortfolioTestimonials — auto-rotating carousel
 * 7. PortfolioMetrics    — animated impact counters
 * 8. PortfolioCTA        — final CTA banner
 */

import HeroSection from "../components/sections/HeroSection.jsx";
import PortfolioStatsBar from "../components/Portfolio/PortfolioStatsBar.jsx";
import PortfolioGrid from "../components/Portfolio/PortfolioGrid.jsx";
import FeaturedCaseStudy from "../components/Portfolio/FeaturedCaseStudy.jsx";
import IndustriesServed from "../components/Portfolio/IndustriesServed.jsx";
import PortfolioTestimonials from "../components/Portfolio/PortfolioTestimonials.jsx";
import PortfolioMetrics from "../components/Portfolio/PortfolioMetrics.jsx";
import PortfolioCTA from "../components/Portfolio/PortfolioCTA.jsx";
import { IMAGES } from "../assets/assets.js";
import { useTranslation } from "react-i18next";

const PortfolioPage = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Section 1 — Hero */}
      <HeroSection
        eyebrow={t("portfolio.hero.eyebrow")}
        headline={t("portfolio.hero.headline")}
        subheadline={t("portfolio.hero.subheadline")}
        image={IMAGES.hero.portfolio}
        imagePosition="center 45%"
        breadcrumb={false}
        cta={{
          primary: {
            label: t("portfolio.hero.cta.primary"),
            path: "/contact",
          },
          secondary: {
            label: t("portfolio.hero.cta.secondary"),
            path: "#portfolio",
          },
        }}
      />

      {/* Section 2 — Stats bar */}
      <PortfolioStatsBar />

      {/* Section 3 — Filter + grid */}
      <PortfolioGrid />

      {/* Section 4 — Featured case study */}
      <FeaturedCaseStudy />

      {/* Section 5 — Industries */}
      <IndustriesServed />

      {/* Section 6 — Testimonials carousel */}
      <PortfolioTestimonials />

      {/* Section 7 — Impact metrics */}
      <PortfolioMetrics />

      {/* Section 8 — CTA */}
      <PortfolioCTA />
    </>
  );
};

export default PortfolioPage;
