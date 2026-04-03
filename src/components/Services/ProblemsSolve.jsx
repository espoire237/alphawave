import { useState, useEffect, useRef } from "react";
import { PROBLEMS } from "../../data/serviceData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { useTranslation } from "react-i18next";

const ICONS = {
  eye: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  payment: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M2 10H22M6 15H10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 20H21M5 20V14M9 20V8M13 20V11M17 20V4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  gear: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2V4M12 20V22M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M2 12H4M20 12H22M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  team: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 20C3 17.24 5.69 15 9 15C12.31 15 15 17.24 15 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17 13C18.66 13 20 14.34 20 16V20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const useScrollReveal = (threshold = 0.08) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
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
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

const ProblemCard = ({ item ,t}) => {
  const [hovered, setHovered] = useState(false);
  const item_t = t(`servicesPage.data.problems.${item.id}`, { returnObjects: true });


  return (
    <div
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px 24px",
        borderRadius: 14,
        background: hovered ? "rgba(232,117,10,0.04)" : MY_COLORS.bgSurface,
        border: `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        opacity: 0,
        cursor: "default",
      }}
    >
      {/* Icon + Problem */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: hovered
              ? MY_COLORS.orangeDim
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: hovered ? MY_COLORS.orange : MY_COLORS.textMuted,
            flexShrink: 0,
            transition: "all 0.3s ease",
          }}
        >
          {ICONS[item.icon]}
        </div>
        <h3
          style={{
            fontFamily: FONTS.primary,
            fontSize: FONTS.size.base,
            fontWeight: FONTS.weight.bold,
            color: MY_COLORS.textPrimary,
            margin: 0,
          }}
        >
          {item_t.problem}
        </h3>
      </div>

      {/* Problem desc */}
      <p
        style={{
          fontFamily: FONTS.secondary,
          fontSize: FONTS.size.sm,
          lineHeight: FONTS.leading.relaxed,
          color: MY_COLORS.textMuted,
          margin: "0 0 16px",
        }}
      >
        {item_t.desc}
      </p>

      {/* Divider */}
      <div
        style={{ height: 1, background: MY_COLORS.border, margin: "0 0 16px" }}
      />

      {/* Solution */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <span style={{ color: MY_COLORS.orange, flexShrink: 0, marginTop: 2 }}>
          <ArrowRight />
        </span>
        <p
          style={{
            fontFamily: FONTS.secondary,
            fontSize: FONTS.size.sm,
            lineHeight: FONTS.leading.relaxed,
            color: MY_COLORS.textSecondary,
            margin: 0,
          }}
        >
          <strong
            style={{
              color: MY_COLORS.textPrimary,
              fontWeight: FONTS.weight.semibold,
            }}
          >
           {t("servicesPage.problemsSolve.solution")}{" "}
          </strong>
          {item_t.solution}
        </p>
      </div>

      {/* Outcome */}
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 8,
          background: MY_COLORS.orangeDim,
          border: `1px solid ${MY_COLORS.orangeBorder}`,
        }}
      >
        <p
          style={{
            fontFamily: FONTS.secondary,
            fontSize: FONTS.size.xs,
            color: MY_COLORS.orange,
            margin: 0,
            fontWeight: FONTS.weight.semibold,
          }}
        >
          ✦ {item_t.outcome}
        </p>
      </div>
    </div>
  );
};

const ProblemsSolve = () => {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: MY_COLORS.bgSection,
        padding: "100px 0",
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
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
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
              {t("servicesPage.problemsSolve.eyebrow")}
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
              margin: "0 auto 16px",
              maxWidth: 640,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {t("servicesPage.problemsSolve.title")}{" "}
            <span
              style={{
                color: MY_COLORS.orange,
                textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
              }}
            >
               {t("servicesPage.problemsSolve.titleAccent")}
            </span>
          </h2>

          <p
            data-reveal
            style={{
              fontFamily: FONTS.secondary,
              fontSize: FONTS.size.md,
              lineHeight: FONTS.leading.relaxed,
              color: MY_COLORS.textSecondary,
              margin: "0 auto",
              maxWidth: 520,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {t("servicesPage.problemsSolve.subtitle")}
          </p>
        </div>

        {/* Cards grid — 3 + 2 layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginBottom: 20,
          }}
        >
          {PROBLEMS.slice(0, 3).map((item) => (
            <ProblemCard key={item.id} item={item} t={t} />
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            maxWidth: "67%",
            margin: "0 auto",
          }}
        >
          {PROBLEMS.slice(3).map((item) => (
            <ProblemCard key={item.id} item={item}
            t={t}
            
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSolve;
