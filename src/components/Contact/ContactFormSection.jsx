import { useState } from "react";
import { Link } from "react-router-dom";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { SERVICES, BUDGETS, SOURCES } from "../../constants/contactData.jsx";
import { ArrowRight } from "../icons/ContactIcons.jsx";
import FormInput from "../ui/FormInput.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

const ContactFormSection = () => {
  const ref = useScrollReveal(0.05);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", company_name: "",
    service_interested: "", budget_range: "", project_description: "",
    referral_source: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const validate = () => {
    const e = {};
    if (!form.full_name.trim())           e.full_name           = "Full name is required";
    if (!form.email.trim())               e.email               = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email          = "Enter a valid email";
    if (!form.service_interested)         e.service_interested  = "Please select a service";
    if (!form.project_description.trim()) e.project_description = "Please describe your project";
    else if (form.project_description.trim().split(" ").length < 10)
      e.project_description = "Please provide more detail (at least a few sentences)";
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
      // const res = await fetch("https://your-directus.com/items/leads", {
      //   method:  "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body:    JSON.stringify({ ...form, status: "New", submitted_at: new Date().toISOString() }),
      // });
      // if (!res.ok) throw new Error("Failed");
      await new Promise(r => setTimeout(r, 1500));
      setStatus("success");
      setForm({ full_name: "", email: "", phone: "", company_name: "", service_interested: "", budget_range: "", project_description: "", referral_source: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={ref} style={{ position: "relative", background: MY_COLORS.bgSection, padding: "100px 0", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`, pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <span style={{ width: 28, height: 2, borderRadius: 9999, background: MY_COLORS.gradientOrange }} />
            <span style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xs, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.widest, textTransform: "uppercase", color: MY_COLORS.orange }}>
              Start The Conversation
            </span>
          </div>
          <h2 data-reveal style={{ fontFamily: FONTS.primary, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: FONTS.weight.extrabold, letterSpacing: FONTS.tracking.tight, color: MY_COLORS.textPrimary, margin: "0 0 12px 0", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            Tell Us About Your{" "}
            <span style={{ color: MY_COLORS.orange, textShadow: `0 0 30px ${MY_COLORS.orangeGlow}` }}>Project</span>
          </h2>
          <p data-reveal style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textMuted, margin: 0, opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            We'll get back to you with a tailored plan within 24 hours.
          </p>
        </div>

        {/* Form card */}
        <div data-reveal style={{ padding: "48px 52px", borderRadius: 20, background: MY_COLORS.bgSurface, border: `1px solid ${MY_COLORS.border}`, opacity: 0, transform: "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>

          {status === "success" && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
              <h3 style={{ fontFamily: FONTS.primary, fontSize: FONTS.size.xl, fontWeight: FONTS.weight.extrabold, color: MY_COLORS.textPrimary, marginBottom: 12 }}>Message Received!</h3>
              <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.base, color: MY_COLORS.textSecondary, marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>
                Our team will reach out within 24 hours. In the meantime, explore our work.
              </p>
              <Link to="/portfolio" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 8, background: MY_COLORS.gradientOrange, color: "#fff", fontFamily: FONTS.primary, fontSize: FONTS.size.sm, fontWeight: FONTS.weight.bold }}>
                View Our Portfolio <ArrowRight />
              </Link>
            </div>
          )}

          {status === "error" && (
            <div style={{ padding: "14px 20px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", marginBottom: 28, color: "#ef4444", fontFamily: FONTS.secondary, fontSize: FONTS.size.sm }}>
              ⚠️ Something went wrong. Please try again or email us at{" "}
              <a href="mailto:contact@alphawaves.com" style={{ color: MY_COLORS.orange }}>contact@alphawaves.com</a>
            </div>
          )}

          {status !== "success" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <FormInput label="Full Name"     name="full_name" value={form.full_name} onChange={handleChange} required placeholder="Jean Dupont"      error={errors.full_name} />
                <FormInput label="Email Address" name="email"     value={form.email}     onChange={handleChange} required type="email" placeholder="you@company.com" error={errors.email} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <FormInput label="Phone Number" name="phone"        value={form.phone}        onChange={handleChange} type="tel"  placeholder="+237 XXX XXX XXX" />
                <FormInput label="Company Name" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Your Company" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <FormInput label="Service Interested In" name="service_interested" value={form.service_interested} onChange={handleChange} required as="select" placeholder="Select a service..."    options={SERVICES} error={errors.service_interested} />
                <FormInput label="Budget Range"          name="budget_range"       value={form.budget_range}       onChange={handleChange} as="select" placeholder="Select budget range..." options={BUDGETS} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <FormInput label="Project Description" name="project_description" value={form.project_description} onChange={handleChange} required as="textarea" placeholder="Tell us about your project, goals, challenges, and what success looks like for you..." error={errors.project_description} />
              </div>
              <div style={{ marginBottom: 36 }}>
                <FormInput label="How Did You Find Us?" name="referral_source" value={form.referral_source} onChange={handleChange} as="select" placeholder="Select source..." options={SOURCES} />
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <p style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.textMuted, margin: 0 }}>
                  🔒 Your information is 100% confidential. No spam, ever.
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 36px", borderRadius: 10, background: status === "loading" ? MY_COLORS.bgSurfaceHover : MY_COLORS.gradientOrange, color: "#fff", border: "none", fontFamily: FONTS.primary, fontSize: FONTS.size.base, fontWeight: FONTS.weight.bold, letterSpacing: FONTS.tracking.wide, cursor: status === "loading" ? "not-allowed" : "pointer", boxShadow: status === "loading" ? "none" : `0 0 24px ${MY_COLORS.orangeGlow}`, transition: "all 0.3s ease", opacity: status === "loading" ? 0.7 : 1 }}
                  onMouseEnter={e => { if (status !== "loading") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 0 36px ${MY_COLORS.orangeGlow}`; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 0 24px ${MY_COLORS.orangeGlow}`; }}
                >
                  {status === "loading" ? (
                    <><span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite", display: "inline-block" }} />Sending...</>
                  ) : (
                    <>Send Message <ArrowRight /></>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
          .form-card    { padding: 28px 20px !important; }
        }
      `}</style>
    </section>
  );
};

export default ContactFormSection;