import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { TRUST } from "../../constants/contactData.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const TrustBar = () => {
  const { isMobile, isTablet } = useBreakpoint();
  const px  = isMobile ? "20px" : isTablet ? "32px" : "40px";
  const gap = isMobile ? 20 : isTablet ? 28 : 48;

  return (
    <div style={{ background: MY_COLORS.bgSurface, borderTop: `1px solid ${MY_COLORS.border}`, borderBottom: `1px solid ${MY_COLORS.border}`, padding: `20px ${px}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap, flexWrap: "wrap" }}>
        {TRUST.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ fontFamily: FONTS.primary, fontSize: isMobile ? FONTS.size.xs : FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: MY_COLORS.textSecondary, whiteSpace: "nowrap" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;