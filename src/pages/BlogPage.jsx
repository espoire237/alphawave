/**
 * BlogPage — Full Blog Page Assembly
 * AlphaWaves brand system
 *
 * Route: /blog
 *
 * Sections:
 * 1. HeroSection       — with SearchBar child
 * 2. BlogFeaturedPost  — featured article spotlight
 * 3. BlogGrid          — category filters + paginated posts
 * 4. BlogCTA           — "Ready to Transform?" banner
 */

import { useState } from "react";
import HeroSection      from "../components/sections/HeroSection.jsx";
import SearchBar        from "../components/common/Searchbar.jsx";
import BlogFeaturedPost from "../components/Blog/BlogFeaturedPost.jsx";
import BlogGrid         from "../components/Blog/BlogGrid.jsx";
import BlogCTA          from "../components/Blog/BlogCTA.jsx";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Section 1 — Hero with SearchBar */}
      <HeroSection
        eyebrow="Blog"
        headline="Insights for Africa's Digital Leaders"
        subheadline="Practical guides, case studies, and expert insights on technology, digital transformation, and business growth across African markets."
        breadcrumb={false}
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search articles — e.g. mobile money, AI, SEO..."
        />
      </HeroSection>

      {/* Section 2 — Featured post */}
      <BlogFeaturedPost />

      {/* Section 3 — Filters + grid (receives live search query) */}
      <BlogGrid searchQuery={searchQuery} />

      {/* Section 4 — Bottom CTA */}
      <BlogCTA />
    </>
  );
};

export default BlogPage;