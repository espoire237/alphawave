/**
 * TeamSection — About Page Section 5
 * AlphaWaves brand system
 */

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

const useScrollReveal = (t = 0.05) => {
  const ref = useRef(null);
  const visible = useRef(false);
  const revealItems = () => {
    const el = ref.current; if (!el) return;
    el.querySelectorAll("[data-reveal]").forEach((item, i) => {
      setTimeout(() => { item.style.opacity = "1"; item.style.transform = "translateY(0)"; }, i * 80);
    });
  };
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { visible.current = true; revealItems(); obs.disconnect(); }
    }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return { ref, revealItems };
};

const LinkedInIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// Member names, roles, expertise tags, initials and colors don't need translation
// Only bio text is translated
const TEAM_BASE = [
  { id: 1, name: "Alex Nguema",    role: "Lead Frontend Developer",   category: "engineering",     bioKey: "alex",     expertise: ["React","Vue.js","PWA","TypeScript"],       initials: "AN", color: "#E8750A" },
  { id: 2, name: "Boris Kamga",    role: "Lead Backend Developer",    category: "engineering",     bioKey: "boris",    expertise: ["Node.js","Python","Microservices","PostgreSQL"], initials: "BK", color: "#3B82F6" },
  { id: 3, name: "Claude Mbarga",  role: "DevOps Engineer",           category: "engineering",     bioKey: "claude",   expertise: ["AWS","Azure","Docker","CI/CD"],            initials: "CM", color: "#8B5CF6" },
  { id: 4, name: "Diana Fotso",    role: "AI/ML Engineer",            category: "aiData",          bioKey: "diana",    expertise: ["Python","TensorFlow","NLP","Analytics"],   initials: "DF", color: "#10B981" },
  { id: 5, name: "Eric Nkemelu",   role: "Data Scientist",            category: "aiData",          bioKey: "eric",     expertise: ["R","Python","SQL","PowerBI"],              initials: "EN", color: "#F59E0B" },
  { id: 6, name: "Fatima Diallo",  role: "SEO & Growth Strategist",   category: "digitalStrategy", bioKey: "fatima",   expertise: ["SEO","Content Strategy","Analytics","SEM"], initials: "FD", color: "#EC4899" },
  { id: 7, name: "George Tamba",   role: "UI/UX Designer",            category: "digitalStrategy", bioKey: "george",   expertise: ["Figma","User Research","Design Systems","UX"], initials: "GT", color: "#06B6D4" },
  { id: 8, name: "Hortense Nkomo", role: "Mobile Developer",          category: "engineering",     bioKey: "hortense", expertise: ["React Native","iOS","Android","Flutter"],  initials: "HN", color: "#F97316" },
];

const MemberCard = ({ member }) => (
  <div data-reveal className="group relative rounded-2xl border transition-all duration-300 opacity-0 translate-y-6 overflow-hidden hover:-translate-y-1"
    style={{ background: MY_COLORS.bgSurface, borderColor: MY_COLORS.border }}>
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ boxShadow: `inset 0 0 20px ${member.color}10, 0 12px 40px ${member.color}15` }} />
    <div className="p-6 pb-4 relative z-10">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-base border-2 shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${member.color}15`, borderColor: `${member.color}30`, color: member.color, fontFamily: FONTS.primary }}>
          {member.initials}
        </div>
        <div>
          <h4 className="font-bold text-sm md:text-base leading-tight" style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}>
            {member.name}
          </h4>
          <p className="text-[10px] md:text-xs mt-0.5" style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textMuted }}>
            {member.role}
          </p>
        </div>
      </div>
      <p className="text-[11px] md:text-xs leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: FONTS.secondary, color: MY_COLORS.textMuted }}>
        {member.bio}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {member.expertise.map((tag, i) => (
          <span key={i} className="px-2 py-0.5 rounded-full border text-[9px] uppercase tracking-wider bg-white/5"
            style={{ borderColor: MY_COLORS.border, color: MY_COLORS.textMuted, fontFamily: FONTS.secondary }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="px-6 py-3 border-t flex justify-between items-center relative z-10" style={{ borderColor: MY_COLORS.border }}>
      <span className="px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:bg-opacity-20"
        style={{ background: `${member.color}10`, borderColor: `${member.color}25`, color: member.color, fontFamily: FONTS.primary }}>
        {member.categoryLabel}
      </span>
      <a href="#" className="flex items-center justify-center w-7 h-7 rounded-lg border transition-all duration-200 hover:scale-110 bg-white/5"
        style={{ borderColor: MY_COLORS.border, color: MY_COLORS.textMuted }}
        onMouseEnter={e => { e.currentTarget.style.color = MY_COLORS.orange; e.currentTarget.style.borderColor = MY_COLORS.orangeBorder; e.currentTarget.style.backgroundColor = MY_COLORS.orangeDim; }}
        onMouseLeave={e => { e.currentTarget.style.color = MY_COLORS.textMuted; e.currentTarget.style.borderColor = MY_COLORS.border; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; }}>
        <LinkedInIcon />
      </a>
    </div>
  </div>
);

const TeamSection = () => {
  const { t } = useTranslation();
  const { ref: sectionRef, revealItems } = useScrollReveal(0.05);
  const [activeCategory, setActiveCategory] = useState("all");

  // ✅ Categories and team data built inside component with t()
  const CATEGORIES = [
    { key: "all",             label: t("teamSection.categories.all")             },
    { key: "engineering",     label: t("teamSection.categories.engineering")     },
    { key: "aiData",          label: t("teamSection.categories.aiData")          },
    { key: "digitalStrategy", label: t("teamSection.categories.digitalStrategy") },
  ];

  const TEAM = TEAM_BASE.map(m => ({
    ...m,
    bio:           t(`teamSection.members.${m.bioKey}.bio`),
    categoryLabel: t(`teamSection.categories.${m.category}`),
  }));

  const filtered = activeCategory === "all" ? TEAM : TEAM.filter(m => m.category === activeCategory);

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    const items = sectionRef.current.querySelectorAll("[data-reveal]");
    items.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(10px)"; });
    setTimeout(revealItems, 50);
  };

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 px-6 lg:px-10 overflow-hidden" style={{ background: MY_COLORS.bgBase }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-16">
          <div className="max-w-xl">
            <div data-reveal className="inline-flex items-center gap-3 mb-4 opacity-0 translate-y-5 transition-all duration-700">
              <span className="w-8 h-0.5 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
              <span className="uppercase font-bold tracking-[0.2em] text-[10px] md:text-xs" style={{ fontFamily: FONTS.primary, color: MY_COLORS.orange }}>
                {t("teamSection.eyebrow")}
              </span>
              <span className="w-8 h-0.5 rounded-full" style={{ background: MY_COLORS.gradientOrange }} />
            </div>
            <h2 data-reveal className="text-3xl md:text-5xl font-extrabold opacity-0 translate-y-5 transition-all duration-700 delay-100"
              style={{ fontFamily: FONTS.primary, color: MY_COLORS.textPrimary }}>
              {t("teamSection.title")} <span style={{ color: MY_COLORS.orange }}>{t("teamSection.titleAccent")}</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div data-reveal className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar opacity-0 translate-y-5 transition-all duration-700 delay-200">
            {CATEGORIES.map(cat => (
              <button key={cat.key} onClick={() => handleFilter(cat.key)}
                className="px-4 py-2 rounded-full border text-[11px] font-bold whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ fontFamily: FONTS.primary, backgroundColor: activeCategory === cat.key ? MY_COLORS.orangeDim : "transparent", color: activeCategory === cat.key ? MY_COLORS.orange : MY_COLORS.textMuted, borderColor: activeCategory === cat.key ? MY_COLORS.orange : MY_COLORS.border }}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(member => <MemberCard key={member.id} member={member} />)}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default TeamSection;