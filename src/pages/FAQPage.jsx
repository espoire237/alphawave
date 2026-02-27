import React from "react";
import HeroSection from "../components/sections/HeroSection.jsx";

const FAQPage = () => {
  return (
    <div>
      <HeroSection
        eyebrow="FAQ"
        headline="Got Questions? We Have Answers."
        subheadline="Everything you need to know about working with AlphaWaves."
        breadcrumb={true}
      >
        {/* <YourSearchBar /> */}
      </HeroSection>
    </div>
  );
};

export default FAQPage;
