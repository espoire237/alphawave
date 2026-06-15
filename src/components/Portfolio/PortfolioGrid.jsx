/**
 * PortfolioGrid — Portfolio Page Section 2
 * Real-time filter by category + service type + project cards
 * AlphaWaves brand system
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PROJECTS,
  CATEGORIES,
  SERVICE_FILTERS,
} from "../../data/portfolioData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TechBadge = ({ label }) => (
  <span
    style={{
      padding: "3px 10px",
      borderRadius: 9999,
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${MY_COLORS.border}`,
      fontFamily: FONTS.secondary,
      fontSize: 10,
      fontWeight: FONTS.weight.medium,
      color: MY_COLORS.textMuted,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </span>
);

const ResultBadge = ({ result }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 14px",
      borderRadius: 10,
      background: MY_COLORS.orangeDim,
      border: `1px solid ${MY_COLORS.orangeBorder}`,
      minWidth: 80,
      flex: 1,
    }}
  >
    <span
      style={{
        fontFamily: FONTS.primary,
        fontSize: FONTS.size.md,
        fontWeight: FONTS.weight.extrabold,
        color: MY_COLORS.orange,
        lineHeight: 1,
        marginBottom: 4,
      }}
    >
      {result.value}
    </span>
    <span
      style={{
        fontFamily: FONTS.secondary,
        fontSize: 10,
        color: MY_COLORS.textMuted,
        textAlign: "center",
        lineHeight: 1.3,
      }}
    >
      {result.label}
    </span>
  </div>
);

const ProjectCard = ({ project, t }) => {
  const proj_t = t(`portfolioPage.projects.${project.slug}`, {
    returnObjects: true,
  }) || {};

  const [hovered, setHovered] = useState(false);
  const catLabel = t(`portfolioPage.categories.${project.industry_category}`);

  const projectName = proj_t.project_name || "";
  const clientName = proj_t.client_name || "";
  const shortDescription = proj_t.short_description || "";
  const results = Array.isArray(proj_t.results) ? proj_t.results : [];
  const technologies = Array.isArray(proj_t.technologies) ? proj_t.technologies : [];

  const initials = projectName
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        background: hovered ? "rgba(232,117,10,0.04)" : MY_COLORS.bgSurface,
        border: `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          height: 200,
          background: `linear-gradient(135deg, rgba(232,117,10,0.15) 0%, rgba(10,10,10,0.9) 100%)`,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.primary,
            fontSize: 48,
            fontWeight: FONTS.weight.extrabold,
            color: MY_COLORS.orangeBorder,
            letterSpacing: FONTS.tracking.tight,
            userSelect: "none",
          }}
        >
          {initials}
        </div>

        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            padding: "4px 12px",
            borderRadius: 9999,
            background: "rgba(10,10,10,0.75)",
            border: `1px solid ${MY_COLORS.orangeBorder}`,
            fontFamily: FONTS.primary,
            fontSize: 10,
            fontWeight: FONTS.weight.bold,
            letterSpacing: FONTS.tracking.widest,
            textTransform: "uppercase",
            color: MY_COLORS.orange,
            backdropFilter: "blur(8px)",
          }}
        >
          {catLabel}
        </div>

        {proj_t.featured && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              padding: "4px 10px",
              borderRadius: 9999,
              background: MY_COLORS.gradientOrange,
              fontFamily: FONTS.primary,
              fontSize: 10,
              fontWeight: FONTS.weight.bold,
              letterSpacing: FONTS.tracking.widest,
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            {t("portfolioPage.grid.featured")}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "24px 24px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.secondary,
            fontSize: FONTS.size.xs,
            color: MY_COLORS.orange,
            fontWeight: FONTS.weight.semibold,
            marginBottom: 6,
            letterSpacing: FONTS.tracking.wide,
          }}
        >
          {proj_t.client_confidential
            ? t("portfolioPage.grid.confidential")
            : clientName}
        </div>

        <h3
          style={{
            fontFamily: FONTS.primary,
            fontSize: FONTS.size.md,
            fontWeight: FONTS.weight.bold,
            letterSpacing: FONTS.tracking.tight,
            color: MY_COLORS.textPrimary,
            margin: "0 0 10px",
            lineHeight: FONTS.leading.snug,
          }}
        >
          {projectName}
        </h3>

        <p
          style={{
            fontFamily: FONTS.secondary,
            fontSize: FONTS.size.sm,
            lineHeight: FONTS.leading.relaxed,
            color: MY_COLORS.textMuted,
            margin: "0 0 16px",
            flex: 1,
          }}
        >
          {shortDescription}
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {results.slice(0, 3).map((r, i) => (
            <ResultBadge key={i} result={r} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 20,
          }}
        >
          {technologies.map((tech, i) => (
            <TechBadge key={i} label={tech} />
          ))}
        </div>

        <Link
          to={`/portfolio/${project.slug}`}
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: hovered ? 10 : 6,
            fontFamily: FONTS.primary,
            fontSize: FONTS.size.sm,
            fontWeight: FONTS.weight.bold,
            letterSpacing: FONTS.tracking.wide,
            color: hovered ? MY_COLORS.orange : MY_COLORS.textMuted,
            transition: "all 0.3s ease",
            paddingTop: 12,
            borderTop: `1px solid ${MY_COLORS.border}`,
          }}
        >
          {t("portfolioPage.grid.viewCaseStudy")} <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

const FilterPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "7px 16px",
      borderRadius: 9999,
      border: `1px solid ${active ? MY_COLORS.orange : MY_COLORS.border}`,
      background: active ? MY_COLORS.orangeDim : "transparent",
      color: active ? MY_COLORS.orange : MY_COLORS.textMuted,
      fontFamily: FONTS.primary,
      fontSize: FONTS.size.xs,
      fontWeight: FONTS.weight.semibold,
      letterSpacing: FONTS.tracking.wide,
      cursor: "pointer",
      transition: "all 0.2s ease",
      whiteSpace: "nowrap",
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.borderColor = MY_COLORS.orangeBorder;
        e.currentTarget.style.color = MY_COLORS.textSecondary;
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.borderColor = MY_COLORS.border;
        e.currentTarget.style.color = MY_COLORS.textMuted;
      }
    }}
  >
    {label}
  </button>
);

const EmptyState = ({ t }) => (
  <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 0" }}>
    <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
    <h3
      style={{
        fontFamily: FONTS.primary,
        fontSize: FONTS.size.lg,
        fontWeight: FONTS.weight.bold,
        color: MY_COLORS.textPrimary,
        marginBottom: 10,
      }}
    >
      {t("portfolioPage.grid.emptyTitle")}
    </h3>
    <p
      style={{
        fontFamily: FONTS.secondary,
        fontSize: FONTS.size.base,
        color: MY_COLORS.textMuted,
      }}
    >
      {t("portfolioPage.grid.emptyDesc")}
    </p>
  </div>
);

const PortfolioGrid = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeService, setActiveService] = useState("all");
  const sectionRef = useRef(null);

  const filtered = PROJECTS.filter((p) => {
    const matchCat =
      activeCategory === "all" || p.industry_category === activeCategory;
    const matchService =
      activeService === "all" || p.project_type === activeService;
    return matchCat && matchService && p.status === "published";
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll("[data-reveal]").forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: MY_COLORS.bgBase,
        padding: "80px 0 100px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
        }}
      >
        <div style={{ marginBottom: 40 }}>
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
                fontWeight: FONTS.weight.bold,
                letterSpacing: FONTS.tracking.widest,
                textTransform: "uppercase",
                color: MY_COLORS.orange,
              }}
            >
              {t("portfolioPage.grid.eyebrow")}
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
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: FONTS.weight.extrabold,
              letterSpacing: FONTS.tracking.tight,
              color: MY_COLORS.textPrimary,
              margin: "0 0 8px",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {t("portfolioPage.grid.title")}{" "}
            <span
              style={{
                color: MY_COLORS.orange,
                textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
              }}
            >
              {t("portfolioPage.grid.titleAccent")}
            </span>
          </h2>

          <p
            data-reveal
            style={{
              fontFamily: FONTS.secondary,
              fontSize: FONTS.size.md,
              lineHeight: FONTS.leading.relaxed,
              color: MY_COLORS.textSecondary,
              margin: 0,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {filtered.length}{" "}
            {filtered.length !== 1
              ? t("portfolioPage.grid.projectSuffixPlural")
              : t("portfolioPage.grid.projectSuffix")}{" "}
            — {t("portfolioPage.grid.resultsCopy")}
          </p>
        </div>

        <div
          data-reveal
          style={{
            marginBottom: 48,
            opacity: 0,
            transform: "translateY(16px)",
            transition: "all 0.6s ease",
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <span
              style={{
                fontFamily: FONTS.primary,
                fontSize: FONTS.size.xs,
                fontWeight: FONTS.weight.bold,
                letterSpacing: FONTS.tracking.widest,
                textTransform: "uppercase",
                color: MY_COLORS.textDisabled,
                marginRight: 12,
              }}
            >
              {t("portfolioPage.grid.industryLabel")}
            </span>
            <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 8 }}>
              {CATEGORIES.map((cat) => (
                <FilterPill
                  key={cat.id}
                  label={t(`portfolioPage.categories.${cat.id}`)}
                  active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <span
              style={{
                fontFamily: FONTS.primary,
                fontSize: FONTS.size.xs,
                fontWeight: FONTS.weight.bold,
                letterSpacing: FONTS.tracking.widest,
                textTransform: "uppercase",
                color: MY_COLORS.textDisabled,
                marginRight: 12,
              }}
            >
              {t("portfolioPage.grid.serviceLabel")}
            </span>
            <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 8 }}>
              {SERVICE_FILTERS.map((svc) => (
                <FilterPill
                  key={svc.id}
                  label={t(`portfolioPage.serviceFilters.${svc.id}`)}
                  active={activeService === svc.id}
                  onClick={() => setActiveService(svc.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="portfolio-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {filtered.length === 0 ? (
            <EmptyState t={t} />
          ) : (
            filtered.map((project) => (
              <ProjectCard key={project.id} project={project} t={t} />
            ))
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .portfolio-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px)  { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default PortfolioGrid;