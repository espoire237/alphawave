import { useEffect, useRef } from "react";
import { PROCESS_STEPS } from "../../data/serviceData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { useTranslation } from "react-i18next";

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
            }, i * 150);
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

const HowWeWork = () => {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: MY_COLORS.bgBase,
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -200,
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
        <div style={{ textAlign: "center", marginBottom: 72 }}>
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
              {t("servicesPage.howWeWork.eyebrow")}
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
              maxWidth: 600,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {t("servicesPage.howWeWork.title")}{" "}
            <span
              style={{
                color: MY_COLORS.orange,
                textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
              }}
            >
              {t("servicesPage.howWeWork.titleAccent")}
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
              maxWidth: 500,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {t("servicesPage.howWeWork.subtitle")}
          </p>
        </div>

        {/* Steps horizontal timeline */}
        <div style={{ position: "relative" }}>
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              top: 36,
              left: "10%",
              right: "10%",
              height: 1,
              background: `linear-gradient(to right, transparent, ${MY_COLORS.orangeBorder}, transparent)`,
              zIndex: 0,
            }}
          />

          {/* Steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 16,
              position: "relative",
              zIndex: 1,
            }}
          >
            {PROCESS_STEPS.map((step, i) => {
              const step_t = t(`servicesPage.data.processSteps.${step.id}`, {
                returnObjects: true,
              });

              return(
              <div
                key={step.id}
                data-reveal
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  opacity: 0,
                  transform: "translateY(24px)",
                  transition: "all 0.6s ease",
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: MY_COLORS.bgSurface,
                    border: `2px solid ${MY_COLORS.orangeBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginBottom: 20,
                    position: "relative",
                    boxShadow: `0 0 24px rgba(232,117,10,0.15)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.primary,
                      fontSize: 10,
                      fontWeight: FONTS.weight.bold,
                      letterSpacing: FONTS.tracking.widest,
                      color: MY_COLORS.orange,
                    }}
                  >
                    {String(i+1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.size.sm,
                    fontWeight: FONTS.weight.bold,
                    letterSpacing: FONTS.tracking.tight,
                    color: MY_COLORS.textPrimary,
                    margin: "0 0 10px",
                    lineHeight: FONTS.leading.snug,
                  }}
                >
                  {step_t.title}
                </h3>

                {/* Desc */}
                <p
                  style={{
                    fontFamily: FONTS.secondary,
                    fontSize: FONTS.size.xs,
                    lineHeight: FONTS.leading.relaxed,
                    color: MY_COLORS.textMuted,
                    margin: 0,
                  }}
                >
                  {step_t.desc}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .process-grid { grid-template-columns: 1fr !important; } .process-line { display: none !important; } }`}</style>
    </section>
  );
};

export default HowWeWork;
