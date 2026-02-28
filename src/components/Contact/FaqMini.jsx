import { useState } from "react";
import { Link } from "react-router-dom";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { FAQS } from "../../constants/contactData.jsx";
import { ChevronDown, ArrowRight } from "../icons/ContactIcons.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

const FaqMini = () => {
  const ref = useScrollReveal(0.1);
  const [open, setOpen] = useState(null);

  return (
    <section ref={ref} style={{ background: MY_COLORS.bgBase, padding: "80px 0" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>Quick Answers</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textMuted, margin: 0, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            Have questions before reaching out? Here are the most common ones.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <div key={i} data-reveal style={{ borderRadius: 12, background: MY_COLORS.bgSurface, border: `1px solid ${open === i ? MY_COLORS.orangeBorder : MY_COLORS.border}`, overflow: "hidden", transition: "border-color 0.3s ease", opacity: 0, transform: "translateY(20px)" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: FONTS.weight.semibold, color: open === i ? MY_COLORS.orange : MY_COLORS.textPrimary, transition: "color 0.3s ease" }}>{faq.q}</span>
                <span style={{ color: MY_COLORS.orange, flexShrink: 0, marginLeft: 16 }}><ChevronDown open={open === i} /></span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px" }}>
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
            See All FAQs <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqMini;