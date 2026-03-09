/**
 * HomeTrustedBy — Homepage Section 2 — FULLY RESPONSIVE
 */
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const CLIENTS = [
  "Fashion Boutique Douala","Regional Farmer Co-op","Microfinance Institution",
  "Private Medical Clinic","Boutique Hotel Chain","Private University",
  "Logistics Company","Fintech Startup",
];

const HomeTrustedBy = () => {
  const { isMobile, isTablet } = useBreakpoint();

  // FIX 4 — x4 repeat so loop never gaps on wide screens
  const items = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  // FIX 2 — slower on mobile so perceived speed feels consistent
  const marqueeSpeed = isMobile ? "44s" : isTablet ? "38s" : "32s";

  // FIX 3 — proportional fade width per breakpoint
  const fadeWidth = isMobile ? 60 : isTablet ? 100 : 160;

  return (
    <div style={{
      position: "relative",
      background: MY_COLORS.bgSection,
      borderTop: `1px solid ${MY_COLORS.border}`,
      borderBottom: `1px solid ${MY_COLORS.border}`,
      overflow: "hidden",
      padding: isMobile ? "20px 0" : "28px 0",
    }}>

      {/* Left fade */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: fadeWidth, background: `linear-gradient(to right, ${MY_COLORS.bgSection}, transparent)`, zIndex: 2, pointerEvents: "none" }} />

      {/* Right fade */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: fadeWidth, background: `linear-gradient(to left, ${MY_COLORS.bgSection}, transparent)`, zIndex: 2, pointerEvents: "none" }} />

      {/* FIX 1 — hide pill on mobile to avoid text overlap */}
      {!isMobile && (
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)", zIndex: 3,
          background: MY_COLORS.bgSection,
          padding: "4px 16px",
          border: `1px solid ${MY_COLORS.border}`,
          borderRadius: 9999,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}>
          <span style={{ fontFamily: FONTS.primary, fontSize: 10, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.textDisabled, whiteSpace: "nowrap" }}>
            Trusted By
          </span>
        </div>
      )}

      {/* Marquee */}
      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", animation: `marquee ${marqueeSpeed} linear infinite`, width: "max-content" }}>
          {items.map((client, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "0 20px" : "0 40px", flexShrink: 0 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: MY_COLORS.orangeBorder, flexShrink: 0 }} />
              <span style={{ fontFamily: FONTS.primary, fontSize: isMobile ? 12 : FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: MY_COLORS.textMuted, whiteSpace: "nowrap", letterSpacing: FONTS.tracking.wide }}>
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* translateX is -25% since we have x4 items now */}
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-25%)} }`}</style>
    </div>
  );
};
export default HomeTrustedBy;