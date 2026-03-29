/**
 * HomeStats — Homepage Section 5 — FULLY RESPONSIVE
 */
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

// Values and suffixes don't change — only labels are translated
const STATS_BASE = [
  { id:1, value:50,  suffix:"+",  labelKey:"projects"     },
  { id:2, value:30,  suffix:"+",  labelKey:"clients"      },
  { id:3, value:10,  suffix:"+",  labelKey:"countries"    },
  { id:4, value:300, suffix:"%+", labelKey:"roi"          },
  { id:5, value:98,  suffix:"%",  labelKey:"satisfaction" },
  { id:6, value:100, suffix:"K+", labelKey:"transactions" },
];

const useCounter = (target, duration=2000, started=false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
};

const StatItem = ({ stat, started, borderRight }) => {
  const count = useCounter(stat.value, 2000, started);
  return (
    <div data-reveal style={{ textAlign:"center", padding:"36px 16px", borderRight:borderRight?`1px solid ${MY_COLORS.border}`:"none", opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>
      <div style={{ fontFamily:FONTS.primary, fontSize:"clamp(26px,3.5vw,48px)", fontWeight:FONTS.weight.extrabold, color:MY_COLORS.orange, lineHeight:1, marginBottom:8, textShadow:`0 0 24px ${MY_COLORS.orangeGlow}` }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontFamily:FONTS.secondary, fontSize:FONTS.size.xs, color:MY_COLORS.textMuted, lineHeight:"1.4" }}>{stat.label}</div>
    </div>
  );
};

const HomeStats = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useBreakpoint();
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  // ✅ STATS with translated labels inside component
  const STATS = STATS_BASE.map(s => ({ ...s, label: t(`homeStats.${s.labelKey}`) }));

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStarted(true);
        el.querySelectorAll("[data-reveal]").forEach((item,i) => { setTimeout(() => { item.style.opacity="1"; item.style.transform="translateY(0)"; }, i*80); });
        obs.disconnect();
      }
    }, { threshold:0.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const cols = isMobile ? 2 : isTablet ? 3 : 6;
  return (
    <div ref={ref} style={{ position:"relative", background:MY_COLORS.bgBase, borderTop:`1px solid ${MY_COLORS.border}`, borderBottom:`1px solid ${MY_COLORS.border}`, overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:MY_COLORS.gradientOrange, opacity:0.4 }}/>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:isMobile?"0 20px":"0 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols}, 1fr)` }}>
          {STATS.map((stat,i) => {
            const borderRight = (i+1)%cols !== 0 && i !== STATS.length-1;
            return <StatItem key={stat.id} stat={stat} started={started} borderRight={borderRight}/>;
          })}
        </div>
      </div>
    </div>
  );
};
export default HomeStats;