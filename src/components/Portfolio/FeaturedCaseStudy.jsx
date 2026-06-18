/**
 * FeaturedCaseStudy Portfolio Page Section 3 FULLY RESPONSIVE
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../../data/portfolioData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { useTranslation } from "react-i18next";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill={MY_COLORS.orange}>
    <path d="M8 1L9.8 6H15L10.6 9.2L12.4 14.2L8 11L3.6 14.2L5.4 9.2L1 6H6.2L8 1Z" />
  </svg>
);

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.querySelectorAll("[data-reveal]").forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, i * 120);
          });
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
};

const FeaturedCaseStudy = () => {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal(0.1);
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();
  const [ctaHovered, setHovered] = useState(false);
  const project = PROJECTS.find((p) => p.featured && p.status === "published");
  if (!project) return null;

  const padding = isMobile
    ? "64px 20px"
    : isTablet
      ? "80px 32px"
      : "100px 40px";
  const isSmall = isMobile || isTablet;
  const gridCols = isSmall ? "1fr" : isLargeTablet ? "1fr 1.2fr" : "1fr 1fr";
  const innerPad = isMobile
    ? "28px 20px"
    : isTablet
      ? "36px 28px"
      : "60px 48px";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: MY_COLORS.bgSection,
        padding,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 56 }}>
          <div
            data-reveal
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <span
              style={{
                width: 28,
                height: 2,
                borderRadius: 9999,
                background: MY_COLORS.gradientOrange,
              }}
            />
            <span
              style={{
                fontFamily: FONTS.primary,
                fontSize: FONTS.size.xs,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: MY_COLORS.orange,
              }}
            >
              {t("featuredCaseStudy.sectionLabel")}
            </span>
            <span
              style={{
                width: 28,
                height: 2,
                borderRadius: 9999,
                background: MY_COLORS.gradientOrange,
              }}
            />
          </div>

          <h2
            data-reveal
            style={{
              fontFamily: FONTS.primary,
              fontSize: isMobile
                ? "clamp(22px,6vw,32px)"
                : "clamp(28px,4vw,48px)",
              fontWeight: 800,
              color: MY_COLORS.textPrimary,
              margin: 0,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {t("featuredCaseStudy.heading")}{" "}
            <span style={{ color: MY_COLORS.orange }}>
              {t("featuredCaseStudy.headingHighlight")}
            </span>
          </h2>
        </div>

        <div
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: 0,
            borderRadius: isMobile ? 16 : 24,
            border: `1px solid ${MY_COLORS.orangeBorder}`,
            overflow: "hidden",
            opacity: 0,
            transform: "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          {/* Left visual */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(232,117,10,0.18) 0%, rgba(10,10,10,0.95) 100%)",
              padding: innerPad,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              minHeight: isSmall ? "auto" : 480,
              gap: isSmall ? 24 : 0,
            }}
          >
            {!isMobile && project.project_name && (
              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  fontFamily: FONTS.primary,
                  fontSize: 200,
                  fontWeight: 800,
                  color: "rgba(232,117,10,0.06)",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {project.project_name
                  ?.split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "5px 14px",
                  borderRadius: 9999,
                  background: MY_COLORS.gradientOrange,
                  fontFamily: FONTS.primary,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#fff",
                }}
              >
                {t("featuredCaseStudy.badges.featured")}
              </span>
              <span
                style={{
                  padding: "5px 14px",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontFamily: FONTS.primary,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: MY_COLORS.textSecondary,
                }}
              >
                {project.industry_category}
              </span>
            </div>

            <div>
              <div
                style={{
                  fontFamily: FONTS.secondary,
                  fontSize: FONTS.size.xs,
                  color: MY_COLORS.textMuted,
                  marginBottom: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {t("featuredCaseStudy.keyResults.label")}
              </div>
              <div style={{ display: "flex", gap: isMobile ? 8 : 12 }}>
                {(project.results ?? []).map((r, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      padding: isMobile ? "10px 8px" : "14px 12px",
                      borderRadius: 12,
                      background: "rgba(10,10,10,0.6)",
                      border: `1px solid ${MY_COLORS.orangeBorder}`,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONTS.primary,
                        fontSize: isMobile ? 18 : "clamp(18px,2vw,24px)",
                        fontWeight: 800,
                        color: MY_COLORS.orange,
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {r.value}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.secondary,
                        fontSize: 10,
                        color: MY_COLORS.textMuted,
                        lineHeight: 1.3,
                      }}
                    >
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right content */}
          <div
            style={{
              background: MY_COLORS.bgSurface,
              padding: innerPad,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: isSmall ? 20 : 0,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONTS.secondary,
                  fontSize: FONTS.size.xs,
                  color: MY_COLORS.orange,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  marginBottom: 8,
                }}
              >
                {project.client_confidential
                  ? t("featuredCaseStudy.badges.confidentialClient")
                  : project.client_name}
              </div>

              <h3
                style={{
                  fontFamily: FONTS.primary,
                  fontSize: isMobile
                    ? "clamp(18px,4.5vw,24px)"
                    : "clamp(22px,2.5vw,32px)",
                  fontWeight: 800,
                  color: MY_COLORS.textPrimary,
                  margin: "0 0 16px",
                  lineHeight: "1.25",
                }}
              >
                {project.project_name}
              </h3>

              {["challenge", "solution"].map((key) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      fontFamily: FONTS.primary,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: MY_COLORS.textDisabled,
                      marginBottom: 6,
                    }}
                  >
                    {key === "challenge"
                      ? t("featuredCaseStudy.projectDetails.challenge")
                      : t("featuredCaseStudy.projectDetails.solution")}
                  </div>
                  <p
                    style={{
                      fontFamily: FONTS.secondary,
                      fontSize: isMobile ? 13 : FONTS.size.sm,
                      lineHeight: "1.7",
                      color: MY_COLORS.textMuted,
                      margin: 0,
                    }}
                  >
                    {key === "challenge"
                      ? project.challenge_description
                      : project.solution_description}
                  </p>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: isMobile ? 16 : 28,
                }}
              >
                {(project.technologies ?? []).map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 9999,
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${MY_COLORS.border}`,
                      fontFamily: FONTS.secondary,
                      fontSize: 11,
                      color: MY_COLORS.textMuted,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {project.testimonial && (
                <div
                  style={{
                    padding: isMobile ? "14px 16px" : "20px",
                    borderRadius: 12,
                    background: MY_COLORS.orangeDim,
                    border: `1px solid ${MY_COLORS.orangeBorder}`,
                    marginBottom: isMobile ? 16 : 24,
                  }}
                >
                  <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                    {Array(project.testimonial.rating ?? 0)
                      .fill(0)
                      .map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                  </div>
                  <p
                    style={{
                      fontFamily: FONTS.secondary,
                      fontSize: isMobile ? 12 : FONTS.size.sm,
                      lineHeight: "1.7",
                      color: MY_COLORS.textSecondary,
                      margin: "0 0 10px",
                      fontStyle: "italic",
                    }}
                  >
                    "{project.testimonial.quote}"
                  </p>
                  <div
                    style={{
                      fontFamily: FONTS.primary,
                      fontSize: FONTS.size.xs,
                      fontWeight: 700,
                      color: MY_COLORS.orange,
                    }}
                  >
                    {t("featuredCaseStudy.testimonial.authorFormat", {
                      author: project.testimonial.author,
                      title: project.testimonial.title,
                    })}
                  </div>
                </div>
              )}

              <Link
                to={`/portfolio/${project.slug}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ctaHovered ? 12 : 8,
                  padding: isMobile ? "12px 22px" : "13px 28px",
                  borderRadius: 10,
                  background: MY_COLORS.gradientOrange,
                  color: "#fff",
                  fontFamily: FONTS.primary,
                  fontSize: FONTS.size.sm,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  boxShadow: ctaHovered
                    ? "0 0 32px rgba(232,117,10,0.5)"
                    : "0 0 16px rgba(232,117,10,0.3)",
                  transform: ctaHovered ? "translateY(-2px)" : "translateY(0)",
                  transition: "all 0.3s ease",
                  width: isMobile ? "100%" : "auto",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                {t("featuredCaseStudy.cta")} <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;