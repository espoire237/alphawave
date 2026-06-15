import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { getFaqs } from "../../constants/contactData.jsx";
import { ChevronDown, ArrowRight } from "../icons/ContactIcons.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const FaqMini = () => {
  const { t } = useTranslation();
  const FAQS = getFaqs(t);
  const ref = useScrollReveal(0.1);
  const { isMobile, isTablet } = useBreakpoint();
  const [open, setOpen] = useState(null);

  const px = isMobile ? "20px" : isTablet ? "32px" : "40px";
  const py = isMobile ? "56px" : "80px";

  return (
    <section ref={ref} style={{ background: MY_COLORS.bgBase, padding: `${py} 0` }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: `0 ${px}` }}>

        <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 40 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>{t("contactPage.faqMini.eyebrow")}</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textMuted, margin: 0, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            {t("contactPage.faqMini.subtitle")}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <div key={i} data-reveal style={{ borderRadius: 12, background: MY_COLORS.bgSurface, border: `1px solid ${open === i ? MY_COLORS.orangeBorder : MY_COLORS.border}`, overflow: "hidden", transition: "border-color 0.3s ease", opacity: 0, transform: "translateY(20px)" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: isMobile ? "16px 18px" : "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: FONTS.primary, fontSize: isMobile ? FONTS.size.sm : FONTS.size.base, fontWeight: FONTS.weight.semibold, color: open === i ? MY_COLORS.orange : MY_COLORS.textPrimary, transition: "color 0.3s ease", paddingRight: 12 }}>{faq.q}</span>
                <span style={{ color: MY_COLORS.orange, flexShrink: 0 }}><ChevronDown open={open === i} /></span>
              </button>
              {open === i && (
                <div style={{ padding: isMobile ? "0 18px 18px" : "0 24px 20px" }}>
                  <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, lineHeight: FONTS.leading.relaxed, color: MY_COLORS.textSecondary, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div data-reveal style={{ textAlign: "center", marginTop: 28, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <Link to="/faq"
            style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: FONTS.weight.semibold, color: MY_COLORS.orange, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "gap 0.2s ease" }}
            onMouseEnter={e => e.currentTarget.style.gap = "10px"}
            onMouseLeave={e => e.currentTarget.style.gap = "6px"}>
            {t("contactPage.faqMini.seeAll")} <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqMini;