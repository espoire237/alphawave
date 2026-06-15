import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { getServices, getBudgets, getSources } from "../../constants/contactData.jsx";
import { ArrowRight } from "../icons/ContactIcons.jsx";
import FormInput from "../ui/FormInput.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";

const ContactFormSection = () => {
  const { t } = useTranslation();
  const SERVICES = getServices(t);
  const BUDGETS = getBudgets(t);
  const SOURCES = getSources(t);
  const ref = useScrollReveal(0.05);
  const { isMobile, isTablet } = useBreakpoint();

  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", company_name: "",
    service_interested: "", budget_range: "", project_description: "",
    referral_source: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const px      = isMobile ? "20px" : isTablet ? "32px" : "40px";
  const py      = isMobile ? "64px" : isTablet ? "80px" : "100px";
  const cardPad = isMobile ? "28px 20px" : isTablet ? "36px 32px" : "48px 52px";
  const cols2   = isMobile ? "1fr" : "1fr 1fr";

  const validate = () => {
    const e = {};
    if (!form.full_name.trim())           e.full_name           = t("contactPage.form.errors.fullNameRequired");
    if (!form.email.trim())               e.email               = t("contactPage.form.errors.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email          = t("contactPage.form.errors.emailInvalid");
    if (!form.service_interested)         e.service_interested  = t("contactPage.form.errors.serviceRequired");
    if (!form.project_description.trim()) e.project_description = t("contactPage.form.errors.descriptionRequired");
    else if (form.project_description.trim().split(" ").length < 10)
      e.project_description = t("contactPage.form.errors.descriptionTooShort");
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("loading");
    try {
      // ── TODO: Connect to Directus Leads collection ──────────
      await new Promise(r => setTimeout(r, 1500));
      setStatus("success");
      setForm({ full_name: "", email: "", phone: "", company_name: "", service_interested: "", budget_range: "", project_description: "", referral_source: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={ref} style={{ position: "relative", background: MY_COLORS.bgSection, padding: `${py} 0`, overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: -100, right: -100, width: isMobile ? 300 : 600, height: isMobile ? 300 : 600, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${px}`, position: "relative" }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? 36 : 56 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>
              {t("contactPage.form.eyebrow")}
            </span>
          </div>
          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, color: MY_COLORS.textPrimary, margin: "0 0 12px 0", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            {t("contactPage.form.headline.main")}{" "}
            <span style={{ color: MY_COLORS.orange, textShadow: `0 0 30px ${MY_COLORS.orangeGlow}` }}>{t("contactPage.form.headline.accent")}</span>
          </h2>
          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textMuted, margin: 0, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            {t("contactPage.form.subheadline")}
          </p>
        </div>

        {/* Form card */}
        <div data-reveal style={{ padding: cardPad, borderRadius: 20, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, opacity: 0, transform: "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>

          {status === "success" && (
            <div style={{ textAlign: "center", padding: isMobile ? "40px 0" : "60px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
              <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xl, fontWeight: FONTS.weight.extrabold, color: MY_COLORS.textPrimary, marginBottom: 12 }}>{t("contactPage.form.success.title")}</h3>
              <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textSecondary, marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>
                {t("contactPage.form.success.message")}
              </p>
              <Link to="/portfolio" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 8, background: MY_COLORS.gradientOrange, color: "#fff", fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: FONTS.weight.bold }}>
                {t("contactPage.form.success.cta")} <ArrowRight />
              </Link>
            </div>
          )}

          {status === "error" && (
            <div style={{ padding: "14px 20px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", marginBottom: 28, color: "#ef4444", fontFamily: FONTS.secondary, fontSize: FONTS.size.sm }}>
              ⚠️ {t("contactPage.form.error.message")}{" "}
              <a href="mailto:contact@alphawaves.com" style={{ color: MY_COLORS.orange }}>contact@alphawaves.com</a>
            </div>
          )}

          {status !== "success" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: cols2, gap: 20, marginBottom: 20 }}>
                <FormInput label={t("contactPage.form.labels.fullName")}     name="full_name" value={form.full_name} onChange={handleChange} required placeholder={t("contactPage.form.examples.fullName")}         error={errors.full_name} />
                <FormInput label={t("contactPage.form.labels.email")} name="email"     value={form.email}     onChange={handleChange} required type="email" placeholder={t("contactPage.form.examples.email")} error={errors.email} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: cols2, gap: 20, marginBottom: 20 }}>
                <FormInput label={t("contactPage.form.labels.phone")} name="phone"        value={form.phone}        onChange={handleChange} type="tel"  placeholder={t("contactPage.form.examples.phone")} />
                <FormInput label={t("contactPage.form.labels.company")} name="company_name" value={form.company_name} onChange={handleChange} placeholder={t("contactPage.form.examples.company")} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: cols2, gap: 20, marginBottom: 20 }}>
                <FormInput label={t("contactPage.form.labels.service")} name="service_interested" value={form.service_interested} onChange={handleChange} required as="select" placeholder={t("contactPage.form.placeholders.selectService")}    options={SERVICES} error={errors.service_interested} />
                <FormInput label={t("contactPage.form.labels.budget")}          name="budget_range"       value={form.budget_range}       onChange={handleChange} as="select" placeholder={t("contactPage.form.placeholders.selectBudget")} options={BUDGETS} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <FormInput label={t("contactPage.form.labels.description")} name="project_description" value={form.project_description} onChange={handleChange} required as="textarea" placeholder={t("contactPage.form.placeholders.description")} error={errors.project_description} />
              </div>
              <div style={{ marginBottom: 36 }}>
                <FormInput label={t("contactPage.form.labels.source")} name="referral_source" value={form.referral_source} onChange={handleChange} as="select" placeholder={t("contactPage.form.placeholders.selectSource")} options={SOURCES} />
              </div>

              {/* Submit row */}
              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", justifyContent: "space-between", gap: 16 }}>
                <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted, margin: 0, textAlign: isMobile ? "center" : "left" }}>
                  {t("contactPage.form.privacy")}
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 36px", borderRadius: 10, background: status === "loading" ? MY_COLORS.bgSurfaceHover : MY_COLORS.gradientOrange, color: "#fff", border: "none", fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.wide, cursor: status === "loading" ? "not-allowed" : "pointer", boxShadow: status === "loading" ? "none" : `0 0 24px ${MY_COLORS.orangeGlow}`, transition: "all 0.3s ease", opacity: status === "loading" ? 0.7 : 1, width: isMobile ? "100%" : "auto" }}
                  onMouseEnter={e => { if (status !== "loading") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 0 36px ${MY_COLORS.orangeGlow}`; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 0 24px ${MY_COLORS.orangeGlow}`; }}
                >
                  {status === "loading" ? (
                    <><span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite", display: "inline-block" }} />{t("contactPage.form.sending")}</>
                  ) : (
                    <>{t("contactPage.form.sendBtn")} <ArrowRight /></>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default ContactFormSection;