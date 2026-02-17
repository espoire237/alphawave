import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { siteConfig } from "../../config/site.config";

const NAV_ITEMS = [
  { label: "Home",      path: "/"          },
  { label: "About",     path: "/about"     },
  { label: "Services",  path: "/services"  },
  { label: "Portfolio", path: "/portfolio" },
  { label: "FAQ",       path: "/faq"       },
  { label: "Contact",   path: "/contact"   },
];

const WaveIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M2 12 Q5 5 8 12 Q11 19 14 12 Q17 5 20 12 Q21.5 15.5 23 12"
      stroke="white" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const Navbar = () => {
  const location                  = useLocation();
  const [scrolled,  setScrolled]  = useState(false);
  const [hovered,   setHovered]   = useState(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const navRef   = useRef(null);
  const linkRefs = useRef({});

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Sliding indicator — follows hover, snaps to active when not hovering
  useEffect(() => {
    const target = hovered ?? location.pathname;
    const el = linkRefs.current[target];
    if (el && navRef.current) {
      const nr = navRef.current.getBoundingClientRect();
      const lr = el.getBoundingClientRect();
      setIndicator({ left: lr.left - nr.left, width: lr.width, ready: true });
    }
  }, [location.pathname, hovered]);

  return (
    <>
      <header
        style={{
          position: "fixed", inset: "0 0 auto 0", zIndex: 100,
          background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(13,13,13,0.82)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderBottom: `1px solid ${scrolled
            ? "rgba(232,117,10,0.22)"
            : "rgba(255,255,255,0.07)"}`,
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.65)" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Top orange accent line — fades in on scroll */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 2, pointerEvents: "none",
          background: "linear-gradient(90deg, transparent 0%, #E8750A 35%, #f5a623 65%, transparent 100%)",
          opacity: scrolled ? 0.6 : 0,
          transition: "opacity 0.5s ease",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 70,
          }}>

            {/* ── LOGO ── */}
            <Link
              to="/"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
            >
              {/* Icon mark */}
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "linear-gradient(135deg, #E8750A 0%, #f5a623 100%)",
                boxShadow: "0 0 22px rgba(232,117,10,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(232,117,10,0.7)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 0 22px rgba(232,117,10,0.45)";
                }}
              >
                <WaveIcon />
              </div>
              {/* Wordmark */}
              <span style={{
                fontSize: 20, fontWeight: 750,
                letterSpacing: "-0.5px", color: "#ffffff",
                fontFamily: "system-ui, sans-serif",
              }}>
                Alpha
                <span style={{
                  color: "#E8750A",
                  textShadow: "0 0 20px rgba(232,117,10,0.5)",
                }}>
                  Waves
                </span>
              </span>
            </Link>

            {/* ── NAV LINKS ── */}
            <nav
              ref={navRef}
              style={{
                display: "flex", alignItems: "center",
                gap: 4, position: "relative",
              }}
            >
              {/* Glowing sliding underline */}
              {indicator.ready && (
                <span style={{
                  position: "absolute",
                  bottom: 6,
                  left: indicator.left,
                  width: indicator.width,
                  height: 2,
                  borderRadius: 9999,
                  pointerEvents: "none",
                  background: "linear-gradient(90deg, #E8750A, #f5a623)",
                  boxShadow: "0 0 10px rgba(232,117,10,1), 0 0 24px rgba(232,117,10,0.4)",
                  transition: "left 0.28s cubic-bezier(.4,0,.2,1), width 0.28s cubic-bezier(.4,0,.2,1)",
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
                      padding: "10px 16px",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: isActive ? 650 : 430,
                      fontFamily: "system-ui, sans-serif",
                      letterSpacing: isActive ? "-0.1px" : "0px",
                      color: isActive
                        ? "#E8750A"
                        : isHovered
                          ? "#ffffff"
                          : "rgba(240,237,232,0.82)",
                      background: isHovered && !isActive
                        ? "rgba(255,255,255,0.05)"
                        : "transparent",
                      transition: "color 0.18s ease, background 0.18s ease",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

           {/* ── GET STARTED BUTTON ── */}
          <Link
            to="/contact"
            style={{
              textDecoration: "none",
              padding: "9px 20px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              background: "linear-gradient(135deg, #E8750A, #f5a623)",
              boxShadow: "0 0 18px rgba(232,117,10,0.35)",
              fontFamily: "system-ui, sans-serif",
              transition: "box-shadow 0.25s ease, transform 0.25s ease",
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

          </div>
        </div>

       
      </header>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div style={{ height: 70 }} />
    </>
  );
};

export default Navbar;