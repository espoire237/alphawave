import { useEffect, useRef } from "react";
import { TARGET_MARKETS } from "../../data/serviceData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { useTranslation } from "react-i18next";

const ICONS = {
  building: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 3V21M15 3V21M3 9H21M3 15H21"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  ),
  globe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3C12 3 8 7 8 12C8 17 12 21 12 21M12 3C12 3 16 7 16 12C16 17 12 21 12 21M3 12H21"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  ),
  rocket: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.5 16.5C3 18 2.5 21 2.5 21C2.5 21 5.5 20.5 7 19M4.5 16.5L7 19M4.5 16.5L9 12M7 19L12 14.5M9 12C9 12 11 8 15 5C19 2 22 2 22 2C22 2 22 5 19 9C16 13 12 14.5 12 14.5M9 12L12 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="7" r="1.5" fill="currentColor" />
    </svg>
  ),
};

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

const WhoWeServe = () => {
  const sectionRef = useScrollReveal();
  const { t } = useTranslation();

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
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 800,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(232,117,10,0.06) 0%, transparent 65%)`,
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
              {t("servicesPage.whoWeServe.eyebrow")}
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
            {t("servicesPage.whoWeServe.titleAccent")}
            <span
              style={{
                color: MY_COLORS.orange,
                textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
              }}
            >
              Partner With
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
            {t("servicesPage.whoWeServe.subtitle")}
          </p>
        </div>

        {/* 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {TARGET_MARKETS.map((market, i) => {
            const market_t = t(`servicesPage.data.targetMarkets.${market.id}`, { returnObjects: true });

            return (
              <div
                key={market.id}
                data-reveal
                style={{
                  padding: "40px 32px",
                  borderRadius: 16,
                  background: MY_COLORS.bgSurface,
                  border: `1px solid ${MY_COLORS.border}`,
                  textAlign: "center",
                  opacity: 0,
                  transform: "translateY(24px)",
                  transition: "all 0.6s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    right: "20%",
                    height: 2,
                    background: MY_COLORS.gradientOrange,
                    borderRadius: "0 0 9999px 9999px",
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: MY_COLORS.orangeDim,
                    border: `1px solid ${MY_COLORS.orangeBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: MY_COLORS.orange,
                    margin: "0 auto 20px",
                  }}
                >
                  {ICONS[market.icon]}
                </div>

                <h3
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.size.md,
                    fontWeight: FONTS.weight.bold,
                    letterSpacing: FONTS.tracking.tight,
                    color: MY_COLORS.textPrimary,
                    margin: "0 0 8px",
                  }}
                >
                  {market_t.title}
                </h3>

                <p
                  style={{
                    fontFamily: FONTS.secondary,
                    fontSize: FONTS.size.sm,
                    color: MY_COLORS.textMuted,
                    margin: "0 0 24px",
                    lineHeight: FONTS.leading.relaxed,
                  }}
                >
                  {market_t.subtitle}
                </p>

                {/* Sectors */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {market.sectors.map((s, j) => (
                    <span
                      key={j}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 9999,
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${MY_COLORS.border}`,
                        fontFamily: FONTS.secondary,
                        fontSize: FONTS.size.xs,
                        color: MY_COLORS.textMuted,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Focus */}
                <div
                  style={{
                    padding: "10px 14px",
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
                    {market_t.focus}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
