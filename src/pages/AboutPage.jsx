import React from "react";
import HeroSection from "../components/sections/HeroSection.jsx";
import { IMAGES } from "../assets/assets.js";

const AboutPage = () => {
  return (
    <>
      <HeroSection
        eyebrow="About Us"
        headline="Building Africa's Digital Future"
        subheadline="A full-service technology company architecting digital transformation from Cameroon to the world"
        image={IMAGES.hero.about}
        breadcrumb={true}
        cta={{
          primary: { label: "Get Started", path: "/contact" },
          secondary: { label: "Our Services", path: "/services" },
        }}
      />
    </>
  );
};

export default AboutPage;
