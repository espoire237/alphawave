/**
 * TeamSection — About Page Section 5
 * AlphaWaves brand system
 *
 * Usage:
 * import TeamSection from "../components/sections/TeamSection";
 * <TeamSection />
 */

import { useEffect, useRef, useState } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";

// ── Scroll reveal hook ────────────────────────────────────────
const useScrollReveal = (threshold = 0.05) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll("[data-reveal]");
          items.forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity   = "1";
              item.style.transform = "translateY(0)";
            }, i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

// ── LinkedIn icon ─────────────────────────────────────────────
const LinkedInIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// ── Team categories ───────────────────────────────────────────
const CATEGORIES = ["All", "Engineering", "AI & Data", "Digital Strategy"];

// ── Team members data ─────────────────────────────────────────
const TEAM_MEMBERS = [
  {
    id:         1,
    name:       "Alex Nguema",
    role:       "Lead Frontend Developer",
    category:   "Engineering",
    bio:        "Specializes in React, Vue.js, and progressive web applications. 5+ years building responsive, user-centric interfaces for African markets.",
    expertise:  ["React", "Vue.js", "PWA", "TypeScript"],
    initials:   "AN",
    color:      "#E8750A",
  },
  {
    id:         2,
    name:       "Boris Kamga",
    role:       "Lead Backend Developer",
    category:   "Engineering",
    bio:        "Expert in Node.js, Python, and microservices architecture. Focuses on scalable systems for high-traffic applications.",
    expertise:  ["Node.js", "Python", "Microservices", "PostgreSQL"],
    initials:   "BK",
    color:      "#3B82F6",
  },
  {
    id:         3,
    name:       "Claude Mbarga",
    role:       "DevOps Engineer",
    category:   "Engineering",
    bio:        "Cloud infrastructure specialist with expertise in AWS, Azure, and CI/CD pipelines. Ensures 99.9% uptime for mission-critical systems.",
    expertise:  ["AWS", "Azure", "Docker", "CI/CD"],
    initials:   "CM",
    color:      "#10B981",
  },
  {
    id:         4,
    name:       "Diane Fopa",
    role:       "Mobile Developer",
    category:   "Engineering",
    bio:        "Native iOS and Android development with focus on offline-first architecture and low-bandwidth optimization.",
    expertise:  ["React Native", "iOS", "Android", "Flutter"],
    initials:   "DF",
    color:      "#8B5CF6",
  },
  {
    id:         5,
    name:       "Eric Tamba",
    role:       "Data Analyst & AI Specialist",
    category:   "AI & Data",
    bio:        "Transforms business data into actionable insights using predictive analytics, machine learning, and AI-powered automation.",
    expertise:  ["Python", "TensorFlow", "PowerBI", "ML"],
    initials:   "ET",
    color:      "#F59E0B",
  },
  {
    id:         6,
    name:       "Fatoumata Bah",
    role:       "AI/ML Engineer",
    category:   "AI & Data",
    bio:        "Designs and deploys machine learning models for African business contexts, with deep expertise in NLP and computer vision.",
    expertise:  ["PyTorch", "NLP", "Computer Vision", "MLOps"],
    initials:   "FB",
    color:      "#EC4899",
  },
  {
    id:         7,
    name:       "Georges Ateba",
    role:       "SEO Specialist",
    category:   "Digital Strategy",
    bio:        "Drives organic growth through technical SEO, content strategy, and search visibility optimization across African and global markets.",
    expertise:  ["Technical SEO", "Content Strategy", "Analytics", "SEM"],
    initials:   "GA",
    color:      "#14B8A6",
  },
  {
    id:         8,
    name:       "Hortense Nkomo",
    role:       "UX/UI Designer",
    category:   "Digital Strategy",
    bio:        "Creates compelling brand identities and visual experiences that resonate with African audiences while competing globally.",
    expertise:  ["Figma", "Brand Design", "UX Research", "Motion"],
    initials:   "HN",
    color:      "#F97316",
  },
];

// ── Team Card ─────────────────────────────────────────────────
const TeamCard = ({ member }) => {
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped]  = useState(false);

  return (
    <div
      data-reveal
      style={{
        opacity:    0,
        transform:  "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setFlipped(false); }}
        style={{
          position:     "relative",
          borderRadius: 16,
          overflow:     "hidden",
          background:   MY_COLORS.bgSurface,
          border:       `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
          transition:   "all 0.3s ease",
          transform:    hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow:    hovered ? `0 20px 48px rgba(0,0,0,0.4)` : "none",
          cursor:       "default",
        }}
      >

        {/* ── Top accent bar ── */}
        <div style={{
          height:     3,
          background: `linear-gradient(90deg, ${member.color}, transparent)`,
          opacity:    hovered ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }} />

        {/* ── Card body ── */}
        <div style={{ padding: "28px 24px 24px" }}>

          {/* Avatar + name row */}
          <div style={{
            display:     "flex",
            alignItems:  "center",
            gap:         16,
            marginBottom: 20,
          }}>

            {/* Avatar */}
            <div style={{
              width:          56,
              height:         56,
              borderRadius:   "50%",
              background:     `linear-gradient(135deg, ${member.color}22, ${member.color}44)`,
              border:         `2px solid ${member.color}44`,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              flexShrink:     0,
              transition:     "all 0.3s ease",
              boxShadow:      hovered ? `0 0 20px ${member.color}44` : "none",
            }}>
              <span style={{
                fontFamily:  FONTS.primary,
                fontSize:    FONTS.size.base,
                fontWeight:  FONTS.weight.bold,
                color:       member.color,
                letterSpacing: "-0.02em",
              }}>
                {member.initials}
              </span>
            </div>

            {/* Name + role */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily:    FONTS.primary,
                fontSize:      FONTS.size.base,
                fontWeight:    FONTS.weight.bold,
                letterSpacing: FONTS.tracking.tight,
                color:         MY_COLORS.textPrimary,
                marginBottom:  2,
                whiteSpace:    "nowrap",
                overflow:      "hidden",
                textOverflow:  "ellipsis",
              }}>
                {member.name}
              </div>
              <div style={{
                fontFamily:  FONTS.secondary,
                fontSize:    FONTS.size.xs,
                fontWeight:  FONTS.weight.medium,
                color:       member.color,
                whiteSpace:  "nowrap",
                overflow:    "hidden",
                textOverflow:"ellipsis",
              }}>
                {member.role}
              </div>
            </div>

            {/* LinkedIn icon */}
            <a
              href="#"
              style={{
                width:          30,
                height:         30,
                borderRadius:   8,
                background:     hovered ? MY_COLORS.orangeDim : "transparent",
                border:         `1px solid ${hovered ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                color:          hovered ? MY_COLORS.orange : MY_COLORS.textMuted,
                textDecoration: "none",
                transition:     "all 0.2s ease",
                flexShrink:     0,
              }}
              onClick={e => e.preventDefault()}
            >
              <LinkedInIcon />
            </a>
          </div>

          {/* Bio */}
          <p style={{
            fontFamily:   FONTS.secondary,
            fontSize:     FONTS.size.sm,
            fontWeight:   FONTS.weight.regular,
            lineHeight:   FONTS.leading.relaxed,
            color:        MY_COLORS.textSecondary,
            margin:       "0 0 20px 0",
          }}>
            {member.bio}
          </p>

          {/* Expertise tags */}
          <div style={{
            display:   "flex",
            flexWrap:  "wrap",
            gap:       6,
          }}>
            {member.expertise.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily:    FONTS.primary,
                  fontSize:      10,
                  fontWeight:    FONTS.weight.bold,
                  letterSpacing: FONTS.tracking.wider,
                  textTransform: "uppercase",
                  color:         hovered ? member.color : MY_COLORS.textMuted,
                  background:    hovered ? `${member.color}15` : MY_COLORS.bgSurfaceHover,
                  border:        `1px solid ${hovered ? `${member.color}30` : MY_COLORS.border}`,
                  padding:       "3px 8px",
                  borderRadius:  4,
                  transition:    "all 0.3s ease",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// TeamSection Component
// ══════════════════════════════════════════════════════════════
const TeamSection = () => {
  const sectionRef               = useScrollReveal(0.05);
  const [activeCategory, setActive] = useState("All");

  const filtered = activeCategory === "All"
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter(m => m.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      style={{
        position:   "relative",
        background: MY_COLORS.bgBase,
        padding:    "100px 0",
        overflow:   "hidden",
      }}
    >

      {/* ── Background glow top right ── */}
      <div style={{
        position:      "absolute",
        top:           -200,
        right:         -200,
        width:         700,
        height:        700,
        borderRadius:  "50%",
        background:    `radial-gradient(circle, ${MY_COLORS.orangeSection} 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />

      {/* ── Grid texture ── */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
        `,
        backgroundSize:  "60px 60px",
        pointerEvents:   "none",
      }} />

      <div style={{
        maxWidth: 1280,
        margin:   "0 auto",
        padding:  "0 40px",
        position: "relative",
      }}>

        {/* ── Section header ── */}
        <div style={{
          display:        "flex",
          alignItems:     "flex-end",
          justifyContent: "space-between",
          marginBottom:   48,
          flexWrap:       "wrap",
          gap:            24,
        }}>

          <div>
            {/* Eyebrow */}
            <div
              data-reveal
              style={{
                display:      "inline-flex",
                alignItems:   "center",
                gap:          10,
                marginBottom: 20,
                opacity:      0,
                transform:    "translateY(20px)",
                transition:   "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <span style={{
                width: 28, height: 2,
                borderRadius: 9999,
                background:   MY_COLORS.gradientOrange,
              }} />
              <span style={{
                fontFamily:    FONTS.primary,
                fontSize:      FONTS.size.xs,
                fontWeight:    FONTS.weight.bold,
                letterSpacing: FONTS.tracking.widest,
                textTransform: "uppercase",
                color:         MY_COLORS.orange,
              }}>
                The People Behind It
              </span>
            </div>

            {/* Title */}
            <h2
              data-reveal
              style={{
                fontFamily:    FONTS.primary,
                fontSize:      "clamp(32px, 3.5vw, 48px)",
                fontWeight:    FONTS.weight.extrabold,
                letterSpacing: FONTS.tracking.tight,
                lineHeight:    FONTS.leading.snug,
                color:         MY_COLORS.textPrimary,
                margin:        "0 0 12px 0",
                opacity:       0,
                transform:     "translateY(20px)",
                transition:    "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              Meet The{" "}
              <span style={{
                color:      MY_COLORS.orange,
                textShadow: `0 0 30px ${MY_COLORS.orangeGlow}`,
              }}>
                Team
              </span>
            </h2>

            <p
              data-reveal
              style={{
                fontFamily:  FONTS.secondary,
                fontSize:    FONTS.size.base,
                color:       MY_COLORS.textMuted,
                margin:      0,
                opacity:     0,
                transform:   "translateY(20px)",
                transition:  "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              Expert specialists driving digital transformation across Africa.
            </p>
          </div>

          {/* Category filter pills */}
          <div
            data-reveal
            style={{
              display:   "flex",
              gap:       8,
              flexWrap:  "wrap",
              opacity:   0,
              transform: "translateY(20px)",
              transition:"opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    fontFamily:    FONTS.primary,
                    fontSize:      FONTS.size.xs,
                    fontWeight:    FONTS.weight.semibold,
                    letterSpacing: FONTS.tracking.wide,
                    padding:       "8px 16px",
                    borderRadius:  9999,
                    border:        `1px solid ${isActive ? MY_COLORS.orange : MY_COLORS.border}`,
                    background:    isActive ? MY_COLORS.orangeDim : "transparent",
                    color:         isActive ? MY_COLORS.orange : MY_COLORS.textMuted,
                    cursor:        "pointer",
                    transition:    "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = MY_COLORS.orangeBorder;
                      e.currentTarget.style.color       = MY_COLORS.textSecondary;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = MY_COLORS.border;
                      e.currentTarget.style.color       = MY_COLORS.textMuted;
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* ── Team grid ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap:                 20,
        }}>
          {filtered.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* ── Bottom note ── */}
        <div
          data-reveal
          style={{
            textAlign:   "center",
            marginTop:   48,
            opacity:     0,
            transform:   "translateY(20px)",
            transition:  "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p style={{
            fontFamily:  FONTS.secondary,
            fontSize:    FONTS.size.sm,
            color:       MY_COLORS.textMuted,
            margin:      "0 0 16px 0",
          }}>
            Our team is growing — we're always looking for exceptional talent.
          </p>
          <a
            href="/contact"
            style={{
              fontFamily:    FONTS.primary,
              fontSize:      FONTS.size.sm,
              fontWeight:    FONTS.weight.semibold,
              letterSpacing: FONTS.tracking.wide,
              color:         MY_COLORS.orange,
              textDecoration:"none",
              display:       "inline-flex",
              alignItems:    "center",
              gap:           6,
              transition:    "gap 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.gap = "10px"}
            onMouseLeave={e => e.currentTarget.style.gap = "6px"}
          >
            Join Our Team →
          </a>
        </div>

      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 1024px) {
          .team-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .team-header { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 480px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </section>
  );
};

export default TeamSection;