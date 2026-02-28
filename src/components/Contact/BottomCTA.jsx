import { useState } from "react";
import { Link } from "react-router-dom";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { ArrowRight } from "../icons/ContactIcons.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

const BottomCTA = () => {
  const ref = useScrollReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <section ref={ref} style={{ background: MY_COLORS.bgSection, padding: "80px 0 100px", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 100%, rgba(232,117,10,0.1) 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", textAlign: "center" }}>
        <div data-reveal style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>Explore Our Work</span>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
          </div>
          <h2 style={{ fontFamily: FONTS.primary, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, color: MY_COLORS.textPrimary, margin: "0 0 16px", lineHeight: FONTS.leading.snug }}>
            Not Ready to Contact{" "}
            <span style={{ color: MY_COLORS.orange, textShadow: `0 0 30px ${MY_COLORS.orangeGlow}` }}>Us Yet?</span>
          </h2>
          <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.md, color: MY_COLORS.textSecondary, margin: "0 auto 36px", maxWidth: 480, lineHeight: FONTS.leading.relaxed }}>
            See our work first — explore real projects we've delivered across Africa.
          </p>
          <Link to="/portfolio"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: hovered ? 12 : 8, padding: "14px 36px", borderRadius: 10, background: MY_COLORS.gradientOrange, color: "#fff", fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.wide, boxShadow: hovered ? `0 0 40px ${MY_COLORS.orangeGlow}` : `0 0 24px rgba(232,117,10,0.3)`, transform: hovered ? "translateY(-3px)" : "translateY(0)", transition: "all 0.3s ease" }}>
            View Our Portfolio <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;