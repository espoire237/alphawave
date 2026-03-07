/**
 * HomePage
 * AlphaWaves landing page
 * @component
 */

import HomeHero from "../components/Home/HomeHero";
import HomeServices from "../components/Home/Homeservice";
import HomeTrustedBy from "../components/Home/Hometrustedby";
import HomeWhyUs from "../components/Home/Homewhyus";
import HomeStats from "../components/Home/Homestats";
import HomeProcess from "../components/Home/Homeprocess";
import HomeCTA from "../components/Home/HomeCTA";
import HomeTestimonial from "../components/Home/HomeTestimonial";
import HomePortfolioTeaser from "../components/Home/HomePortfolioTeaser";

const HomePage = () => {
  return (
    <div>
      {/* ── 1. Hero ── */}
      <HomeHero />
      {/* ── 2. Trusted By ── coming next */}

      <HomeTrustedBy />
      {/* ── 3. Services Overview ── coming next */}

      <HomeServices />

      {/* ── 4. Why AlphaWaves ──── coming next */}
      <HomeWhyUs />
      {/* ── 5. Stats ────────────── coming next */}
      <HomeStats />
      {/* ── 6. Portfolio Teaser ── coming next */}
      <HomePortfolioTeaser />
      {/* ── 7. How We Work ──────── coming next */}
      <HomeProcess />
      {/* ── 8. Testimonial────────── coming next */}
      <HomeTestimonial />
      {/* ── 9. Final CTA ────────── coming next */}
      <HomeCTA />
    </div>
  );
};

export default HomePage;
