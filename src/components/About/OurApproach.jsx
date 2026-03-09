/**
 * OurApproach — About Page Section 7
 * AlphaWaves brand system (Responsive Tailwind Version)
 */

import { useEffect, useRef, useState } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

// ── Scroll reveal hook ────────────────────────────────────────
const useScrollReveal = (threshold = 0.08) => {
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
              item.style.transform = "translateY(0) translateX(0)";
            }, i * 120);
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

const STEPS = [
  {
    id: 1,
    title: "We Start With Business, Not Technology",
    content: "Before writing a single line of code, we understand your business model and market position. Technology serves strategy, not the other way around.",
    tag: "Strategy First",
  },
  {
    id: 2,
    title: "We Build For African Realities",
    content: "Architected for local infrastructure: intermittent connectivity, mobile-first users, and multiple payment providers.",
    tag: "Africa-Ready",
  },
  {
    id: 3,
    title: "We Deliver Complete Solutions",
    content: "Strategy, design, development, and AI integration. All under one accountable team with seamless execution.",
    tag: "End-to-End",
  },
  {
    id: 4,
    title: "We Measure What Matters",
    content: "Success means business outcomes: revenue growth and operational efficiency. We track ROI, not just code.",
    tag: "ROI Focused",
  },
  {
    id: 5,
    title: "We Scale With You",
    content: "Modular architecture means you expand as you grow. No massive upfront investment required — just compounding value.",
    tag: "Future-Proof",
  },
];

const StepItem = ({ step, isLast }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex gap-6 md:gap-10 opacity-0 -translate-x-6 transition-all duration-700 ease-out cursor-default"
    >
      {/* ── Left Indicator ── */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10"
          style={{
            background: hovered ? MY_COLORS.gradientOrange : MY_COLORS.bgSurface,
            borderColor: hovered ? MY_COLORS.orange : MY_COLORS.border,
            boxShadow: hovered ? `0 0 20px ${MY_COLORS.orangeGlow}` : "none",
          }}
        >
          <span
            className="text-sm md:text-base font-black transition-colors duration-300"
            style={{
              fontFamily: FONTS.primary,
              color: hovered ? "#fff" : MY_COLORS.orange,
            }}
          >
            {String(step.id).padStart(2, "0")}
          </span>
        </div>

        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-2 mb-2 transition-colors duration-300"
            style={{
              background: `linear-gradient(to bottom, ${hovered ? MY_COLORS.orange : MY_COLORS.border}, transparent)`,
            }}
          />
        )}
      </div>

      {/* ── Right Content ── */}
      <div className={`${isLast ? "pb-0" : "pb-12 md:pb-20"} flex-1`}>
        <div
          className="inline-flex px-3 py-1 rounded-full border mb-4 transition-all duration-300"
          style={{
            background: hovered ? MY_COLORS.orangeDim : "transparent",
            borderColor: hovered ? MY_COLORS.orangeBorder : MY_COLORS.border,
          }}
        >
          <span
            className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest"
            style={{
              fontFamily: FONTS.primary,
              color: hovered ? MY_COLORS.orange : MY_COLORS.textMuted,
            }}
          >
            {step.tag}
          </span>
        </div>

        <h3
          className="text-lg md:text-2xl font-bold mb-3 transition-colors duration-300"
          style={{
            fontFamily: FONTS.primary,
            color: hovered ? MY_COLORS.orange : MY_COLORS.textPrimary,
          }}
        >
          {step.title}
        </h3>

        <p
          className="text-sm md:text-base leading-relaxed max-w-lg transition-colors duration-300"
          style={{
            fontFamily: FONTS.secondary,
            color: hovered ? MY_COLORS.textPrimary : MY_COLORS.textSecondary,
          }}
        >
          {step.content}
        </p>
      </div>
    </div>
  );
};

const OurApproach = () => {
  const sectionRef = useScrollReveal(0.08);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: MY_COLORS.bgBase }}
    >
      {/* ── Background Elements ── */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${MY_COLORS.orange} 0%, transparent 70%)` }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* ── LEFT: Sticky Header ── */}
          <div className="lg:sticky lg:top-32 w-full lg:w-2/5">
            <div
              data-reveal
              className="inline-flex items-center gap-3 mb-6 opacity-0 translate-y-5 transition-all duration-700"
            >
              <span className="w-8 h-0.5 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
              <span
                className="uppercase font-bold tracking-[0.2em] text-[10px] md:text-xs"
                style={{ fontFamily: FONTS.primary, color: MY_COLORS.orange }}
              >
                Our Process
              </span>
            </div>

            <h2
              data-reveal
              className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 opacity-0 translate-y-5 transition-all duration-700 delay-100"
              style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}
            >
              How We're <span style={{ color: MY_COLORS.orange }}>Different</span>
            </h2>

            <p
              data-reveal
              className="text-base md:text-lg mb-8 opacity-0 translate-y-5 transition-all duration-700 delay-200"
              style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textMuted }}
            >
              More than developers — we're strategic technology partners focused on your business growth.
            </p>

            {/* Difference Card */}
            <div
              data-reveal
              className="p-6 rounded-2xl border bg-white/5 opacity-0 translate-y-5 transition-all duration-700 delay-300"
              style={{ borderColor: MY_COLORS.orangeBorder }}
            >
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ fontFamily: FONTS.primary, color: MY_COLORS.orange }}
              >
                The AlphaWaves Advantage
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: MY_COLORS.textSecondary }}>
                Five proven steps that turn technology into your most powerful competitive weapon.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Step Timeline ── */}
          <div className="w-full lg:w-3/5 lg:pt-4">
            {STEPS.map((step, index) => (
              <StepItem
                key={step.id}
                step={step}
                isLast={index === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;