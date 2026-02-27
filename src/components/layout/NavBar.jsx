/* eslint-disable react-hooks/refs */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// ── Replace with your actual imports ─────────────────────────
// import { MY_COLORS } from "../../constants/colors.js";
// import { siteConfig } from "../../config/site.config";

const MY_COLORS = {
  orange:          "#E8750A",
  orangeLight:     "#f5a623",
  orangeGlow:      "rgba(232,117,10,0.45)",
  orangeDim:       "rgba(232,117,10,0.12)",
  orangeBorder:    "rgba(232,117,10,0.25)",
  dark:            "rgba(13,13,13,0.82)",
  surface:         "#161616",
  surfaceHover:    "rgba(255,255,255,0.05)",
  bgGlass:         "rgba(13,13,13,0.82)",
  bgGlassScrolled: "rgba(10,10,10,0.97)",
  textPrimary:     "#FFFFFF",
  textSecondary:   "rgba(240,237,232,0.82)",
  textMuted:       "rgba(240,237,232,0.38)",
  border:          "rgba(255,255,255,0.07)",
  borderScrolled:  "rgba(232,117,10,0.22)",
};

const NAV_ITEMS = [
  { label: "Home",      path: "/"          },
  { label: "About",     path: "/about"     },
  { label: "Services",  path: "/services"  },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Blog",      path: "/blog"      },
  { label: "FAQ",       path: "/faq"       },
  { label: "Contact",   path: "/contact"   },
];

// ── Wave icon ─────────────────────────────────────────────────
const WaveIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M2 12 Q5 5 8 12 Q11 19 14 12 Q17 5 20 12 Q21.5 15.5 23 12"
      stroke="white" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

// ── Hamburger → X icon ────────────────────────────────────────
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

// ── Main Navbar ───────────────────────────────────────────────
const Navbar = () => {
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
  const prevPathRef = useRef(location.pathname);

  // ── Scroll detection ──────────────────────────────────────
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Close drawer on route change ─────────────────────────
  if (prevPathRef.current !== location.pathname) {
    prevPathRef.current = location.pathname;
    if (menuOpen) setMenuOpen(false);
  }

  // ── Close drawer if resized to desktop ───────────────────
  if (!isMobile && !isTablet && menuOpen) setMenuOpen(false);

  // ── Lock body scroll when drawer open ────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Desktop sliding indicator ─────────────────────────────
  useEffect(() => {
    if (isMobile || isTablet) return;
    const target = hovered ?? location.pathname;
    const el = linkRefs.current[target];
    if (el && navRef.current) {
      const nr = navRef.current.getBoundingClientRect();
      const lr = el.getBoundingClientRect();
      setIndicator({ left: lr.left - nr.left, width: lr.width, ready: true });
    }
  }, [location.pathname, hovered, isMobile, isTablet]);

  // ── Responsive padding ───────────────────────────────────
  const headerPadding = isMobile ? "0 16px" : isTablet ? "0 24px" : "0 40px";

  return (
    <>
      {/* ══════════════ HEADER ══════════════ */}
      <header style={{
        position:             "fixed",
        inset:                "0 0 auto 0",
        zIndex:               100,
        background:           scrolled ? MY_COLORS.bgGlassScrolled : MY_COLORS.bgGlass,
        backdropFilter:       "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
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

            {/* ── DESKTOP NAV LINKS (hidden on mobile/tablet) ── */}
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
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            )}

            {/* ── RIGHT SIDE ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
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
                  Get Started
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
        background:    "#0d0d0d",
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
            Get Started →
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
                  transitionDelay: menuOpen ? `${index * 0.05 + 0.15}s` : "0s",
                }}
              >
                <span>{item.label}</span>
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

        {/* Drawer Footer */}
        <div style={{ padding: "20px", borderTop: `1px solid ${MY_COLORS.border}`, flexShrink: 0 }}>
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