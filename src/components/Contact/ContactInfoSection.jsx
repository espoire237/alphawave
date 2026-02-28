import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { CONTACT_INFO } from "../../constants/contactData.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

const ContactInfoSection = () => {
  const ref = useScrollReveal(0.08);
  return (
    <section ref={ref} style={{ position: "relative", background: MY_COLORS.bgBase, padding: "80px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -150, left: -100, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative" }}>

        <div data-reveal style={{ textAlign: "center", marginBottom: 48, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>Other Ways To Reach Us</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {CONTACT_INFO.map((item, i) => (
            <div key={i} data-reveal
              style={{ padding: "28px 20px", borderRadius: 14, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, textAlign: "center", opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = MY_COLORS.border;       e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: MY_COLORS.orangeDim, border: `1px solid ${MY_COLORS.orangeBorder}`, display: "flex", alignItems: "center", justifyContent: "center", color: MY_COLORS.orange, margin: "0 auto 16px" }}>
                {item.icon}
              </div>
              <div style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.wider, textTransform: "uppercase", color: MY_COLORS.orange, marginBottom: 8 }}>{item.label}</div>
              <div style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: MY_COLORS.textPrimary, marginBottom: 6 }}>{item.value}</div>
              <div style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted, lineHeight: 1.5 }}>{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;