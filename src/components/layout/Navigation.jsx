import { useState, useEffect, useRef } from "react";

const navItems = [
  { label: "Home",      path: "/"          },
  { label: "About",     path: "/about"     },
  { label: "Services",  path: "/services"  },
  { label: "Portfolio", path: "/portfolio" },
  { label: "FAQ",       path: "/faq"       },
  { label: "Contact",   path: "/contact"   },
];

export default function Navbar() {
  const [pathname, setPath]         = useState("/");
  // eslint-disable-next-line no-unused-vars
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeRect, setActiveRect] = useState(null);
  const navRef   = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = linkRefs.current[pathname];
    if (el && navRef.current) {
      const navRect  = navRef.current.getBoundingClientRect();
      const linkRect = el.getBoundingClientRect();
      setActiveRect({ left: linkRect.left - navRect.left, width: linkRect.width });
    }
  }, [pathname]);

  const navigate = (path) => { setPath(path); setMobileOpen(false); };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "system-ui,sans-serif" }}>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(13,13,13,0.95)" : "rgba(13,13,13,0.75)",
        backdropFilter: "blur(18px)",
        borderBottom: scrolled ? "1px solid rgba(232,117,10,0.2)" : "1px solid rgba(255,255,255,0.06)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.6)" : "none",
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

            {/* Logo */}
            <button onClick={() => navigate("/")} style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", cursor:"pointer" }}>
              <div style={{
                width:32, height:32, borderRadius:8,
                background: "linear-gradient(135deg,#E8750A,#f5a623)",
                boxShadow: "0 0 18px rgba(232,117,10,0.5)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12 Q6 4 10 12 Q14 20 18 12 Q20 8 22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize:18, fontWeight:700, color:"white", letterSpacing:"-0.3px" }}>
                Alpha<span style={{ color:"#E8750A" }}>Waves</span>
              </span>
            </button>

            {/* Desktop nav */}
            <nav ref={navRef} style={{ display:"flex", alignItems:"center", gap:2, position:"relative" }}>
              {/* Sliding underline */}
              {activeRect && (
                <span style={{
                  position:"absolute", bottom:2,
                  left: activeRect.left, width: activeRect.width,
                  height:2, borderRadius:9999,
                  background: "linear-gradient(90deg,#E8750A,#f5a623)",
                  boxShadow: "0 0 8px rgba(232,117,10,0.8)",
                  transition: "left 0.35s cubic-bezier(.4,0,.2,1), width 0.35s cubic-bezier(.4,0,.2,1)",
                }} />
              )}
              {navItems.map(item => {
                const active = pathname === item.path;
                return (
                  <button key={item.path}
                    ref={el => linkRefs.current[item.path] = el}
                    onClick={() => navigate(item.path)}
                    style={{
                      background:"none", border:"none", cursor:"pointer",
                      padding:"8px 16px", borderRadius:6,
                      fontSize:14, fontWeight: active ? 600 : 400,
                      color: active ? "#E8750A" : "rgba(240,237,232,0.8)",
                      transition:"color 0.2s ease",
                    }}
                    onMouseEnter={e => !active && (e.target.style.color="#fff")}
                    onMouseLeave={e => !active && (e.target.style.color="rgba(240,237,232,0.8)")}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Status badge */}
            <div style={{
              display:"flex", alignItems:"center", gap:6,
              padding:"4px 12px", borderRadius:999,
              background:"rgba(232,117,10,0.1)", border:"1px solid rgba(232,117,10,0.25)"
            }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", animation:"pulse 2s infinite" }} />
              <span style={{ fontSize:12, color:"#d1d5db", fontWeight:500 }}>Available</span>
            </div>

          </div>
        </div>
      </header>

      {/* Demo content */}
      <div style={{ paddingTop: 64 }}>
        <div style={{ maxWidth:800, margin:"0 auto", padding:"100px 32px", textAlign:"center" }}>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#E8750A", marginBottom:16 }}>Currently viewing</p>
          <h1 style={{ fontSize:56, fontWeight:800, color:"white", marginBottom:16 }}>
            {navItems.find(n => n.path === pathname)?.label}
          </h1>
          <p style={{ color:"#6b7280", fontSize:16 }}>Click nav links to see the animated orange indicator slide between them.</p>
          <div style={{ marginTop:48, padding:20, borderRadius:16, border:"1px solid rgba(255,255,255,0.08)", color:"#4b5563", fontSize:13 }}>
            💡 Scroll down to see blur + border glow activate on the navbar
          </div>
          <div style={{ height:"120vh" }} />
        </div>
      </div>

    </div>
  );
}