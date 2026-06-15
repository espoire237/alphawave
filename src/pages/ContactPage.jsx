import React from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "../components/sections/HeroSection.jsx";
import { IMAGES } from "../assets/assets.js";
import ContactFormSection from "../components/Contact/ContactFormSection.jsx";
import ContactInfoSection from "../components/Contact/ContactInfoSection.jsx";
import TrustBar from "../components/Contact/TrustBar.jsx";
import SocialSection from "../components/Contact/SocialSections.jsx";
import FaqMini from "../components/Contact/FaqMini.jsx";
import BottomCTA from "../components/Contact/BottomCTA.jsx";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <HeroSection
        eyebrow={t("contactPage.hero.eyebrow")}
        headline={`${t("contactPage.hero.headline.main")} ${t("contactPage.hero.headline.accent")}`}
        subheadline={t("contactPage.hero.subheadline")}
        animated={true}
        imagePosition="center 40%"
        breadcrumb={false}
        image={IMAGES.hero.contact}
      />

      {/* Section 2 — Contact Form */}
      <ContactFormSection />

      {/* Section 3 — Contact Info */}
      <ContactInfoSection />

      {/* Section 4 — Trust Bar */}
      <TrustBar />

      {/* Section 5 — Social Links */}
      <SocialSection />

      {/* Section 6 — FAQ Mini */}
      <FaqMini />

      {/* Section 8 — Bottom CTA */}
      <BottomCTA />
    </div>
  );
};

export default ContactPage;
