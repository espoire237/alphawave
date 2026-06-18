/**
 * HomeTrustedBy Homepage Section 2 FULLY RESPONSIVE
 */
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

// Client names are brand names kept as-is, not translated
const CLIENTS = ["Fashion Boutique Douala","Regional Farmer Co-op","Microfinance Institution","Private Medical Clinic","Boutique Hotel Chain","Private University","Logistics Company","Fintech Startup"];

const HomeTrustedBy = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useBreakpoint();
  const items = [...CLIENTS,...CLIENTS,...CLIENTS,...CLIENTS];
  const marqueeSpeed = isMobile ? "44s" : isTablet ? "38s" : "32s";
  const fadeWidth    = isMobile ? 60 : isTablet ? 100 : 160;

  return (
    <div style={{ position:"relative", background:MY_COLORS.bgSection, borderTop:`1px solid ${MY_COLORS.border}`, borderBottom:`1px solid ${MY_COLORS.border}`, overflow:"hidden", padding:isMobile?"20px 0":"28px 0" }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:fadeWidth, background:`linear-gradient(to right, ${MY_COLORS.bgSection}, transparent)`, zIndex:2, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:fadeWidth, background:`linear-gradient(to left, ${MY_COLORS.bgSection}, transparent)`, zIndex:2, pointerEvents:"none" }}/>
      {!isMobile && (
        <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", zIndex:3, background:MY_COLORS.bgSection, padding:"4px 16px", border:`1px solid ${MY_COLORS.border}`, borderRadius:9999, backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)" }}>
          <span style={{ fontFamily:FONTS.primary, fontSize:10, fontWeight:FONTS.weight.bold, letterSpacing:FONTS.tracking.widest, textTransform:"uppercase", color:MY_COLORS.textDisabled, whiteSpace:"nowrap" }}>
            {t("trustedBy.label")}
          </span>
        </div>
      )}
      <div style={{ overflow:"hidden" }}>
        <div style={{ display:"flex", animation:`marquee ${marqueeSpeed} linear infinite`, width:"max-content" }}>
          {items.map((client,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:isMobile?"0 20px":"0 40px", flexShrink:0 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:MY_COLORS.orangeBorder, flexShrink:0 }}/>
              <span style={{ fontFamily:FONTS.primary, fontSize:isMobile?12:FONTS.size.sm, fontWeight:FONTS.weight.semibold, color:MY_COLORS.textMuted, whiteSpace:"nowrap", letterSpacing:FONTS.tracking.wide }}>{client}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-25%)}}`}</style>
    </div>
  );
};
export default HomeTrustedBy;