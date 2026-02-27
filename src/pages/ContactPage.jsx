import React from "react";
import HeroSection from "../components/sections/HeroSection.jsx";
import { IMAGES } from "../assets/assets.js";

const ContactPage = () => {
  return (
    <div>
      <HeroSection
        eyebrow="Contact"
        headline="Let's Build Something Great Together"
        subheadline="We'd love to hear from you. We respond within 24 hours."
        animated={true}
        breadcrumb={true}
        image={IMAGES.hero.contact}
      />
    </div>
  );
};

export default ContactPage;
