import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ── Color System ──────────────────────────────────────────────
const MY_COLORS = {
  orange:           "#E8750A",
  orangeLight:      "#f5a623",
  orangeGlow:       "rgba(232,117,10,0.45)",
  orangeDim:        "rgba(232,117,10,0.12)",
  orangeBorder:     "rgba(232,117,10,0.25)",
  dark:             "rgba(13,13,13,0.82)",
  surface:          "#161616",
  surfaceHover:     "rgba(255,255,255,0.05)",
  bgGlass:          "rgba(13,13,13,0.82)",
  bgGlassScrolled:  "rgba(10,10,10,0.97)",
  textPrimary:      "#FFFFFF",
  textSecondary:    "rgba(240,237,232,0.82)",
  textMuted:        "rgba(240,237,232,0.38)",
  border:           "rgba(255,255,255,0.07)",
  borderScrolled:   "rgba(232,117,10,0.22)",
};

// ── Supported Languages ───────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "EN", fullLabel: "English",  flag: "🇬🇧" },
  { code: "fr", label: "FR", fullLabel: "Français", flag: "🇫🇷" },
];

// ── Nav items (keys match translation.json) ───────────────────
const NAV_ITEMS = [
  { key: "nav.home",      path: "/"          },
  { key: "nav.about",     path: "/about"     },
  { key: "nav.services",  path: "/services"  },
  { key: "nav.portfolio", path: "/portfolio" },
  { key: "nav.blog",      path: "/blog"      },
  { key: "nav.faq",       path: "/faq"       },
  { key: "nav.contact",   path: "/contact"   },
];

// ── Icons ─────────────────────────────────────────────────────
const WaveIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M2 12 Q5 5 8 12 Q11 19 14 12 Q17 5 20 12 Q21.5 15.5 23 12"
      stroke="white" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const HamburgerIcon = ({ isOpen }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ display: "block" }}>
    <line
      x1="3" y1={isOpen ? "11" : "5"} x2="19" y2={isOpen ? "11" : "5"}
      stroke="white" strokeWidth="2" strokeLinecap="round"
      style={{
        transformOrigin: "11px 11px",
        transform:  isOpen ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
      }}
    />
    <line
      x1="3" y1="11" x2="19" y2="11"
      stroke="white" strokeWidth="2" strokeLinecap="round"
      style={{ opacity: isOpen ? 0 : 1, transition: "opacity 0.2s ease" }}
    />
    <line
      x1="3" y1={isOpen ? "11" : "17"} x2="19" y2={isOpen ? "11" : "17"}
      stroke="white" strokeWidth="2" strokeLinecap="round"
      style={{
        transformOrigin: "11px 11px",
        transform:  isOpen ? "rotate(-45deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
      }}
    />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    width="10" height="10" viewBox="0 0 10 10" fill="none"
    style={{
      transform:  open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.22s ease",
    }}
  >
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── useWindowWidth hook ───────────────────────────────────────
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);
  return width;
};

// ── Language Switcher (Desktop dropdown) ─────────────────────
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen]         = useState(false);
  const [hovered, setHovered]   = useState(null);
  const ref                     = useRef(null);
  const current                 = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        aria-expanded={open}
        style={{
          display:        "flex",
          alignItems:     "center",
          gap:            6,
          padding:        "7px 11px",
          borderRadius:   8,
          border:         `1px solid ${open ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
          background:     open ? MY_COLORS.orangeDim : "transparent",
          cursor:         "pointer",
          color:          open ? MY_COLORS.orange : MY_COLORS.textSecondary,
          fontSize:       13,
          fontWeight:     550,
          fontFamily:     "system-ui, sans-serif",
          letterSpacing:  "0.3px",
          transition:     "all 0.2s ease",
          whiteSpace:     "nowrap",
        }}
        onMouseEnter={e => {
          if (!open) {
            e.currentTarget.style.borderColor = MY_COLORS.orangeBorder;
            e.currentTarget.style.color       = "#fff";
            e.currentTarget.style.background  = MY_COLORS.surfaceHover;
          }
        }}
        onMouseLeave={e => {
          if (!open) {
            e.currentTarget.style.borderColor = MY_COLORS.border;
            e.currentTarget.style.color       = MY_COLORS.textSecondary;
            e.currentTarget.style.background  = "transparent";
          }
        }}
      >
        <span style={{ fontSize: 15, lineHeight: 1 }}>{current.flag}</span>
        <span>{current.label}</span>
        <ChevronIcon open={open} />
      </button>

      {/* Dropdown */}
      <div style={{
        position:      "absolute",
        top:           "calc(100% + 8px)",
        right:         0,
        minWidth:      148,
        background:    "#111111",
        border:        `1px solid ${MY_COLORS.border}`,
        borderRadius:  10,
        boxShadow:     "0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        overflow:      "hidden",
        opacity:       open ? 1 : 0,
        transform:     open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)",
        pointerEvents: open ? "auto" : "none",
        transition:    "opacity 0.2s ease, transform 0.2s cubic-bezier(.4,0,.2,1)",
        zIndex:        200,
      }}>
        {/* Dropdown header label */}
        <div style={{
          padding:       "9px 14px 7px",
          fontSize:      10,
          fontWeight:    600,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          color:         MY_COLORS.textMuted,
          fontFamily:    "system-ui, sans-serif",
          borderBottom:  `1px solid ${MY_COLORS.border}`,
        }}>
          Language
        </div>

        {LANGUAGES.map(lang => {
          const isActive = i18n.language === lang.code;
          const isHov    = hovered === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              onMouseEnter={() => setHovered(lang.code)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "space-between",
                width:          "100%",
                padding:        "10px 14px",
                background:     isActive
                  ? MY_COLORS.orangeDim
                  : isHov
                  ? MY_COLORS.surfaceHover
                  : "transparent",
                border:         "none",
                borderLeft:     `2px solid ${isActive ? MY_COLORS.orange : "transparent"}`,
                cursor:         "pointer",
                textAlign:      "left",
                transition:     "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ fontSize: 16, lineHeight: 1 }}>{lang.flag}</span>
                <span style={{
                  fontSize:   13,
                  fontWeight: isActive ? 600 : 430,
                  color:      isActive ? MY_COLORS.orange : isHov ? "#fff" : MY_COLORS.textSecondary,
                  fontFamily: "system-ui, sans-serif",
                  transition: "color 0.15s ease",
                }}>
                  {lang.fullLabel}
                </span>
              </div>
              {/* Active checkmark */}
              {isActive && (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5L5.2 9.5L11 3.5"
                    stroke={MY_COLORS.orange}
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ── Mobile Language Toggle (inline row) ──────────────────────
const MobileLangToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  };

  return (
    <div style={{
      display:       "flex",
      alignItems:    "center",
      gap:           6,
      padding:       "12px 20px",
      borderTop:     `1px solid ${MY_COLORS.border}`,
    }}>
      <span style={{
        fontSize:      11,
        fontWeight:    600,
        letterSpacing: "0.7px",
        textTransform: "uppercase",
        color:         MY_COLORS.textMuted,
        fontFamily:    "system-ui, sans-serif",
        marginRight:   6,
      }}>
        Lang:
      </span>
      {LANGUAGES.map(lang => {
        const isActive = i18n.language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            style={{
              display:       "flex",
              alignItems:    "center",
              gap:           5,
              padding:       "6px 12px",
              borderRadius:  7,
              border:        `1px solid ${isActive ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
              background:    isActive ? MY_COLORS.orangeDim : "transparent",
              cursor:        "pointer",
              fontSize:      13,
              fontWeight:    isActive ? 650 : 430,
              color:         isActive ? MY_COLORS.orange : MY_COLORS.textSecondary,
              fontFamily:    "system-ui, sans-serif",
              transition:    "all 0.18s ease",
            }}
          >
            <span style={{ fontSize: 14 }}>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ── Main Navbar ───────────────────────────────────────────────
const Navbar = () => {
  const { t }                      = useTranslation();
  const location                   = useLocation();
  const width                      = useWindowWidth();
  const isMobile                   = width < 768;
  const isTablet                   = width >= 768 && width < 1024;

  const [scrolled,  setScrolled]   = useState(false);
  const [hovered,   setHovered]    = useState(null);
  const [indicator, setIndicator]  = useState({ left: 0, width: 0, ready: false });
  const [menuOpen,  setMenuOpen]   = useState(false);
  const [itemHover, setItemHover]  = useState(null);
  const navRef   = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (isMobile || isTablet) {
      setIndicator({ left: 0, width: 0, ready: false });
      return;
    }
    const target = hovered ?? location.pathname;
    const el = linkRefs.current[target];
    if (el && navRef.current) {
      const nr = navRef.current.getBoundingClientRect();
      const lr = el.getBoundingClientRect();
      setIndicator({ left: lr.left - nr.left, width: lr.width, ready: true });
    }
  }, [location.pathname, hovered, isMobile, isTablet]);

  const headerPadding = isMobile ? "0 16px" : isTablet ? "0 24px" : "0 40px";

  return (
    <>
      {/* ══════════════ HEADER ══════════════ */}
      <header style={{
        position:             "fixed",
        inset:                "0 0 auto 0",
        zIndex:               100,
        background:           scrolled
          ? "#000000"
          : `radial-gradient(ellipse 80% 100% at 50% 100%, rgba(232,117,10,0.06) 0%, transparent 70%), linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)`,
        backdropFilter:       "none",
        WebkitBackdropFilter: "none",
        borderBottom:         `1px solid ${scrolled ? MY_COLORS.borderScrolled : MY_COLORS.border}`,
        boxShadow:            scrolled ? "0 8px 40px rgba(0,0,0,0.65)" : "none",
        transition:           "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}>

        {/* Top orange accent line */}
        <div style={{
          position:   "absolute", top: 0, left: 0, right: 0,
          height:     2, pointerEvents: "none",
          background: `linear-gradient(90deg, transparent 0%, ${MY_COLORS.orange} 35%, ${MY_COLORS.orangeLight} 65%, transparent 100%)`,
          opacity:    scrolled ? 0.6 : 0,
          transition: "opacity 0.5s ease",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: headerPadding }}>
          <div style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            height:         isMobile ? 62 : 70,
          }}>

            {/* ── LOGO ── */}
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div
                style={{
                  width: isMobile ? 34 : 38, height: isMobile ? 34 : 38,
                  borderRadius: 10, flexShrink: 0,
                  background: `linear-gradient(135deg, ${MY_COLORS.orange} 0%, ${MY_COLORS.orangeLight} 100%)`,
                  boxShadow:  `0 0 22px ${MY_COLORS.orangeGlow}`,
                  display:    "flex", alignItems: "center", justifyContent: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(232,117,10,0.7)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = `0 0 22px ${MY_COLORS.orangeGlow}`;
                }}
              >
                <WaveIcon />
              </div>
              <span style={{
                fontSize:      isMobile ? 18 : 20,
                fontWeight:    750,
                letterSpacing: "-0.5px",
                color:         "#ffffff",
                fontFamily:    "system-ui, sans-serif",
              }}>
                Alpha
                <span style={{ color: MY_COLORS.orange, textShadow: `0 0 20px ${MY_COLORS.orangeGlow}` }}>
                  Waves
                </span>
              </span>
            </Link>

            {/* ── DESKTOP NAV LINKS ── */}
            {!isMobile && !isTablet && (
              <nav ref={navRef} style={{ display: "flex", alignItems: "center", gap: 4, position: "relative" }}>
                {indicator.ready && (
                  <span style={{
                    position:      "absolute",
                    bottom:        6,
                    left:          indicator.left,
                    width:         indicator.width,
                    height:        2,
                    borderRadius:  9999,
                    pointerEvents: "none",
                    background:    `linear-gradient(90deg, ${MY_COLORS.orange}, ${MY_COLORS.orangeLight})`,
                    boxShadow:     "0 0 10px rgba(232,117,10,1), 0 0 24px rgba(232,117,10,0.4)",
                    transition:    "left 0.28s cubic-bezier(.4,0,.2,1), width 0.28s cubic-bezier(.4,0,.2,1)",
                  }} />
                )}
                {NAV_ITEMS.map((item) => {
                  const isActive  = location.pathname === item.path;
                  const isHovered = hovered === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      ref={(el) => (linkRefs.current[item.path] = el)}
                      onMouseEnter={() => setHovered(item.path)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        textDecoration: "none",
                        padding:        "10px 14px",
                        borderRadius:   8,
                        fontSize:       14,
                        fontWeight:     isActive ? 650 : 430,
                        fontFamily:     "system-ui, sans-serif",
                        letterSpacing:  isActive ? "-0.1px" : "0px",
                        color:          isActive ? MY_COLORS.orange : isHovered ? "#ffffff" : MY_COLORS.textSecondary,
                        background:     isHovered && !isActive ? MY_COLORS.surfaceHover : "transparent",
                        transition:     "color 0.18s ease, background 0.18s ease",
                      }}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}
              </nav>
            )}

            {/* ── RIGHT SIDE ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

              {/* Language switcher — desktop only */}
              {!isMobile && !isTablet && <LanguageSwitcher />}

              {/* Get Started — desktop only */}
              {!isMobile && !isTablet && (
                <Link
                  to="/contact"
                  style={{
                    textDecoration: "none",
                    padding:        "9px 20px",
                    borderRadius:   8,
                    fontSize:       14,
                    fontWeight:     600,
                    color:          "#ffffff",
                    background:     `linear-gradient(135deg, ${MY_COLORS.orange}, ${MY_COLORS.orangeLight})`,
                    boxShadow:      "0 0 18px rgba(232,117,10,0.35)",
                    fontFamily:     "system-ui, sans-serif",
                    transition:     "box-shadow 0.25s ease, transform 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 0 28px rgba(232,117,10,0.65)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "0 0 18px rgba(232,117,10,0.35)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {t("nav.getStarted")}
                </Link>
              )}

              {/* Hamburger — mobile + tablet */}
              {(isMobile || isTablet) && (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  style={{
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    width:           42,
                    height:          42,
                    borderRadius:    10,
                    border:          `1px solid ${menuOpen ? MY_COLORS.orangeBorder : MY_COLORS.border}`,
                    background:      menuOpen ? MY_COLORS.orangeDim : "transparent",
                    cursor:          "pointer",
                    transition:      "border-color 0.25s ease, background 0.25s ease",
                    flexShrink:      0,
                  }}
                >
                  <HamburgerIcon isOpen={menuOpen} />
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ══════════════ OVERLAY ══════════════ */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position:       "fixed",
          inset:          0,
          zIndex:         98,
          background:     "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          opacity:        menuOpen ? 1 : 0,
          pointerEvents:  menuOpen ? "auto" : "none",
          transition:     "opacity 0.35s ease",
        }}
      />

      {/* ══════════════ DRAWER ══════════════ */}
      <div style={{
        position:      "fixed",
        top:           0,
        left:          0,
        bottom:        0,
        width:         isMobile ? "min(280px, 85vw)" : "300px",
        zIndex:        99,
        background:    "#0f0f0f",
        borderRight:   `1px solid ${MY_COLORS.border}`,
        boxShadow:     menuOpen ? "8px 0 60px rgba(0,0,0,0.8)" : "none",
        transform:     menuOpen ? "translateX(0)" : "translateX(-100%)",
        transition:    "transform 0.38s cubic-bezier(.4,0,.2,1)",
        display:       "flex",
        flexDirection: "column",
        overflowY:     "auto",
      }}>

        {/* Drawer Header */}
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 20px",
          height:         isMobile ? 62 : 70,
          borderBottom:   `1px solid ${MY_COLORS.border}`,
          flexShrink:     0,
        }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: `linear-gradient(135deg, ${MY_COLORS.orange}, ${MY_COLORS.orangeLight})`,
              boxShadow:  `0 0 18px ${MY_COLORS.orangeGlow}`,
              display:    "flex", alignItems: "center", justifyContent: "center",
            }}>
              <WaveIcon />
            </div>
            <span style={{ fontSize: 17, fontWeight: 750, letterSpacing: "-0.5px", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
              Alpha<span style={{ color: MY_COLORS.orange }}>Waves</span>
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: `1px solid ${MY_COLORS.border}`,
              background: "transparent", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: MY_COLORS.textMuted,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = MY_COLORS.orangeBorder;
              e.currentTarget.style.color       = MY_COLORS.orange;
              e.currentTarget.style.background  = MY_COLORS.orangeDim;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = MY_COLORS.border;
              e.currentTarget.style.color       = MY_COLORS.textMuted;
              e.currentTarget.style.background  = "transparent";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Get Started Button */}
        <div style={{ padding: "20px 20px 4px" }}>
          <Link
            to="/contact"
            style={{
              display:        "block",
              textAlign:      "center",
              textDecoration: "none",
              padding:        "13px 20px",
              borderRadius:   10,
              fontSize:       15,
              fontWeight:     650,
              color:          "#ffffff",
              background:     `linear-gradient(135deg, ${MY_COLORS.orange}, ${MY_COLORS.orangeLight})`,
              boxShadow:      "0 0 24px rgba(232,117,10,0.4)",
              fontFamily:     "system-ui, sans-serif",
              transition:     "box-shadow 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 0 32px rgba(232,117,10,0.65)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 0 24px rgba(232,117,10,0.4)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t("nav.getStarted")} →
          </Link>
        </div>

        {/* Divider */}
        <div style={{ margin: "16px 20px", height: 1, background: MY_COLORS.border, flexShrink: 0 }} />

        {/* Nav Links */}
        <nav style={{ padding: "0 10px", flex: 1 }}>
          {NAV_ITEMS.map((item, index) => {
            const isActive = location.pathname === item.path;
            const isHov    = itemHover === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setItemHover(item.path)}
                onMouseLeave={() => setItemHover(null)}
                style={{
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "space-between",
                  textDecoration:  "none",
                  padding:         "14px 16px",
                  borderRadius:    10,
                  fontSize:        15,
                  fontWeight:      isActive ? 650 : 430,
                  fontFamily:      "system-ui, sans-serif",
                  color:           isActive ? MY_COLORS.orange : isHov ? "#ffffff" : MY_COLORS.textSecondary,
                  background:      isActive ? MY_COLORS.orangeDim : isHov ? MY_COLORS.surfaceHover : "transparent",
                  borderLeft:      isActive ? `2px solid ${MY_COLORS.orange}` : "2px solid transparent",
                  transition:      "all 0.18s ease",
                  opacity:         menuOpen ? 1 : 0,
                  transform:       menuOpen ? "translateX(0)" : "translateX(-12px)",
                  transitionDelay: menuOpen
                    ? `${index * 0.05 + 0.15}s`
                    : `${(NAV_ITEMS.length - 1 - index) * 0.03}s`,
                }}
              >
                <span>{t(item.key)}</span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  style={{
                    opacity:    isActive || isHov ? 1 : 0,
                    transform:  isActive || isHov ? "translateX(0)" : "translateX(-4px)",
                    transition: "opacity 0.18s ease, transform 0.18s ease",
                  }}
                >
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                    stroke={isActive ? MY_COLORS.orange : "white"}
                    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Language Toggle */}
        <MobileLangToggle />

        {/* Drawer Footer */}
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${MY_COLORS.border}`, flexShrink: 0 }}>
          <p style={{
            fontFamily:    "system-ui, sans-serif",
            fontSize:      11,
            color:         MY_COLORS.textMuted,
            textAlign:     "center",
            letterSpacing: "0.5px",
          }}>
            © {new Date().getFullYear()} AlphaWaves · Built in Cameroon 🇨🇲
          </p>
        </div>

      </div>

      {/* Spacer */}
      <div style={{ height: isMobile ? 62 : 70 }} />
    </>
  );
};

export default Navbar;