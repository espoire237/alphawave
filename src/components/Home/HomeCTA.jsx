/**
 * HomeCTA Homepage Section 9 FULLY RESPONSIVE
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CheckIcon  = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="7.5" fill="rgba(232,117,10,0.15)"/><path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke="#E8750A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const PERK_KEYS = ["1","2","3","4"];

const HomeCTA = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useBreakpoint();
  const sectionRef = useRef(null);
  const [p1, setP1] = useState(false);
  const [p2, setP2] = useState(false);

  // ✅ PERKS inside component so t() is in scope
  const PERKS = PERK_KEYS.map(key => t(`homeCTA.perks.${key}`));

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.querySelectorAll("[data-reveal]").forEach((node,i) => { setTimeout(() => { node.style.opacity="1"; node.style.transform="translateY(0) scale(1)"; }, i*130); }); obs.disconnect(); }
    }, { threshold:0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const sectionPad = isMobile ? "48px 20px 64px" : isTablet ? "64px 32px 80px" : "80px 40px 100px";
  const boxPad     = isMobile ? "36px 24px" : isTablet ? "48px 40px" : "72px 80px";
  const titleSize  = isMobile ? "clamp(24px,6vw,34px)" : "clamp(32px,4.5vw,56px)";

  return (
    <section ref={sectionRef} style={{ position:"relative", background:MY_COLORS.bgBase, padding:sectionPad, overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:900, height:500, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(232,117,10,0.1) 0%, transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }}/>
      <div style={{ maxWidth:1280, margin:"0 auto", position:"relative" }}>
        <div data-reveal style={{ position:"relative", padding:boxPad, borderRadius:isMobile?16:24, background:"linear-gradient(135deg, rgba(232,117,10,0.12) 0%, rgba(232,117,10,0.05) 40%, rgba(10,10,10,0.95) 100%)", border:"1px solid rgba(232,117,10,0.3)", overflow:"hidden", textAlign:"center", opacity:0, transform:"translateY(30px) scale(0.98)", transition:"opacity 0.7s ease, transform 0.7s ease" }}>

          {/* Corner brackets */}
          {!isMobile && [{top:20,left:20},{top:20,right:20},{bottom:20,left:20},{bottom:20,right:20}].map((pos,i) => (
            <div key={i} style={{ position:"absolute", width:28, height:28, ...pos, borderTop:i<2?"2px solid rgba(232,117,10,0.3)":"none", borderBottom:i>=2?"2px solid rgba(232,117,10,0.3)":"none", borderLeft:i%2===0?"2px solid rgba(232,117,10,0.3)":"none", borderRight:i%2!==0?"2px solid rgba(232,117,10,0.3)":"none", pointerEvents:"none" }}/>
          ))}
          <div style={{ position:"absolute", top:0, left:isMobile?"10%":"20%", right:isMobile?"10%":"20%", height:2, background:MY_COLORS.gradientOrange, borderRadius:"0 0 9999px 9999px" }}/>

          <div data-reveal style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:isMobile?16:20, opacity:0, transform:"translateY(16px)", transition:"all 0.6s ease" }}>
            <span style={{ width:24, height:2, borderRadius:9999, background:MY_COLORS.gradientOrange }}/>
            <span style={{ fontFamily:FONTS.primary, fontSize:FONTS.size.xs, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:MY_COLORS.orange }}>{t("homeCTA.eyebrow")}</span>
            <span style={{ width:24, height:2, borderRadius:9999, background:MY_COLORS.gradientOrange }}/>
          </div>

          <h2 data-reveal style={{ fontFamily:FONTS.primary, fontSize:titleSize, fontWeight:800, color:MY_COLORS.textPrimary, margin:`0 auto ${isMobile?12:16}px`, maxWidth:680, lineHeight:"1.15", opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>
            {t("homeCTA.title")}{" "}
            <span style={{ color:MY_COLORS.orange, textShadow:"0 0 40px rgba(232,117,10,0.5)" }}>{t("homeCTA.titleAccent")}</span>
          </h2>

          <p data-reveal style={{ fontFamily:FONTS.secondary, fontSize:isMobile?FONTS.size.sm:FONTS.size.md, lineHeight:"1.7", color:MY_COLORS.textSecondary, margin:`0 auto ${isMobile?24:32}px`, maxWidth:520, opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>
            {t("homeCTA.subtitle")}
          </p>

          <div data-reveal style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"auto auto auto auto", justifyContent:isMobile?"stretch":"center", gap:isMobile?"10px 12px":"10px 24px", marginBottom:isMobile?28:36, opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>
            {PERKS.map((perk,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, justifyContent:isMobile?"flex-start":"center" }}>
                <CheckIcon/>
                <span style={{ fontFamily:FONTS.secondary, fontSize:isMobile?11:FONTS.size.sm, color:MY_COLORS.textSecondary, lineHeight:"1.4" }}>{perk}</span>
              </div>
            ))}
          </div>

          <div data-reveal style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:isMobile?12:16, flexDirection:isMobile?"column":"row", flexWrap:"wrap", opacity:0, transform:"translateY(20px)", transition:"all 0.6s ease" }}>
            <Link to="/contact" onMouseEnter={()=>setP1(true)} onMouseLeave={()=>setP1(false)}
              style={{ textDecoration:"none", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:p1?12:8, padding:isMobile?"14px 28px":"15px 36px", borderRadius:12, background:MY_COLORS.gradientOrange, color:"#fff", fontFamily:FONTS.primary, fontSize:isMobile?FONTS.size.sm:FONTS.size.md, fontWeight:700, letterSpacing:"0.04em", boxShadow:p1?"0 0 56px rgba(232,117,10,0.65)":"0 0 28px rgba(232,117,10,0.4)", transform:p1?"translateY(-3px)":"translateY(0)", transition:"all 0.3s ease", width:isMobile?"100%":"auto" }}>
              {t("homeCTA.primaryBtn")} <ArrowRight/>
            </Link>
            <Link to="/services" onMouseEnter={()=>setP2(true)} onMouseLeave={()=>setP2(false)}
              style={{ textDecoration:"none", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:p2?12:8, padding:isMobile?"13px 28px":"15px 36px", borderRadius:12, background:"transparent", color:p2?MY_COLORS.textPrimary:MY_COLORS.textSecondary, border:`1px solid ${p2?MY_COLORS.borderHover:MY_COLORS.border}`, fontFamily:FONTS.primary, fontSize:isMobile?FONTS.size.sm:FONTS.size.md, fontWeight:600, transform:p2?"translateY(-3px)":"translateY(0)", transition:"all 0.3s ease", width:isMobile?"100%":"auto" }}>
              {t("homeCTA.secondaryBtn")} <ArrowRight/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeCTA;