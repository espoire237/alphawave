/**
 * WhyCameroon — About Page Section 6
 * AlphaWaves brand system
 */

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll("[data-reveal]").forEach((item, i) => {
          setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0)"; }, i * 130);
        });
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el); return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

const GlobeIcon   = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const NetworkIcon = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/><circle cx="12" cy="12" r="3"/></svg>;
const BuildingIcon = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="2"/><line x1="15" y1="22" x2="15" y2="2"/><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/></svg>;

const COL_ICONS = [<GlobeIcon />, <NetworkIcon />, <BuildingIcon />];
const COL_KEYS  = ["bilingual", "hub", "testing"];

const SpotlightCard = ({ col, idx }) => {
  const [mousePos, setMousePos]   = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      data-reveal
      className="group relative p-10 rounded-[24px] border transition-all duration-500 opacity-0 translate-y-10 hover:-translate-y-2 overflow-hidden"
      style={{ background: col.highlight ? `linear-gradient(145deg, rgba(232,117,10,0.1) 0%, rgba(232,117,10,0.04) 100%)` : MY_COLORS.bgSurface, borderColor: col.highlight ? MY_COLORS.orangeBorder : MY_COLORS.border, transitionDelay: `${idx * 130}ms` }}>
      <div className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: isHovered ? 1 : 0, background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232,117,10,0.08), transparent 40%)` }} />
      <div className={`absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300 z-10 ${col.highlight ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        style={{ background: MY_COLORS.gradientOrange }} />
      <span className="absolute -bottom-4 -right-4 text-8xl opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none select-none z-0">🌍</span>
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 border transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(232,117,10,0.3)]"
          style={{ background: col.highlight ? MY_COLORS.orangeDim : MY_COLORS.bgSurfaceHover, borderColor: col.highlight ? MY_COLORS.orangeBorder : MY_COLORS.border, color: MY_COLORS.orange }}>
          {col.icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-4 transition-colors duration-300"
          style={{ fontFamily: FONTS.primary, color: col.highlight ? MY_COLORS.orange : MY_COLORS.textPrimary }}>
          {col.headline}
        </h3>
        <div className="h-0.5 rounded-full mb-5 transition-all duration-300 w-8 group-hover:w-12" style={{ background: MY_COLORS.gradientOrange }} />
        <p className="text-base leading-relaxed mb-8" style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textSecondary }}>
          {col.content}
        </p>
        <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: MY_COLORS.border }}>
          <span className="text-3xl font-black" style={{ fontFamily: FONTS.primary, color: MY_COLORS.orange }}>{col.stat}</span>
          <span className="text-xs uppercase font-bold tracking-wider leading-tight" style={{ color: MY_COLORS.textMuted }}>{col.statLabel}</span>
        </div>
      </div>
    </div>
  );
};

const WhyCameroon = () => {
  const { t }      = useTranslation();
  const sectionRef = useScrollReveal(0.08);

  // ✅ COLUMNS array inside component so t() is in scope
  const COLUMNS = COL_KEYS.map((key, i) => ({
    id:        i + 1,
    icon:      COL_ICONS[i],
    headline:  t(`whyCameroon.columns.${key}.headline`),
    content:   t(`whyCameroon.columns.${key}.content`),
    stat:      t(`whyCameroon.columns.${key}.stat`),
    statLabel: t(`whyCameroon.columns.${key}.statLabel`),
    highlight: i === 0,
  }));

  const LANG_ITEMS = [
    { langKey: "english", subKey: "englishSub", flag: "🇬🇧" },
    { langKey: "french",  subKey: "frenchSub",  flag: "🇫🇷" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24 lg:py-32" style={{ background: MY_COLORS.bgSection }}>
      <div className="absolute -bottom-64 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] rounded-[50%] blur-[120px] pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse, ${MY_COLORS.orangeSection} 0%, transparent 65%)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div data-reveal className="inline-flex items-center gap-2 mb-6 opacity-0 translate-y-5 transition-all duration-700 ease-out">
            {["#007A5E","#CE1126","#FCD116"].map((color, i) => (
              <div key={i} className="w-5 h-[3px] rounded-full" style={{ background: color }} />
            ))}
            <span className="uppercase font-bold tracking-[0.2em] text-[10px] md:text-xs mx-2" style={{ fontFamily: FONTS.primary, color: MY_COLORS.orange }}>
              {t("whyCameroon.eyebrow")}
            </span>
            {["#FCD116","#CE1126","#007A5E"].map((color, i) => (
              <div key={i} className="w-5 h-[3px] rounded-full" style={{ background: color }} />
            ))}
          </div>
          <h2 data-reveal className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 opacity-0 translate-y-5 transition-all duration-700 delay-100 ease-out"
            style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}>
            {t("whyCameroon.title")} <span style={{ color: MY_COLORS.orange }}>{t("whyCameroon.titleAccent")}</span>
          </h2>
          <p data-reveal className="max-w-xl mx-auto text-base md:text-lg leading-relaxed opacity-0 translate-y-5 transition-all duration-700 delay-200 ease-out"
            style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textMuted }}>
            {t("whyCameroon.subtitle")}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20">
          {COLUMNS.map((col, idx) => <SpotlightCard key={col.id} col={col} idx={idx} />)}
        </div>

        {/* Bottom Banner */}
        <div data-reveal className="relative p-8 md:p-14 rounded-3xl border flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden opacity-0 translate-y-10 transition-all duration-700 delay-500"
          style={{ background: `linear-gradient(105deg, rgba(232,117,10,0.1) 0%, rgba(232,117,10,0.04) 50%, transparent 100%)`, borderColor: MY_COLORS.orangeBorder }}>
          <div className="relative z-10 flex-1 text-center lg:text-left">
            <div className="uppercase font-bold tracking-[0.2em] text-[10px] md:text-xs mb-4" style={{ fontFamily: FONTS.primary, color: MY_COLORS.orange }}>
              {t("whyCameroon.banner.eyebrow")}
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight" style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}>
              {t("whyCameroon.banner.title")} <br className="hidden md:block" />
              <span style={{ color: MY_COLORS.orange }}>{t("whyCameroon.banner.titleAccent")}</span>
            </h3>
            <p className="max-w-xl text-base md:text-lg leading-relaxed" style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textSecondary }}>
              {t("whyCameroon.banner.subtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto relative z-10">
            {LANG_ITEMS.map((item) => (
              <div key={item.langKey} className="flex items-center gap-4 p-4 rounded-xl border bg-black/20 backdrop-blur-sm min-w-[240px] transition-transform hover:scale-105"
                style={{ borderColor: MY_COLORS.border }}>
                <span className="text-2xl">{item.flag}</span>
                <div className="flex-1">
                  <div className="font-bold text-white" style={{ fontFamily: FONTS.primary }}>{t(`whyCameroon.banner.${item.langKey}`)}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400">{t(`whyCameroon.banner.${item.subKey}`)}</div>
                </div>
                <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(232,117,10,0.8)]" style={{ background: MY_COLORS.orange }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCameroon;