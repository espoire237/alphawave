import React from "react";
import HeroSection from "../components/sections/HeroSection.jsx";
import { IMAGES } from "../assets/assets.js";
import OurStory from "../components/About/OurStory.jsx";
import CoreValues from "../components/About/ValuesSection.jsx";
import TeamSection from "../components/About/TeamSection.jsx";
import OurMissionVision from "../components/About/OurMission.jsx";
import WhyCameroon from "../components/About/WhyCameroon.jsx";
import OurApproach from "../components/About/Ourapproach.jsx";
import OurCommitment from "../components/About/OurCommitment.jsx";
import AboutCTA from "../components/About/AboutCta.jsx";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <>
     <HeroSection
  eyebrow={t("aboutHero.eyebrow")}
  headline={t("aboutHero.headline")}
  subheadline={t("aboutHero.subheadline")}
  image={IMAGES.hero.about}
  imagePosition="center 85%"
  breadcrumb={false}
  cta={{
    primary:   { label: t("aboutHero.cta.primary"),   path: "/contact"  },
    secondary: { label: t("aboutHero.cta.secondary"), path: "/services" },
  }}
/>

      <OurStory/>
      <OurMissionVision/>
      <CoreValues/>
      <TeamSection/>
      <WhyCameroon/>
      <OurApproach/>
      <OurCommitment/>
      <AboutCTA/>
    </>
  );
};

export default AboutPage;
