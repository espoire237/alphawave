/**
 * AboutCTA — About Page Section 10 — Final CTA
 * AlphaWaves brand system
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll("[data-reveal]").forEach((item, i) => {
          setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0) scale(1)"; }, i * 130);
        });
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el); return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

const ArrowRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Trust item icons don't need translation — only labels do
const TRUST_ICONS = ["⚡", "🔒", "📊", "🌍"];
const TRUST_KEYS  = ["response", "noLockIn", "roi", "africa"];

const AboutCTA = () => {
  const { t }      = useTranslation();
  const sectionRef = useScrollReveal(0.1);
  const [primaryHover,   setPrimary] = useState(false);
  const [secondaryHover, setSecond]  = useState(false);

  // ✅ TRUST_ITEMS inside component so t() is in scope
  const TRUST_ITEMS = TRUST_KEYS.map((key, i) => ({
    icon:  TRUST_ICONS[i],
    label: t(`aboutCTA.trust.${key}`),
  }));

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-32 overflow-hidden px-4 sm:px-6" style={{ background: MY_COLORS.bgBase }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute w-full h-full bottom-[-10%] left-1/2 -translate-x-1/2"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(232,117,10,0.15) 0%, transparent 70%)` }} />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="hidden lg:block absolute top-[20%] left-[8%] w-[300px] h-[300px] rounded-full animate-float-slow"
        style={{ background: `radial-gradient(circle, rgba(232,117,10,0.08) 0%, transparent 70%)` }} />
      <div className="hidden lg:block absolute bottom-[10%] right-[8%] w-[250px] h-[250px] rounded-full animate-float-reverse"
        style={{ background: `radial-gradient(circle, rgba(232,117,10,0.06) 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div data-reveal
          className="relative p-8 md:p-16 lg:p-24 rounded-[2rem] border overflow-hidden text-center opacity-0 translate-y-8 scale-[0.98] transition-all duration-1000"
          style={{ background: `linear-gradient(135deg, rgba(232,117,10,0.12) 0%, rgba(10,10,10,1) 100%)`, borderColor: MY_COLORS.orangeBorder }}>

          {/* Corner brackets */}
          {[["top-6 left-6 border-t-2 border-l-2 rounded-tl-md"],["top-6 right-6 border-t-2 border-r-2 rounded-tr-md"],["bottom-6 left-6 border-b-2 border-l-2 rounded-bl-md"],["bottom-6 right-6 border-b-2 border-r-2 rounded-br-md"]].map((cls, i) => (
            <div key={i} className={`absolute w-8 h-8 opacity-50 ${cls}`} style={{ borderColor: MY_COLORS.orange }} />
          ))}

          {/* Eyebrow */}
          <div data-reveal className="inline-flex items-center gap-3 mb-8 opacity-0 translate-y-4 transition-all duration-700 delay-100">
            <span className="w-6 h-0.5 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]" style={{ fontFamily: FONTS.primary, color: MY_COLORS.orange }}>
              {t("aboutCTA.eyebrow")}
            </span>
            <span className="w-6 h-0.5 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
          </div>

          {/* Headline */}
          <h2 data-reveal
            className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 opacity-0 translate-y-4 transition-all duration-700 delay-200"
            style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}>
            {t("aboutCTA.title")} <br className="hidden md:block" />
            <span style={{ color: MY_COLORS.orange, textShadow: `0 0 40px ${MY_COLORS.orangeGlow}` }}>
              {t("aboutCTA.titleAccent")}
            </span>
          </h2>

          {/* Subtext */}
          <p data-reveal
            className="text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-12 opacity-0 translate-y-4 transition-all duration-700 delay-300"
            style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textSecondary }}>
            {t("aboutCTA.subtitle")}
          </p>

          {/* Buttons */}
          <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 translate-y-4 transition-all duration-700 delay-400">
            <Link to="/contact"
              onMouseEnter={() => setPrimary(true)} onMouseLeave={() => setPrimary(false)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300"
              style={{ fontFamily: FONTS.primary, color: "#ffffff", background: MY_COLORS.gradientOrange, boxShadow: primaryHover ? `0 15px 40px rgba(232,117,10,0.4)` : `0 10px 25px rgba(232,117,10,0.2)`, transform: primaryHover ? "translateY(-3px)" : "translateY(0)" }}>
              {t("aboutCTA.primaryBtn")} <ArrowRight />
            </Link>
            <Link to="/services"
              onMouseEnter={() => setSecond(true)} onMouseLeave={() => setSecond(false)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold border transition-all duration-300"
              style={{ fontFamily: FONTS.primary, borderColor: secondaryHover ? MY_COLORS.orange : MY_COLORS.border, color: secondaryHover ? MY_COLORS.textPrimary : MY_COLORS.textSecondary, background: secondaryHover ? "rgba(255,255,255,0.05)" : "transparent", transform: secondaryHover ? "translateY(-3px)" : "translateY(0)" }}>
              {t("aboutCTA.secondaryBtn")} <ArrowRight />
            </Link>
          </div>

          {/* Trust Badges */}
          <div data-reveal
            className="grid grid-cols-2 md:flex items-center justify-center gap-6 md:gap-12 pt-10 border-t opacity-0 translate-y-4 transition-all duration-700 delay-500"
            style={{ borderColor: MY_COLORS.border }}>
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2 group">
                <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest"
                  style={{ fontFamily: FONTS.primary, color: MY_COLORS.textMuted }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-30px) scale(1.1); } }
        @keyframes float-reverse { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,30px) scale(1.1); } }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 12s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default AboutCTA;