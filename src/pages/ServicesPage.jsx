import HeroSection      from "../components/sections/HeroSection.jsx";
import ServicesOverview from "../components/Services/ServiceOverview.jsx";
import WhyChooseUs      from "../components/Services/WhyChooseUs.jsx";
import HowWeWork        from "../components/Services/HowWeWork.jsx";
import ProblemsSolve    from "../components/Services/ProblemsSolve.jsx";
import WhoWeServe       from "../components/Services/WhoWeServe.jsx";
import ServicesStats    from "../components/Services/ServicesStats.jsx";
import ServicesCTA      from "../components/Services/ServicesCTA.jsx";

const ServicesPage = () => (
  <>
    <HeroSection
      eyebrow="Our Services"
      headline="Complete Digital Solutions for Africa's Digital Future"
      subheadline="From custom software to AI analytics we deliver integrated technology that drives measurable business outcomes."
      breadcrumb={false}
      cta={{
        primary:   { label: "Get Started",       path: "/contact"  },
        secondary: { label: "Explore Solutions", path: "#services" },
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

export default ServicesPage;