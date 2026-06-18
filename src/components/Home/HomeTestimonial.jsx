/**
 * HomeTestimonial Homepage Section 8 FULLY RESPONSIVE
 */
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const StarIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill={MY_COLORS.orange}><path d="M8 1L9.8 6H15L10.6 9.2L12.4 14.2L8 11L3.6 14.2L5.4 9.2L1 6H6.2L8 1Z"/></svg>;

const HomeTestimonial = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useBreakpoint();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.querySelectorAll("[data-reveal]").forEach((node,i) => { setTimeout(() => { node.style.opacity="1"; node.style.transform="translateY(0)"; }, i*130); }); obs.disconnect(); }
    }, { threshold:0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const padding   = isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 40px";
  const quoteSize = isMobile ? "clamp(16px,4.5vw,20px)" : isTablet ? "clamp(17px,2.5vw,22px)" : "clamp(18px,2.2vw,24px)";

  return (
    <section ref={sectionRef} style={{ position:"relative", background:MY_COLORS.bgSection, padding, overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:1000, height:400, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(232,117,10,0.09) 0%, transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }}/>
      <div style={{ maxWidth:isMobile?"100%":860, margin:"0 auto", position:"relative", textAlign:"center" }}>

        <div data-reveal style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:isMobile?24:36, opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>
          <span style={{ width:28, height:2, borderRadius:9999, background:MY_COLORS.gradientOrange }}/>
          <span style={{ fontFamily:FONTS.primary, fontSize:FONTS.size.xs, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:MY_COLORS.orange }}>{t("homeTestimonial.eyebrow")}</span>
          <span style={{ width:28, height:2, borderRadius:9999, background:MY_COLORS.gradientOrange }}/>
        </div>

        {!isMobile && <div data-reveal style={{ fontFamily:"Georgia, serif", fontSize:100, lineHeight:0.6, color:MY_COLORS.orangeBorder, marginBottom:24, userSelect:"none", opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>"</div>}

        <div data-reveal style={{ display:"flex", justifyContent:"center", gap:4, marginBottom:isMobile?16:24, opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>
          {Array(5).fill(0).map((_,i) => <StarIcon key={i}/>)}
        </div>

        <p data-reveal style={{ fontFamily:FONTS.secondary, fontSize:quoteSize, lineHeight:"1.8", color:MY_COLORS.textSecondary, margin:`0 0 ${isMobile?28:40}px`, fontStyle:"italic", opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>
          "{t("homeTestimonial.quote")}"
        </p>

        <div data-reveal style={{ width:48, height:2, background:MY_COLORS.gradientOrange, borderRadius:9999, margin:`0 auto ${isMobile?20:28}px`, opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}/>

        <div data-reveal style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:isMobile?12:16, flexWrap:"wrap", opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>
          <div style={{ width:48, height:48, borderRadius:"50%", background:MY_COLORS.orangeDim, border:`2px solid ${MY_COLORS.orangeBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FONTS.primary, fontSize:FONTS.size.md, fontWeight:800, color:MY_COLORS.orange, flexShrink:0 }}>
            {t("homeTestimonial.author")[0]}
          </div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontFamily:FONTS.primary, fontSize:FONTS.size.base, fontWeight:700, color:MY_COLORS.textPrimary }}>{t("homeTestimonial.author")}</div>
            <div style={{ fontFamily:FONTS.secondary, fontSize:FONTS.size.xs, color:MY_COLORS.textMuted }}>{t("homeTestimonial.role")} · {t("homeTestimonial.company")}</div>
          </div>
          {!isMobile && <div style={{ width:1, height:32, background:MY_COLORS.border }}/>}
          <span style={{ padding:"4px 14px", borderRadius:9999, background:MY_COLORS.orangeDim, border:`1px solid ${MY_COLORS.orangeBorder}`, fontFamily:FONTS.primary, fontSize:11, fontWeight:600, color:MY_COLORS.orange }}>
            {t("homeTestimonial.project")}
          </span>
        </div>
      </div>
    </section>
  );
};
export default HomeTestimonial;