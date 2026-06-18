/**
 * PortfolioMetrics Portfolio Page Section 6 FULLY RESPONSIVE
 */
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IMPACT_METRICS } from "../../data/portfolioData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const useCounter = (target, duration = 2000, started = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
};

const MetricItem = ({ metric, label, started }) => {
  const count = useCounter(metric.value, 2000, started);
  return (
    <div
      data-reveal
      style={{
        textAlign: "center",
        padding: "32px 16px",
        opacity: 0,
        transform: "translateY(24px)",
        transition: "all 0.6s ease",
      }}
    >
      <div
        style={{
          fontFamily: FONTS.primary,
          fontSize: "clamp(28px,4vw,52px)",
          fontWeight: 800,
          color: MY_COLORS.orange,
          lineHeight: 1,
          marginBottom: 8,
          textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
        }}
      >
        {metric.prefix}
        {count}
        {metric.suffix}
      </div>
      <div
        style={{
          fontFamily: FONTS.secondary,
          fontSize: FONTS.size.sm,
          color: MY_COLORS.textMuted,
          lineHeight: "1.4",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const PortfolioMetrics = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const { isMobile, isTablet } = useBreakpoint();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          el.querySelectorAll("[data-reveal]").forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const padding = isMobile
    ? "64px 20px"
    : isTablet
      ? "80px 32px"
      : "100px 40px";
  const cols = isMobile ? 2 : 3;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: MY_COLORS.bgBase,
        padding,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 1000,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(232,117,10,0.07) 0%, transparent 65%)",
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
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
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
              {t("portfolioMetrics.sectorLabel")}
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
            {t("portfolioMetrics.heading")}
            <span style={{ color: MY_COLORS.orange }}>
              {t("portfolioMetrics.headingHighlight")}
            </span>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols},1fr)`,
            gap: 2,
          }}
        >
          {IMPACT_METRICS.map((metric, i) => (
            <div
              key={metric.id}
              style={{
                borderRight:
                  (i + 1) % cols !== 0
                    ? `1px solid ${MY_COLORS.border}`
                    : "none",
                borderBottom:
                  i < IMPACT_METRICS.length - cols
                    ? `1px solid ${MY_COLORS.border}`
                    : "none",
              }}
            >
              <MetricItem
                metric={metric}
                started={started}
                label={t(`portfolioMetrics.metrics.${metric.id}.label`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PortfolioMetrics;
