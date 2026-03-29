import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { CONTACT_INFO } from "../../constants/contactData.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const ContactInfoSection = () => {
  const ref = useScrollReveal(0.08);
  const { isMobile, isTablet, isLargeTablet } = useBreakpoint();

  const px   = isMobile ? "20px" : isTablet ? "32px" : "40px";
  const py   = isMobile ? "56px" : "80px";
  // 5 items: mobile=1col, tablet=2col, largeTablet=3col, desktop=5col
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : isLargeTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)";

  return (
    <section ref={ref} style={{ position: "relative", background: MY_COLORS.bgBase, padding: `${py} 0`, overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -150, left: -100, width: isMobile ? 300 : 500, height: isMobile ? 300 : 500, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${px}`, position: "relative" }}>

        <div data-reveal style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>Other Ways To Reach Us</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 12 : 16 }}>
          {CONTACT_INFO.map((item, i) => (
            <div key={i} data-reveal
              style={{ padding: isMobile ? "20px 16px" : "28px 20px", borderRadius: 14, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, textAlign: "center", opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease" }}
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