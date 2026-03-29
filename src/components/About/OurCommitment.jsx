/**
 * OurCommitment — About Page Section 9
 * AlphaWaves brand system
 */

import { useEffect, useRef } from "react";
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

const COMMITMENT_IDS = ["1", "2", "3"];

const OurCommitment = () => {
  const { t }      = useTranslation();
  const sectionRef = useScrollReveal(0.1);

  // ✅ COMMITMENTS array inside component so t() is in scope
  const COMMITMENTS = COMMITMENT_IDS.map(id => ({
    id:      Number(id),
    heading: t(`ourCommitment.items.${id}.heading`),
    text:    t(`ourCommitment.items.${id}.text`),
  }));

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden px-4 sm:px-6 lg:px-8" style={{ background: MY_COLORS.bgSection }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square rounded-full pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${MY_COLORS.orange} 0%, transparent 70%)` }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.01]"
        style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div data-reveal className="inline-flex items-center gap-3 mb-6 opacity-0 translate-y-5 transition-all duration-700">
            <span className="w-6 md:w-8 h-0.5 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
            <span className="uppercase font-bold tracking-[0.2em] text-[10px] md:text-xs" style={{ fontFamily: FONTS.primary, color: MY_COLORS.orange }}>
              {t("ourCommitment.eyebrow")}
            </span>
            <span className="w-6 md:w-8 h-0.5 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
          </div>
          <h2 data-reveal className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 opacity-0 translate-y-5 transition-all duration-700 delay-100 mx-auto max-w-3xl"
            style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}>
            {t("ourCommitment.title")} <span style={{ color: MY_COLORS.orange, textShadow: `0 0 40px ${MY_COLORS.orangeGlow}` }}>{t("ourCommitment.titleAccent")}</span>
          </h2>
          <p data-reveal className="text-lg md:text-2xl font-semibold opacity-0 translate-y-5 transition-all duration-700 delay-200 max-w-2xl mx-auto"
            style={{ fontFamily: FONTS.primary, color: MY_COLORS.textSecondary }}>
            {t("ourCommitment.subtitle")} <span style={{ color: MY_COLORS.orange }}>{t("ourCommitment.subtitleAccent")}</span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-24">
          {COMMITMENTS.map((item, index) => (
            <div key={item.id} data-reveal
              className="group relative p-8 lg:p-10 rounded-2xl border transition-all duration-500 hover:-translate-y-2 opacity-0 translate-y-8"
              style={{ background: MY_COLORS.bgSurface, borderColor: MY_COLORS.border }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.3)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.boxShadow = "none"; }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
                style={{ background: MY_COLORS.gradientOrange, opacity: index === 0 ? 1 : 0.3 }} />
              <div className="text-5xl lg:text-7xl font-black mb-6 select-none opacity-40"
                style={{ fontFamily: FONTS.primary, color: MY_COLORS.orangeDim }}>
                {String(item.id).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}>
                {item.heading}
              </h3>
              <div className="w-10 h-0.5 mb-6 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
              <p className="text-base leading-relaxed" style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textSecondary }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div data-reveal
          className="relative px-6 py-12 md:p-16 lg:p-20 rounded-[2rem] border overflow-hidden text-center opacity-0 translate-y-8 transition-all duration-1000"
          style={{ background: `linear-gradient(105deg, rgba(232,117,10,0.1) 0%, rgba(10,10,10,0.9) 100%)`, borderColor: MY_COLORS.orangeBorder }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[80px] pointer-events-none animate-pulse-slow"
            style={{ background: `radial-gradient(circle, ${MY_COLORS.orangeGlow} 0%, transparent 70%)` }} />
          <div className="relative z-10">
            <div className="text-6xl md:text-8xl font-black mb-4 select-none" style={{ fontFamily: FONTS.primary, color: MY_COLORS.orangeDim }}>"</div>
            <p className="text-xl md:text-3xl font-bold max-w-3xl mx-auto mb-8 leading-snug" style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}>
              {t("ourCommitment.quote")} <span style={{ color: MY_COLORS.orange }}>{t("ourCommitment.quoteAccent")}</span>
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="w-2 h-2 rounded-full shadow-[0_0_10px_orange]" style={{ background: MY_COLORS.orange }} />
              <span className="uppercase text-[10px] md:text-xs font-medium tracking-[0.2em] opacity-60" style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textPrimary }}>
                {t("ourCommitment.quoteAuthor")}
              </span>
              <span className="w-2 h-2 rounded-full shadow-[0_0_10px_orange]" style={{ background: MY_COLORS.orange }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
        }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default OurCommitment;