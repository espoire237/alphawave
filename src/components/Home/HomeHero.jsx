/**
 * HomeHero — Homepage Section 1 — FULLY RESPONSIVE
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { IMAGES } from "../../assets/assets.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const BG_IMAGES = [IMAGES.hero.home, IMAGES.hero.about, IMAGES.hero.services, IMAGES.hero.portfolio, IMAGES.hero.contact];
const TYPING_WORDS = ["Retailers","Farmers","Banks","Hotels","Startups","Enterprises"];

const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const PlayIcon  = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2L14 8L4 14V2Z"/></svg>;

const useTyping = (words, typingSpeed=100, deletingSpeed=60, pauseTime=2000) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIndex]; let timeout;
    if (!isDeleting && displayed === current) { timeout = setTimeout(() => setIsDeleting(true), pauseTime); }
    else if (isDeleting && displayed === "") { setIsDeleting(false); setWordIndex(i => (i+1)%words.length); }
    else { timeout = setTimeout(() => { setDisplayed(isDeleting ? current.slice(0,displayed.length-1) : current.slice(0,displayed.length+1)); }, isDeleting ? deletingSpeed : typingSpeed); }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);
  return displayed;
};

const CarouselCard = ({ slide, active }) => (
  <div style={{ position:"absolute", inset:0, opacity:active?1:0, transform:active?"translateX(0) scale(1)":"translateX(30px) scale(0.97)", transition:"all 0.6s cubic-bezier(0.4,0,0.2,1)", pointerEvents:active?"auto":"none" }}>
    <div style={{ height:"100%", borderRadius:20, background:"rgba(10,10,10,0.75)", border:"1px solid rgba(232,117,10,0.25)", padding:"24px", display:"flex", flexDirection:"column", justifyContent:"space-between", overflow:"hidden", position:"relative", backdropFilter:"blur(16px)" }}>
      <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle, ${slide.accentColor}22 0%, transparent 70%)`, pointerEvents:"none" }}/>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ padding:"4px 10px", borderRadius:9999, background:`${slide.accentColor}22`, border:`1px solid ${slide.accentColor}44`, fontFamily:FONTS.primary, fontSize:10, fontWeight:FONTS.weight.bold, letterSpacing:"0.08em", textTransform:"uppercase", color:slide.accentColor }}>{slide.category}</span>
        <span style={{ fontFamily:FONTS.primary, fontSize:11, fontWeight:FONTS.weight.bold, color:MY_COLORS.textDisabled }}>0{slide.id} / 03</span>
      </div>
      <div style={{ textAlign:"center", padding:"8px 0" }}>
        <div style={{ fontFamily:FONTS.primary, fontSize:"clamp(40px,5vw,64px)", fontWeight:FONTS.weight.extrabold, color:slide.accentColor, lineHeight:1, marginBottom:6, textShadow:`0 0 40px ${slide.accentColor}66` }}>{slide.metric}</div>
        <div style={{ fontFamily:FONTS.secondary, fontSize:FONTS.size.sm, color:MY_COLORS.textSecondary, fontWeight:FONTS.weight.medium }}>{slide.metaLabel}</div>
        <div style={{ fontFamily:FONTS.secondary, fontSize:FONTS.size.xs, color:MY_COLORS.textMuted, marginTop:4 }}>{slide.title}</div>
      </div>
      <div style={{ display:"flex", gap:6 }}>
        {slide.stats.map((stat,i) => (
          <div key={i} style={{ flex:1, padding:"8px 6px", borderRadius:10, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", textAlign:"center" }}>
            <div style={{ fontFamily:FONTS.primary, fontSize:FONTS.size.base, fontWeight:FONTS.weight.extrabold, color:MY_COLORS.textPrimary, lineHeight:1, marginBottom:3 }}>{stat.value}</div>
            <div style={{ fontFamily:FONTS.secondary, fontSize:10, color:MY_COLORS.textMuted }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {slide.tags.map((tag,i) => <span key={i} style={{ padding:"3px 10px", borderRadius:9999, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", fontFamily:FONTS.secondary, fontSize:10, color:MY_COLORS.textMuted }}>{tag}</span>)}
      </div>
    </div>
  </div>
);

const HomeHero = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet, isLargeTablet, isDesktop } = useBreakpoint();
  const typedWord = useTyping(TYPING_WORDS);
  const [activeSlide, setActiveSlide] = useState(0);
  const [primaryHover, setPrimary]    = useState(false);
  const [secondaryHover, setSecond]   = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [bgIndex, setBgIndex]         = useState(0);
  const [bgVisible, setBgVisible]     = useState(true);
  const slideIntervalRef              = useRef(null);

  // ✅ SLIDES inside component so t() is available
  const SLIDES = [
    { id:1, category:t("homeHero.slides.1.category"), title:t("homeHero.slides.1.title"), metric:"250%", metaLabel:t("homeHero.slides.1.metaLabel"), tags:["React.js","MTN MoMo","Node.js"], stats:[{label:t("homeHero.slideStats.transactions"),value:"15K+"},{label:t("homeHero.slideStats.uptime"),value:"99.9%"},{label:t("homeHero.slideStats.roi"),value:"3x"}], accentColor:MY_COLORS.orange },
    { id:2, category:t("homeHero.slides.2.category"), title:t("homeHero.slides.2.title"), metric:"500+", metaLabel:t("homeHero.slides.2.metaLabel"), tags:["React Native","PostgreSQL","Maps API"], stats:[{label:t("homeHero.slideStats.buyers"),value:"2K+"},{label:t("homeHero.slideStats.incomeBoost"),value:"35%"},{label:t("homeHero.slideStats.countries"),value:"3"}], accentColor:"#4ade80" },
    { id:3, category:t("homeHero.slides.3.category"), title:t("homeHero.slides.3.title"), metric:"70%",  metaLabel:t("homeHero.slides.3.metaLabel"), tags:["Python","FastAPI","AI/ML"], stats:[{label:t("homeHero.slideStats.loans"),value:"10K+"},{label:t("homeHero.slideStats.defaultDown"),value:"25%"},{label:t("homeHero.slideStats.accuracy"),value:"94%"}], accentColor:"#60a5fa" },
  ];

  const TRUST_STATS = [
    { value:"30+", label:t("homeHero.trust.clients")   },
    { value:"10+", label:t("homeHero.trust.countries") },
    { value:"50+", label:t("homeHero.trust.projects")  },
  ];

  useEffect(() => { const t2 = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t2); }, []);
  useEffect(() => {
    const timer = setInterval(() => { setBgVisible(false); setTimeout(() => { setBgIndex(i => (i+1)%BG_IMAGES.length); setBgVisible(true); }, 700); }, 5000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    slideIntervalRef.current = setInterval(() => setActiveSlide(i => (i+1)%SLIDES.length), 4000);
    return () => clearInterval(slideIntervalRef.current);
  }, []);

  const goToSlide = (index) => {
    clearInterval(slideIntervalRef.current);
    setActiveSlide(index);
    slideIntervalRef.current = setInterval(() => setActiveSlide(i => (i+1)%SLIDES.length), 4000);
  };

  const sectionPadding  = isMobile ? "120px 20px 72px" : isTablet ? "120px 48px 80px" : isLargeTablet ? "120px 40px 80px" : "130px 40px 90px";
  const showCarousel    = !isMobile && !isTablet;
  const gridGap         = isMobile ? 0 : isTablet ? 0 : isLargeTablet ? 48 : 80;
  const gridCols        = showCarousel ? (isLargeTablet ? "1fr 340px" : "1fr 420px") : "1fr";
  const contentMaxWidth = isMobile ? "100%" : isTablet ? "600px" : "100%";
  const contentMargin   = (isMobile || isTablet) ? "0 auto" : "0";
  const h1Size          = isMobile ? "clamp(28px,8vw,40px)" : isTablet ? "clamp(32px,5vw,48px)" : "clamp(36px,5vw,64px)";
  const subSize         = isMobile ? "15px" : isTablet ? "16px" : "clamp(15px,1.5vw,18px)";
  const ctaPadding      = isMobile ? "13px 20px" : "15px 32px";
  const trustGap        = isMobile ? 16 : 32;
  const carouselHeight  = isLargeTablet ? 360 : 400;

  return (
    <section style={{ position:"relative", minHeight:"100vh", background:MY_COLORS.bgBase, display:"flex", alignItems:"center", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`url(${BG_IMAGES[bgIndex]})`, backgroundSize:"cover", backgroundPosition:"center 40%", backgroundRepeat:"no-repeat", opacity:bgVisible?1:0, transition:"opacity 0.7s ease", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, background:"rgba(10,10,10,0.80)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(232,117,10,0.15) 0%, transparent 50%, rgba(10,10,10,0.3) 100%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:220, background:`linear-gradient(to top, ${MY_COLORS.bgBase}, transparent)`, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:MY_COLORS.gradientOrange, opacity:0.6 }}/>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:sectionPadding, width:"100%", position:"relative", zIndex:1, boxSizing:"border-box" }}>
        <div style={{ display:"grid", gridTemplateColumns:gridCols, gap:gridGap, alignItems:"center" }}>

          {/* LEFT */}
          <div style={{ maxWidth:contentMaxWidth, margin:contentMargin, width:"100%" }}>
            {/* Eyebrow */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:isMobile?20:28, opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(20px)", transition:"all 0.7s ease 0.1s" }}>
              <span style={{ width:isMobile?20:32, height:2, borderRadius:9999, background:MY_COLORS.gradientOrange }}/>
              <span style={{ fontFamily:FONTS.primary, fontSize:isMobile?9:FONTS.size.xs, fontWeight:FONTS.weight.bold, letterSpacing:FONTS.tracking.widest, textTransform:"uppercase", color:MY_COLORS.orange }}>
                {t("homeHero.eyebrow")}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily:FONTS.primary, fontSize:h1Size, fontWeight:FONTS.weight.extrabold, letterSpacing:FONTS.tracking.tight, lineHeight:FONTS.leading.snug, color:MY_COLORS.textPrimary, margin:`0 0 ${isMobile?16:24}px`, opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease 0.2s" }}>
              {t("homeHero.headline")}{" "}
              {(isLargeTablet || isDesktop) && <br/>}
              <span style={{ color:MY_COLORS.orange, textShadow:`0 0 40px ${MY_COLORS.orangeGlow}` }}>
                {t("homeHero.headlineFor")} {typedWord}
                <span style={{ display:"inline-block", width:3, height:"0.85em", background:MY_COLORS.orange, marginLeft:4, verticalAlign:"middle", borderRadius:2, animation:"blink 1s step-end infinite" }}/>
              </span>
            </h1>

            {/* Subheadline */}
            <p style={{ fontFamily:FONTS.secondary, fontSize:subSize, lineHeight:FONTS.leading.relaxed, color:MY_COLORS.textSecondary, margin:`0 0 ${isMobile?28:40}px`, maxWidth:isMobile?"100%":540, opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease 0.3s" }}>
              {t("homeHero.subheadline")}
            </p>

            {/* CTAs */}
            <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:isMobile?10:16, marginBottom:isMobile?32:52, opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease 0.4s" }}>
              <Link to="/contact" onMouseEnter={()=>setPrimary(true)} onMouseLeave={()=>setPrimary(false)}
                style={{ textDecoration:"none", display:"inline-flex", alignItems:"center", justifyContent:isMobile?"center":"flex-start", gap:primaryHover?12:8, padding:ctaPadding, borderRadius:12, background:MY_COLORS.gradientOrange, color:"#fff", fontFamily:FONTS.primary, fontSize:FONTS.size.sm, fontWeight:FONTS.weight.bold, letterSpacing:FONTS.tracking.wide, boxShadow:primaryHover?"0 0 48px rgba(232,117,10,0.6)":"0 0 24px rgba(232,117,10,0.35)", transform:primaryHover?"translateY(-3px)":"translateY(0)", transition:"all 0.3s ease", width:isMobile?"100%":"auto", boxSizing:"border-box" }}>
                {t("homeHero.primaryBtn")} <ArrowRight/>
              </Link>
              <Link to="/portfolio" onMouseEnter={()=>setSecond(true)} onMouseLeave={()=>setSecond(false)}
                style={{ textDecoration:"none", display:"inline-flex", alignItems:"center", justifyContent:isMobile?"center":"flex-start", gap:secondaryHover?12:8, padding:ctaPadding, borderRadius:12, background:"transparent", color:secondaryHover?MY_COLORS.textPrimary:MY_COLORS.textSecondary, border:`1px solid ${secondaryHover?MY_COLORS.borderHover:MY_COLORS.border}`, fontFamily:FONTS.primary, fontSize:FONTS.size.sm, fontWeight:FONTS.weight.semibold, letterSpacing:FONTS.tracking.wide, transform:secondaryHover?"translateY(-3px)":"translateY(0)", transition:"all 0.3s ease", width:isMobile?"100%":"auto", boxSizing:"border-box" }}>
                <PlayIcon/> {t("homeHero.secondaryBtn")}
              </Link>
            </div>

            {/* Trust stats */}
            <div style={{ display:"flex", gap:trustGap, flexWrap:"wrap", rowGap:12, opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease 0.5s" }}>
              {TRUST_STATS.map((stat,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:MY_COLORS.gradientOrange, boxShadow:`0 0 8px ${MY_COLORS.orangeGlow}`, flexShrink:0 }}/>
                  <div>
                    <div style={{ fontFamily:FONTS.primary, fontSize:isMobile?FONTS.size.sm:FONTS.size.base, fontWeight:FONTS.weight.extrabold, color:MY_COLORS.textPrimary, lineHeight:1 }}>{stat.value}</div>
                    <div style={{ fontFamily:FONTS.secondary, fontSize:10, color:MY_COLORS.textMuted, marginTop:2 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile mini card */}
            {(isMobile || isTablet) && (
              <div style={{ marginTop:36, padding:"20px", borderRadius:16, background:"rgba(10,10,10,0.6)", border:"1px solid rgba(232,117,10,0.2)", backdropFilter:"blur(12px)", opacity:mounted?1:0, transition:"opacity 0.7s ease 0.6s", maxWidth:isTablet?520:"100%", margin:isTablet?"36px auto 0":"36px 0 0", boxSizing:"border-box" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <span style={{ fontFamily:FONTS.primary, fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:SLIDES[activeSlide].accentColor, padding:"3px 10px", borderRadius:9999, background:`${SLIDES[activeSlide].accentColor}18`, border:`1px solid ${SLIDES[activeSlide].accentColor}33` }}>{SLIDES[activeSlide].category}</span>
                  <span style={{ fontFamily:FONTS.primary, fontSize:10, color:MY_COLORS.textDisabled }}>0{activeSlide+1} / 0{SLIDES.length}</span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:8 }}>
                  <span style={{ fontFamily:FONTS.primary, fontSize:"clamp(32px,8vw,48px)", fontWeight:800, color:SLIDES[activeSlide].accentColor, lineHeight:1, textShadow:`0 0 24px ${SLIDES[activeSlide].accentColor}55` }}>{SLIDES[activeSlide].metric}</span>
                  <span style={{ fontFamily:FONTS.secondary, fontSize:FONTS.size.sm, color:MY_COLORS.textSecondary }}>{SLIDES[activeSlide].metaLabel}</span>
                </div>
                <div style={{ fontFamily:FONTS.secondary, fontSize:FONTS.size.xs, color:MY_COLORS.textMuted }}>{SLIDES[activeSlide].title}</div>
                <div style={{ display:"flex", gap:8, marginTop:14 }}>
                  {SLIDES.map((_,i) => <button key={i} onClick={()=>goToSlide(i)} style={{ width:i===activeSlide?24:7, height:7, borderRadius:9999, background:i===activeSlide?SLIDES[i].accentColor:MY_COLORS.border, border:"none", cursor:"pointer", transition:"all 0.3s ease", padding:0 }}/>)}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Carousel */}
          {showCarousel && (
            <div style={{ opacity:mounted?1:0, transform:mounted?"translateX(0)":"translateX(40px)", transition:"all 0.8s ease 0.4s" }}>
              <div style={{ position:"relative", height:carouselHeight }} onMouseEnter={()=>clearInterval(slideIntervalRef.current)} onMouseLeave={()=>{ slideIntervalRef.current = setInterval(()=>setActiveSlide(i=>(i+1)%SLIDES.length),4000); }}>
                {SLIDES.map((slide,i) => <CarouselCard key={slide.id} slide={slide} active={i===activeSlide}/>)}
              </div>
              <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:20 }}>
                {SLIDES.map((_,i) => <button key={i} onClick={()=>goToSlide(i)} style={{ width:i===activeSlide?28:8, height:8, borderRadius:9999, background:i===activeSlide?MY_COLORS.orange:MY_COLORS.border, border:"none", cursor:"pointer", transition:"all 0.3s ease", padding:0 }}/>)}
              </div>
            </div>
          )}
        </div>
      </div>

      {isDesktop && (
        <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:mounted?0.5:0, transition:"opacity 1s ease 1s" }}>
          <span style={{ fontFamily:FONTS.primary, fontSize:10, fontWeight:FONTS.weight.bold, letterSpacing:FONTS.tracking.widest, textTransform:"uppercase", color:MY_COLORS.textMuted }}>{t("homeHero.scroll")}</span>
          <div style={{ width:1, height:40, background:`linear-gradient(to bottom, ${MY_COLORS.orange}, transparent)`, animation:"scrollPulse 2s ease-in-out infinite" }}/>
        </div>
      )}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes scrollPulse{0%,100%{opacity:0.3;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.2)}}`}</style>
    </section>
  );
};
export default HomeHero;