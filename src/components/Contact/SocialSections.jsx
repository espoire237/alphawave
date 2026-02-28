import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { SOCIALS } from "../../constants/contactData.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

const SocialSection = () => {
  const ref = useScrollReveal(0.1);
  return (
    <section ref={ref} style={{ background: MY_COLORS.bgSection, padding: "72px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
        <div data-reveal style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>Follow Our Journey</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
          <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textMuted, margin: "0 0 32px" }}>
            Stay connected — we share insights, projects, and updates.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                style={{ width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, color: MY_COLORS.textMuted, textDecoration: "none", transition: "all 0.25s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = MY_COLORS.orangeDim; e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.color = MY_COLORS.orange; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = MY_COLORS.bgSurface; e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.color = MY_COLORS.textMuted; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;