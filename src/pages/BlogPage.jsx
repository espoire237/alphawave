/**
 * BlogPage Full Blog Page Assembly
 * AlphaWaves brand system
 *
 * Route: /blog
 *
 * Sections:
 * 1. HeroSection       with SearchBar child
 * 2. BlogFeaturedPost  featured article spotlight
 * 3. BlogGrid          category filters + paginated posts
 * 4. BlogCTA           "Ready to Transform?" banner
 */

import { useState } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "../components/sections/HeroSection.jsx";
import SearchBar from "../components/common/Searchbar.jsx";
import BlogFeaturedPost from "../components/Blog/BlogFeaturedPost.jsx";
import BlogGrid from "../components/Blog/BlogGrid.jsx";
import BlogCTA from "../components/Blog/BlogCTA.jsx";
import { IMAGES } from "../assets/assets.js";

const BlogPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Section 1 Hero with SearchBar */}
      <HeroSection
        eyebrow={t("blogPage.hero.eyebrow")}
        headline={t("blogPage.hero.headline")}
        subheadline={t("blogPage.hero.subheadline")}
        image={IMAGES.hero.blog}
        imagePosition="center 15%"
        breadcrumb={false}
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("blogPage.hero.searchPlaceholder")}
        />
      </HeroSection>

      {/* Section 2 Featured post */}
      <BlogFeaturedPost />

      {/* Section 3 Filters + grid (receives live search query) */}
      <BlogGrid searchQuery={searchQuery} />

      {/* Section 4 Bottom CTA */}
      <BlogCTA />
    </>
  );
};

export default BlogPage;
