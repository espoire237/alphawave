/**
 * PortfolioStatsBar — Portfolio Page Section 1 addon — FULLY RESPONSIVE
 */
import { useEffect, useRef, useState } from "react";
import { PORTFOLIO_STATS } from "../../data/portfolioData.js";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { useTranslation } from "react-i18next";

const useCounter = (target, duration = 1800, started = false) => {
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

const StatItem = ({ stat, started, isLast, isMobile }) => {
  const { t } = useTranslation();
  const stat_t = t(`portfolioPage.statsBar.${stat.id}`, {
    returnObjects: true,
  });
  const count = useCounter(stat.value, 1800, started);
  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        padding: isMobile ? "20px 10px" : "28px 20px",
        borderRight: isLast ? "none" : `1px solid ${MY_COLORS.border}`,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.primary,
          fontSize: isMobile ? "clamp(20px,5vw,28px)" : "clamp(24px,3vw,40px)",
          fontWeight: 800,
          color: MY_COLORS.orange,
          lineHeight: 1,
          marginBottom: 4,
          textShadow: `0 0 20px ${MY_COLORS.orangeGlow}`,
        }}
      >
        {count}
        {stat_t.suffix}
      </div>
      <div
        style={{
          fontFamily: FONTS.secondary,
          fontSize: isMobile ? 11 : FONTS.size.sm,
          color: MY_COLORS.textMuted,
        }}
      >
        {stat_t.label}
      </div>
    </div>
  );
};

const PortfolioStatsBar = () => {
  const ref = useRef(null);
  const { isMobile } = useBreakpoint();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        background: MY_COLORS.bgSection,
        borderTop: `1px solid ${MY_COLORS.border}`,
        borderBottom: `1px solid ${MY_COLORS.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: MY_COLORS.gradientOrange,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 40px",
          display: "flex",
        }}
      >
        {PORTFOLIO_STATS.map((stat, i,t) => (
          <StatItem
            key={stat.id}
            t={t}
            stat={stat}
            started={started}
            isLast={i === PORTFOLIO_STATS.length - 1}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};
export default PortfolioStatsBar;
