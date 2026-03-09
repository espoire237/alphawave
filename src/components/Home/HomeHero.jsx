/**
 * HomeHero — Homepage Section 1 — FULLY RESPONSIVE (FIXED)
 * Breakpoints: sm (≤480), md (481–768), lg (769–1024), xl (1025+)
 *
 * FIXES APPLIED:
 * 1. Left column now has maxWidth + centered on mobile/tablet — stops horizontal inflation
 * 2. gridGap explicitly set for ALL breakpoints — no more fallthrough to wrong value
 * 3. sectionPadding tablet increased to 48px horizontal — gives room to breathe
 * 4. Mini-card on tablet centered with margin: auto
 * 5. subheadline maxWidth applies on tablet too
 * 6. gridTemplateColumns on tablet explicitly "1fr" with centered child — no stretching
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { IMAGES } from "../../assets/assets.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const BG_IMAGES = [
  IMAGES.hero.home, IMAGES.hero.about, IMAGES.hero.services,
  IMAGES.hero.portfolio, IMAGES.hero.contact,
];

const TYPING_WORDS = ["Retailers", "Farmers", "Banks", "Hotels", "Startups", "Enterprises"];

const SLIDES = [
  {
    id: 1, category: "E-commerce", title: "Fashion Retailer, Douala",
    metric: "250%", metaLabel: "Revenue Increase",
    tags: ["React.js", "MTN MoMo", "Node.js"],
    stats: [{ label: "Transactions", value: "15K+" }, { label: "Uptime", value: "99.9%" }, { label: "ROI", value: "3x" }],
    accentColor: MY_COLORS.orange,
  },
  {
    id: 2, category: "Agriculture", title: "Farmer Marketplace",
    metric: "500+", metaLabel: "Farmers Empowered",
    tags: ["React Native", "PostgreSQL", "Maps API"],
    stats: [{ label: "Buyers", value: "2K+" }, { label: "Income Boost", value: "35%" }, { label: "Countries", value: "3" }],
    accentColor: "#4ade80",
  },
  {
    id: 3, category: "Fintech", title: "AI Lending Platform",
    metric: "70%", metaLabel: "Faster Approvals",
    tags: ["Python", "FastAPI", "AI/ML"],
    stats: [{ label: "Loans", value: "10K+" }, { label: "Default ↓", value: "25%" }, { label: "Accuracy", value: "94%" }],
    accentColor: "#60a5fa",
  },
];

const TRUST_STATS = [
  { value: "30+", label: "Happy Clients" },
  { value: "10+", label: "Countries" },
  { value: "50+", label: "Projects" },
];

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2L14 8L4 14V2Z" /></svg>
);

const useTyping = (words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIndex];
    let timeout;
    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIndex(i => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1));
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);
  return displayed;
};

const CarouselCard = ({ slide, active }) => (
  <div style={{
    position: "absolute", inset: 0,
    opacity: active ? 1 : 0,
    transform: active ? "translateX(0) scale(1)" : "translateX(30px) scale(0.97)",
    transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
    pointerEvents: active ? "auto" : "none",
  }}>
    <div style={{
      height: "100%", borderRadius: 20,
      background: "rgba(10,10,10,0.75)",
      border: "1px solid rgba(232,117,10,0.25)",
      padding: "24px", display: "flex", flexDirection: "column",
      justifyContent: "space-between", overflow: "hidden",
      position: "relative", backdropFilter: "blur(16px)",
    }}>
      {/* Glow orb */}
      <div style={{
        position: "absolute", top: -60, right: -60, width: 200, height: 200,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${slide.accentColor}22 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          padding: "4px 10px", borderRadius: 9999,
          background: `${slide.accentColor}22`,
          border: `1px solid ${slide.accentColor}44`,
          fontFamily: FONTS.primary, fontSize: 10,
          fontWeight: FONTS.weight.bold, letterSpacing: "0.08em",
          textTransform: "uppercase", color: slide.accentColor,
        }}>{slide.category}</span>
        <span style={{
          fontFamily: FONTS.primary, fontSize: 11,
          fontWeight: FONTS.weight.bold, color: MY_COLORS.textDisabled,
        }}>0{slide.id} / 0{SLIDES.length}</span>
      </div>

      {/* Metric */}
      <div style={{ textAlign: "center", padding: "8px 0" }}>
        <div style={{
          fontFamily: FONTS.primary, fontSize: "clamp(40px,5vw,64px)",
          fontWeight: FONTS.weight.extrabold, color: slide.accentColor,
          lineHeight: 1, marginBottom: 6,
          textShadow: `0 0 40px ${slide.accentColor}66`,
        }}>{slide.metric}</div>
        <div style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, color: MY_COLORS.textSecondary, fontWeight: FONTS.weight.medium }}>{slide.metaLabel}</div>
        <div style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted, marginTop: 4 }}>{slide.title}</div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 6 }}>
        {slide.stats.map((stat, i) => (
          <div key={i} style={{
            flex: 1, padding: "8px 6px", borderRadius: 10,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)", textAlign: "center",
          }}>
            <div style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: FONTS.weight.extrabold, color: MY_COLORS.textPrimary, lineHeight: 1, marginBottom: 3 }}>{stat.value}</div>
            <div style={{ fontFamily: FONTS.secondary, fontSize: 10, color: MY_COLORS.textMuted }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {slide.tags.map((tag, i) => (
          <span key={i} style={{
            padding: "3px 10px", borderRadius: 9999,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: FONTS.secondary, fontSize: 10, color: MY_COLORS.textMuted,
          }}>{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

const HomeHero = () => {
  const { isMobile, isTablet, isLargeTablet, isDesktop } = useBreakpoint();
  const typedWord = useTyping(TYPING_WORDS);
  const [activeSlide, setActiveSlide]   = useState(0);
  const [primaryHover, setPrimary]      = useState(false);
  const [secondaryHover, setSecond]     = useState(false);
  const [mounted, setMounted]           = useState(false);
  const [bgIndex, setBgIndex]           = useState(0);
  const [bgVisible, setBgVisible]       = useState(true);
  const slideIntervalRef                = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgVisible(false);
      setTimeout(() => { setBgIndex(i => (i + 1) % BG_IMAGES.length); setBgVisible(true); }, 700);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    slideIntervalRef.current = setInterval(() => setActiveSlide(i => (i + 1) % SLIDES.length), 4000);
    return () => clearInterval(slideIntervalRef.current);
  }, []);

  const goToSlide = (index) => {
    clearInterval(slideIntervalRef.current);
    setActiveSlide(index);
    slideIntervalRef.current = setInterval(() => setActiveSlide(i => (i + 1) % SLIDES.length), 4000);
  };

  // ─── RESPONSIVE VALUES (all breakpoints explicit — no fallthrough) ───────────

  // FIX 1: explicit padding for every breakpoint
  const sectionPadding = isMobile
    ? "120px 20px 72px"
    : isTablet
    ? "120px 48px 80px"       // ← was 32px — more horizontal breathing room
    : isLargeTablet
    ? "120px 40px 80px"
    : "130px 40px 90px";

  // Carousel only shows on largeTablet+
  const showCarousel = !isMobile && !isTablet;

  // FIX 2: explicit gridGap for every breakpoint — tablet is 0 (single column, no gap needed)
  const gridGap = isMobile ? 0 : isTablet ? 0 : isLargeTablet ? 48 : 80;

  const gridCols = showCarousel
    ? (isLargeTablet ? "1fr 340px" : "1fr 420px")
    : "1fr";

  // FIX 3: constrain left column width on single-column layouts
  const contentMaxWidth = isMobile ? "100%" : isTablet ? "600px" : "100%";
  const contentMargin   = (isMobile || isTablet) ? "0 auto" : "0";

  const h1Size    = isMobile ? "clamp(28px,8vw,40px)" : isTablet ? "clamp(32px,5vw,48px)" : "clamp(36px,5vw,64px)";
  const subSize   = isMobile ? "15px" : isTablet ? "16px" : "clamp(15px,1.5vw,18px)";
  const ctaPadding = isMobile ? "13px 20px" : "15px 32px";
  const trustGap  = isMobile ? 16 : 32;
  const carouselHeight = isLargeTablet ? 360 : 400;

  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      background: MY_COLORS.bgBase,
      display: "flex", alignItems: "center", overflow: "hidden",
    }}>

      {/* ── Background layers ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${BG_IMAGES[bgIndex]})`,
        backgroundSize: "cover", backgroundPosition: "center 40%",
        backgroundRepeat: "no-repeat",
        opacity: bgVisible ? 1 : 0,
        transition: "opacity 0.7s ease", pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.80)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(232,117,10,0.15) 0%, transparent 50%, rgba(10,10,10,0.3) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 220, background: `linear-gradient(to top, ${MY_COLORS.bgBase}, transparent)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: MY_COLORS.gradientOrange, opacity: 0.6 }} />

      {/* ── Main content ── */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: sectionPadding, width: "100%",
        position: "relative", zIndex: 1,
        boxSizing: "border-box",           // ← prevents padding from causing overflow
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: gridGap,
          alignItems: "center",
        }}>

          {/* ══ LEFT — Copy ══ */}
          {/* FIX 3: maxWidth + auto margin keeps single-column content from stretching */}
          <div style={{ maxWidth: contentMaxWidth, margin: contentMargin, width: "100%" }}>

            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              marginBottom: isMobile ? 20 : 28,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.1s",
            }}>
              <span style={{ width: isMobile ? 20 : 32, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
              <span style={{
                fontFamily: FONTS.primary, fontSize: isMobile ? 9 : FONTS.size.xs,
                fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest,
                textTransform: "uppercase", color: MY_COLORS.orange,
              }}>
                Africa's Digital Transformation Partner
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: FONTS.primary, fontSize: h1Size,
              fontWeight: FONTS.weight.extrabold,
              letterSpacing: FONTS.tracking.tight, lineHeight: FONTS.leading.snug,
              color: MY_COLORS.textPrimary,
              margin: `0 0 ${isMobile ? 16 : 24}px`,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease 0.2s",
            }}>
              We Build Digital Solutions{" "}
              {(isLargeTablet || isDesktop) && <br />}
              <span style={{ color: MY_COLORS.orange, textShadow: `0 0 40px ${MY_COLORS.orangeGlow}` }}>
                for {typedWord}
                <span style={{
                  display: "inline-block", width: 3, height: "0.85em",
                  background: MY_COLORS.orange, marginLeft: 4,
                  verticalAlign: "middle", borderRadius: 2,
                  animation: "blink 1s step-end infinite",
                }} />
              </span>
            </h1>

            {/* Subheadline */}
            {/* FIX 5: maxWidth now applies on tablet too (was only !isMobile before) */}
            <p style={{
              fontFamily: FONTS.secondary, fontSize: subSize,
              lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textSecondary,
              margin: `0 0 ${isMobile ? 28 : 40}px`,
              maxWidth: isMobile ? "100%" : 540,   // ← applies on tablet now
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease 0.3s",
            }}>
              From custom software to AI analytics — AlphaWaves delivers enterprise-grade technology engineered for African infrastructure, payment ecosystems, and market realities.
            </p>

            {/* CTAs */}
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 10 : 16,
              marginBottom: isMobile ? 32 : 52,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease 0.4s",
            }}>
              <Link to="/contact"
                onMouseEnter={() => setPrimary(true)}
                onMouseLeave={() => setPrimary(false)}
                style={{
                  textDecoration: "none", display: "inline-flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                  gap: primaryHover ? 12 : 8,
                  padding: ctaPadding, borderRadius: 12,
                  background: MY_COLORS.gradientOrange, color: "#fff",
                  fontFamily: FONTS.primary, fontSize: FONTS.size.sm,
                  fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.wide,
                  boxShadow: primaryHover ? "0 0 48px rgba(232,117,10,0.6)" : "0 0 24px rgba(232,117,10,0.35)",
                  transform: primaryHover ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.3s ease",
                  width: isMobile ? "100%" : "auto",
                  boxSizing: "border-box",
                }}>
                Get Started <ArrowRight />
              </Link>
              <Link to="/portfolio"
                onMouseEnter={() => setSecond(true)}
                onMouseLeave={() => setSecond(false)}
                style={{
                  textDecoration: "none", display: "inline-flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                  gap: secondaryHover ? 12 : 8,
                  padding: ctaPadding, borderRadius: 12,
                  background: "transparent",
                  color: secondaryHover ? MY_COLORS.textPrimary : MY_COLORS.textSecondary,
                  border: `1px solid ${secondaryHover ? MY_COLORS.borderHover : MY_COLORS.border}`,
                  fontFamily: FONTS.primary, fontSize: FONTS.size.sm,
                  fontWeight: FONTS.weight.semibold, letterSpacing: FONTS.tracking.wide,
                  transform: secondaryHover ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.3s ease",
                  width: isMobile ? "100%" : "auto",
                  boxSizing: "border-box",
                }}>
                <PlayIcon /> View Our Work
              </Link>
            </div>

            {/* Trust stats */}
            <div style={{
              display: "flex", gap: trustGap, flexWrap: "wrap", rowGap: 12,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease 0.5s",
            }}>
              {TRUST_STATS.map((stat, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: MY_COLORS.gradientOrange,
                    boxShadow: `0 0 8px ${MY_COLORS.orangeGlow}`,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontFamily: FONTS.primary, fontSize: isMobile ? FONTS.size.sm : FONTS.size.base, fontWeight: FONTS.weight.extrabold, color: MY_COLORS.textPrimary, lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontFamily: FONTS.secondary, fontSize: 10, color: MY_COLORS.textMuted, marginTop: 2 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Mobile / Tablet — mini stats card ── */}
            {(isMobile || isTablet) && (
              <div style={{
                marginTop: 36,
                padding: "20px",
                borderRadius: 16,
                background: "rgba(10,10,10,0.6)",
                border: "1px solid rgba(232,117,10,0.2)",
                backdropFilter: "blur(12px)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.7s ease 0.6s",
                // FIX 4: tablet gets a fixed max-width and auto margins to center
                maxWidth: isTablet ? 520 : "100%",
                margin: isTablet ? "36px auto 0" : "36px 0 0",
                boxSizing: "border-box",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{
                    fontFamily: FONTS.primary, fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: SLIDES[activeSlide].accentColor,
                    padding: "3px 10px", borderRadius: 9999,
                    background: `${SLIDES[activeSlide].accentColor}18`,
                    border: `1px solid ${SLIDES[activeSlide].accentColor}33`,
                  }}>{SLIDES[activeSlide].category}</span>
                  <span style={{ fontFamily: FONTS.primary, fontSize: 10, color: MY_COLORS.textDisabled }}>
                    0{activeSlide + 1} / 0{SLIDES.length}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{
                    fontFamily: FONTS.primary,
                    fontSize: "clamp(32px,8vw,48px)",
                    fontWeight: 800, color: SLIDES[activeSlide].accentColor,
                    lineHeight: 1,
                    textShadow: `0 0 24px ${SLIDES[activeSlide].accentColor}55`,
                  }}>{SLIDES[activeSlide].metric}</span>
                  <span style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.sm, color: MY_COLORS.textSecondary }}>{SLIDES[activeSlide].metaLabel}</span>
                </div>
                <div style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted }}>
                  {SLIDES[activeSlide].title}
                </div>
                {/* Dot controls */}
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  {SLIDES.map((_, i) => (
                    <button key={i} onClick={() => goToSlide(i)} style={{
                      width: i === activeSlide ? 24 : 7, height: 7,
                      borderRadius: 9999,
                      background: i === activeSlide ? SLIDES[i].accentColor : MY_COLORS.border,
                      border: "none", cursor: "pointer",
                      transition: "all 0.3s ease", padding: 0,
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* ══ END LEFT ══ */}

          {/* ══ RIGHT — Carousel (largeTablet + desktop only) ══ */}
          {showCarousel && (
            <div style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s ease 0.4s",
            }}>
              <div
                style={{ position: "relative", height: carouselHeight }}
                onMouseEnter={() => clearInterval(slideIntervalRef.current)}
                onMouseLeave={() => {
                  slideIntervalRef.current = setInterval(() => setActiveSlide(i => (i + 1) % SLIDES.length), 4000);
                }}
              >
                {SLIDES.map((slide, i) => (
                  <CarouselCard key={slide.id} slide={slide} active={i === activeSlide} />
                ))}
              </div>
              {/* Dot controls */}
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20 }}>
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => goToSlide(i)} style={{
                    width: i === activeSlide ? 28 : 8, height: 8,
                    borderRadius: 9999,
                    background: i === activeSlide ? MY_COLORS.orange : MY_COLORS.border,
                    border: "none", cursor: "pointer",
                    transition: "all 0.3s ease", padding: 0,
                  }} />
                ))}
              </div>
            </div>
          )}
          {/* ══ END RIGHT ══ */}

        </div>
      </div>

      {/* ── Scroll hint — desktop only ── */}
      {isDesktop && (
        <div style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: mounted ? 0.5 : 0, transition: "opacity 1s ease 1s",
        }}>
          <span style={{
            fontFamily: FONTS.primary, fontSize: 10, fontWeight: FONTS.weight.bold,
            letterSpacing: FONTS.tracking.widest, textTransform: "uppercase",
            color: MY_COLORS.textMuted,
          }}>Scroll</span>
          <div style={{
            width: 1, height: 40,
            background: `linear-gradient(to bottom, ${MY_COLORS.orange}, transparent)`,
            animation: "scrollPulse 2s ease-in-out infinite",
          }} />
        </div>
      )}

      <style>{`
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollPulse { 0%,100%{opacity:0.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.2)} }
      `}</style>
    </section>
  );
};

export default HomeHero;