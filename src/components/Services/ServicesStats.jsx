import { useEffect, useRef, useState } from "react";
import { STATS, TESTIMONIALS } from "../../data/serviceData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { useTranslation } from "react-i18next";

// ── Animated counter hook ─────────────────────────────────────
const useCounter = (target, duration = 2000, started = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
};

const StatItem = ({ stat, started }) => {
  const { t } = useTranslation();
  const stat_t = t(`servicesPage.data.stats.${stat.id}`, {
    returnObjects: true,
  });

  const count = useCounter(stat.value, 2000, started);
  const display =
    stat.value >= 1000
      ? count >= 1000
        ? `${Math.floor(count / 1000)}k`
        : count
      : count;

  return (
    <div
      data-reveal
      style={{
        textAlign: "center",
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.6s ease",
      }}
    >
      <div
        style={{
          fontFamily: FONTS.primary,
          fontSize: "clamp(36px, 4vw, 52px)",
          fontWeight: FONTS.weight.extrabold,
          letterSpacing: FONTS.tracking.tight,
          color: MY_COLORS.orange,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {display}
        {stat.suffix}
      </div>
      <div
        style={{
          fontFamily: FONTS.secondary,
          fontSize: FONTS.size.sm,
          color: MY_COLORS.textMuted,
          lineHeight: FONTS.leading.relaxed,
        }}
      >
        {stat_t.label}
      </div>
    </div>
  );
};

const ServicesStats = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          el.querySelectorAll("[data-reveal]").forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Get the published testimonial id from static data, then fetch its text from t()
  const testimonialMeta = TESTIMONIALS.find(
    (item) => item.status === "published",
  );
  const testimonial_t = testimonialMeta
    ? t(`servicesPage.data.testimonials.${testimonialMeta.id}`, {
        returnObjects: true,
      })
    : null;

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
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 900,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(232,117,10,0.07) 0%, transparent 65%)`,
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
              {t("servicesPage.stats.eyebrow")}
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
              maxWidth: 500,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {t("servicesPage.stats.title")}{" "}
            <span
              style={{
                color: MY_COLORS.orange,
                textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
              }}
            >
              {t("servicesPage.stats.titleAccent")}
            </span>
          </h2>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 32,
            marginBottom: 80,
          }}
        >
          {STATS.map((stat) => (
            <StatItem key={stat.id} stat={stat} started={started} />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(to right, transparent, ${MY_COLORS.border}, transparent)`,
            marginBottom: 64,
          }}
        />

        {/* Testimonial */}
        {testimonial_t && (
          <div
            data-reveal
            style={{
              maxWidth: 700,
              margin: "0 auto",
              textAlign: "center",
              opacity: 0,
              transform: "translateY(24px)",
              transition: "all 0.6s ease",
            }}
          >
            {/* Quote mark */}
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 80,
                lineHeight: 0.8,
                color: MY_COLORS.orangeBorder,
                marginBottom: 24,
                userSelect: "none",
              }}
            >
              "
            </div>

            <p
              style={{
                fontFamily: FONTS.secondary,
                fontSize: "clamp(16px, 2vw, 20px)",
                lineHeight: FONTS.leading.relaxed,
                color: MY_COLORS.textSecondary,
                margin: "0 0 28px",
                fontStyle: "italic",
              }}
            >
              {testimonial_t.quote}
            </p>

            {/* Author */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: MY_COLORS.orangeDim,
                  border: `1px solid ${MY_COLORS.orangeBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONTS.primary,
                  fontSize: FONTS.size.sm,
                  fontWeight: FONTS.weight.bold,
                  color: MY_COLORS.orange,
                }}
              >
                {testimonial_t.author[0]}
              </div>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.size.sm,
                    fontWeight: FONTS.weight.bold,
                    color: MY_COLORS.textPrimary,
                  }}
                >
                  {testimonial_t.author}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.secondary,
                    fontSize: FONTS.size.xs,
                    color: MY_COLORS.textMuted,
                  }}
                >
                  {testimonial_t.company} · {testimonial_t.category}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesStats;
