import { useTranslation } from "react-i18next";
import HeroSection      from "../components/sections/HeroSection.jsx";
import ServicesOverview from "../components/Services/ServiceOverview.jsx";
import WhyChooseUs      from "../components/Services/WhyChooseUs.jsx";
import HowWeWork        from "../components/Services/HowWeWork.jsx";
import ProblemsSolve    from "../components/Services/ProblemsSolve.jsx";
import WhoWeServe       from "../components/Services/WhoWeServe.jsx";
import ServicesStats    from "../components/Services/ServicesStats.jsx";
import ServicesCTA      from "../components/Services/ServicesCTA.jsx";
import { IMAGES } from "../assets/assets.js";

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeroSection
        eyebrow={t("servicesPage.hero.eyebrow")}
        headline={t("servicesPage.hero.headline")}
        subheadline={t("servicesPage.hero.subheadline")}
        image={IMAGES.hero.service}
        imagePosition="center 55%"
        breadcrumb={false}
        cta={{
          primary:   { label: t("servicesPage.hero.primaryBtn"),   path: "/contact"  },
          secondary: { label: t("servicesPage.hero.secondaryBtn"), path: "#services" },
        }}
      />
      <ServicesOverview />
      <WhyChooseUs />
      <HowWeWork />
      <ProblemsSolve />
      <WhoWeServe />
      <ServicesStats />
      <ServicesCTA />
    </>
  );
};

export default ServicesPage;