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

const AboutPage = () => {
  return (
    <>
      <HeroSection
        eyebrow="About Us"
        headline="Building Africa's Digital Future"
        subheadline="A full-service technology company architecting digital transformation from Cameroon to the world"
        image={IMAGES.hero.about}
        imagePosition="center 85%"
        breadcrumb={false}
        cta={{
          primary: { label: "Get Started", path: "/contact" },
          secondary: { label: "Our Services", path: "/services" },
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
