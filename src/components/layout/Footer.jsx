/**
 * Footer Component — Fully Responsive
 * AlphaWaves brand system
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts";
// import { siteConfig } from "../../config/site.config";

// ── useWindowWidth hook ───────────────────────────────────────
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);
  return width;
};

// ── Logo mark ─────────────────────────────────────────────────
const LogoMark = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
    <polyline
      points="2,16 7,8 12,22 17,10 22,20 27,12 30,16"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

// ── Social icons ──────────────────────────────────────────────
const LinkedInIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ── Footer data ───────────────────────────────────────────────
const footerLinks = [
  {
    title: "Services",
    links: [
      {
        label: "Custom Software",
        path: "/services/custom-software-development",
      },
      { label: "AI & Analytics", path: "/services/ai-business-intelligence" },
      { label: "Digital Marketing", path: "/services/digital-marketing-seo" },
      {
        label: "Cloud & DevOps",
        path: "/services/cloud-infrastructure-devops",
      },
      { label: "Mobile Apps", path: "/services/mobile-first-solutions" },
      { label: "Payment Systems", path: "/services/payment-infrastructure" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Portfolio", path: "/portfolio" },
      { label: "Blog", path: "/blog" },
      { label: "FAQ", path: "/faq" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms & Conditions", path: "/terms" },
      { label: "Cookie Policy", path: "#" },
    ],
  },
];

const socialLinks = [
  { label: "LinkedIn", icon: <LinkedInIcon />, href: "#" },
  { label: "Twitter", icon: <TwitterIcon />, href: "#" },
  { label: "GitHub", icon: <GitHubIcon />, href: "#" },
  { label: "WhatsApp", icon: <WhatsAppIcon />, href: "#" },
];

// ── Collapsible section (mobile) ──────────────────────────────
const CollapsibleSection = ({ title, links, isMobile }) => {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(null);

  if (!isMobile) {
    return (
      <div>
        <h3
          style={{
            fontFamily: FONTS.primary,
            fontSize: FONTS.size.xs,
            fontWeight: FONTS.weight.bold,
            letterSpacing: FONTS.tracking.widest,
            textTransform: "uppercase",
            color: MY_COLORS.orange,
            margin: "0 0 20px 0",
          }}
        >
          {title}
        </h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                style={{
                  fontFamily: FONTS.secondary,
                  fontSize: FONTS.size.sm,
                  fontWeight: FONTS.weight.regular,
                  color:
                    hov === link.label
                      ? MY_COLORS.textPrimary
                      : MY_COLORS.textSecondary,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={() => setHov(link.label)}
                onMouseLeave={() => setHov(null)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Mobile: collapsible accordion
  return (
    <div style={{ borderBottom: `1px solid ${MY_COLORS.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.primary,
            fontSize: FONTS.size.xs,
            fontWeight: FONTS.weight.bold,
            letterSpacing: FONTS.tracking.widest,
            textTransform: "uppercase",
            color: MY_COLORS.orange,
          }}
        >
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
            flexShrink: 0,
          }}
        >
          <path
            d="M3 6L8 11L13 6"
            stroke={MY_COLORS.textMuted}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? "400px" : "0px",
          transition: "max-height 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: "0 0 16px 0",
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                style={{
                  fontFamily: FONTS.secondary,
                  fontSize: FONTS.size.base,
                  color: MY_COLORS.textSecondary,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: MY_COLORS.orange,
                    flexShrink: 0,
                  }}
                />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── Main Footer ───────────────────────────────────────────────
const Footer = () => {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const currentYear = new Date().getFullYear();

  const outerPadding = isMobile
    ? "48px 20px 0"
    : isTablet
      ? "56px 32px 0"
      : "64px 44px 0";
  const gridColumns = isMobile
    ? "1fr"
    : isTablet
      ? "1fr 1fr"
      : "2fr 1fr 1fr 1fr";

  return (
   <footer style={{
  background:           MY_COLORS.bgGlassScrolled,
  backdropFilter:       "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  borderTop:            `1px solid ${MY_COLORS.border}`,
  fontFamily:           FONTS.primary,
}}>
      {/* ── Main body ── */}
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: outerPadding }}>
        {/* ── Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridColumns,
            gap: isMobile ? 0 : isTablet ? 40 : 48,
            marginBottom: isMobile ? 0 : 64,
          }}
        >
          {/* ── Brand column ── */}
          <div style={{ paddingBottom: isMobile ? 32 : 0 }}>
            {/* Logo */}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 9,
                  background: MY_COLORS.gradientOrange,
                  boxShadow: `0 0 20px ${MY_COLORS.orangeGlow}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <LogoMark />
              </div>
              <div style={{ lineHeight: 1 }}>
                <div
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: 18,
                    fontWeight: FONTS.weight.extrabold,
                    letterSpacing: FONTS.tracking.tight,
                    textTransform: "uppercase",
                    color: MY_COLORS.textPrimary,
                  }}
                >
                  ALPHA<span style={{ color: MY_COLORS.orange }}>WAVES</span>
                </div>
                <div
                  style={{
                    fontFamily: FONTS.primary,
                    fontSize: 9,
                    fontWeight: FONTS.weight.semibold,
                    letterSpacing: FONTS.tracking.wider,
                    textTransform: "uppercase",
                    color: MY_COLORS.textMuted,
                    marginTop: 3,
                  }}
                >
                  Tech Agency
                </div>
              </div>
            </Link>

            {/* Tagline */}
            <p
              style={{
                fontFamily: FONTS.secondary,
                fontSize: FONTS.size.base,
                fontWeight: FONTS.weight.regular,
                color: MY_COLORS.textSecondary,
                lineHeight: FONTS.leading.relaxed,
                marginBottom: 24,
                maxWidth: isMobile ? "100%" : 280,
              }}
            >
              Architecting Africa's digital future — enterprise-grade technology
              for businesses across African and global markets.
            </p>

            {/* Contact info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 28,
              }}
            >
              {[
                {
                  label: "contact@alphawaves.tech",
                  href: "mailto:contact@alphawaves.tech",
                },
                { label: "+237 XXX XXX XXX", href: "tel:+237000000000" },
                { label: "Douala, Cameroon", href: null },
              ].map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontFamily: FONTS.secondary,
                        fontSize: FONTS.size.sm,
                        color: MY_COLORS.textSecondary,
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = MY_COLORS.orange)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = MY_COLORS.textSecondary)
                      }
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: FONTS.secondary,
                        fontSize: FONTS.size.sm,
                        color: MY_COLORS.textMuted,
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: MY_COLORS.bgSurface, // ✅ FIX 2
                    border: `1px solid ${MY_COLORS.border}`,
                    color: MY_COLORS.textMuted,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = MY_COLORS.orangeDim;
                    e.currentTarget.style.borderColor = MY_COLORS.orangeBorder;
                    e.currentTarget.style.color = MY_COLORS.orange;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = MY_COLORS.bgSurface; // ✅ FIX 3
                    e.currentTarget.style.borderColor = MY_COLORS.border;
                    e.currentTarget.style.color = MY_COLORS.textMuted;
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {isTablet && <div style={{ height: 8 }} />}
          </div>

          {/* ── Link columns ── */}
          {isMobile ? (
            <div style={{ borderTop: `1px solid ${MY_COLORS.border}` }}>
              {footerLinks.map((section) => (
                <CollapsibleSection
                  key={section.title}
                  title={section.title}
                  links={section.links}
                  isMobile={true}
                />
              ))}
            </div>
          ) : (
            footerLinks.map((section) => (
              <CollapsibleSection
                key={section.title}
                title={section.title}
                links={section.links}
                isMobile={false}
              />
            ))
          )}
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: `1px solid ${MY_COLORS.border}`,
            padding: isMobile ? "20px 0" : "24px 0",
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            gap: isMobile ? 12 : 16,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.secondary,
              fontSize: FONTS.size.xs,
              color: MY_COLORS.textMuted,
              margin: 0,
            }}
          >
            © {currentYear} AlphaWaves. All rights reserved. Built in Cameroon
            🇨🇲
          </p>
          <div
            style={{
              display: "flex",
              gap: isMobile ? 16 : 24,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Privacy", path: "/privacy-policy" },
              { label: "Terms", path: "/terms" },
              { label: "Sitemap", path: "#" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.path}
                style={{
                  fontFamily: FONTS.secondary,
                  fontSize: FONTS.size.xs,
                  color: MY_COLORS.textMuted,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = MY_COLORS.textPrimary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = MY_COLORS.textMuted)
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
