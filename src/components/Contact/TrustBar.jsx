import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { TRUST } from "../../constants/contactData.jsx";

const TrustBar = () => (
  <div style={{ background: MY_COLORS.bgSurface, borderTop: `1px solid ${MY_COLORS.border}`, borderBottom: `1px solid ${MY_COLORS.border}`, padding: "20px 40px" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
      {TRUST.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: MY_COLORS.textSecondary, whiteSpace: "nowrap" }}>{item.label}</span>
          {i < TRUST.length - 1 && <span style={{ width: 1, height: 16, background: MY_COLORS.border, marginLeft: 24 }} />}
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;