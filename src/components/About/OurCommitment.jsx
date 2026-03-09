/**
 * OurCommitment — About Page Section 9
 * AlphaWaves brand system (Responsive Tailwind Version)
 */

import { useEffect, useRef } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

// ── Scroll reveal hook ────────────────────────────────────────
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll("[data-reveal]");
          items.forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, i * 130);
          });
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

const COMMITMENTS = [
  {
    id: 1,
    heading: "We Exceed Standards",
    text: "Every project proves that African technology companies don't just match international standards — we exceed them where it matters most: real-world market conditions.",
  },
  {
    id: 2,
    heading: "We Measure Your Success",
    text: "We measure success by your business outcomes: revenue growth, cost reduction, and market expansion. When you dominate, we've delivered.",
  },
  {
    id: 3,
    heading: "We Grow With You",
    text: "From Cameroonian startups to pan-African enterprises — AlphaWaves is your strategic partner for digital transformation that drives advantage.",
  },
];

const OurCommitment = () => {
  const sectionRef = useScrollReveal(0.1);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ background: MY_COLORS.bgSection }}
    >
      {/* ── Background Elements ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square rounded-full pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${MY_COLORS.orange} 0%, transparent 70%)` }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.01]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center mb-12 md:mb-20">
          <div
            data-reveal
            className="inline-flex items-center gap-3 mb-6 opacity-0 translate-y-5 transition-all duration-700"
          >
            <span className="w-6 md:w-8 h-0.5 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
            <span
              className="uppercase font-bold tracking-[0.2em] text-[10px] md:text-xs"
              style={{ fontFamily: FONTS.primary, color: MY_COLORS.orange }}
            >
              Our Promise
            </span>
            <span className="w-6 md:w-8 h-0.5 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
          </div>

          <h2
            data-reveal
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 opacity-0 translate-y-5 transition-all duration-700 delay-100 mx-auto max-w-3xl"
            style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}
          >
            Our Commitment <span style={{ color: MY_COLORS.orange, textShadow: `0 0 40px ${MY_COLORS.orangeGlow}` }}>To You</span>
          </h2>

          <p
            data-reveal
            className="text-lg md:text-2xl font-semibold opacity-0 translate-y-5 transition-all duration-700 delay-200 max-w-2xl mx-auto"
            style={{ fontFamily: FONTS.primary, color: MY_COLORS.textSecondary }}
          >
            We're building Africa's digital future — <span style={{ color: MY_COLORS.orange }}>one transformative solution at a time.</span>
          </p>
        </div>

        {/* ── Commitment Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-24">
          {COMMITMENTS.map((item, index) => (
            <div
              key={item.id}
              data-reveal
              className="group relative p-8 lg:p-10 rounded-2xl border transition-all duration-500 hover:-translate-y-2 opacity-0 translate-y-8"
              style={{
                background: MY_COLORS.bgSurface,
                borderColor: MY_COLORS.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = MY_COLORS.orangeBorder;
                e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = MY_COLORS.border;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Card Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
                style={{
                  background: MY_COLORS.gradientOrange,
                  opacity: index === 0 ? 1 : 0.3,
                }}
              />

              <div
                className="text-5xl lg:text-7xl font-black mb-6 select-none opacity-40 transition-colors group-hover:text-orange-500"
                style={{ fontFamily: FONTS.primary, color: MY_COLORS.orangeDim }}
              >
                {String(item.id).padStart(2, "0")}
              </div>

              <h3
                className="text-xl font-bold mb-4"
                style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}
              >
                {item.heading}
              </h3>

              <div className="w-10 h-0.5 mb-6 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />

              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textSecondary }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom Banner ── */}
        <div
          data-reveal
          className="relative px-6 py-12 md:p-16 lg:p-20 rounded-[2rem] border overflow-hidden text-center opacity-0 translate-y-8 transition-all duration-1000"
          style={{
            background: `linear-gradient(105deg, rgba(232,117,10,0.1) 0%, rgba(10,10,10,0.9) 100%)`,
            borderColor: MY_COLORS.orangeBorder,
          }}
        >
          {/* Pulsing Orb Animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" 
               style={{ background: `radial-gradient(circle, ${MY_COLORS.orangeGlow} 0%, transparent 70%)` }} />

          {/* Quote */}
          <div className="relative z-10">
            <div className="text-6xl md:text-8xl font-black mb-4 select-none" style={{ fontFamily: FONTS.primary, color: MY_COLORS.orangeDim }}>
              "
            </div>
            <p
              className="text-xl md:text-3xl font-bold max-w-3xl mx-auto mb-8 leading-snug"
              style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}
            >
              When our clients dominate their markets through superior technology execution, <span style={{ color: MY_COLORS.orange }}>we've delivered the value that matters.</span>
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <span className="w-2 h-2 rounded-full shadow-[0_0_10px_orange]" style={{ background: MY_COLORS.orange }} />
              <span className="uppercase text-[10px] md:text-xs font-medium tracking-[0.2em] opacity-60" style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textPrimary }}>
                AlphaWaves — Our Core Commitment
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
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default OurCommitment;