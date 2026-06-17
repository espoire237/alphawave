/**
 * ScrollToTop Global Floating Back-to-Top Button
 * AlphaWaves brand Pyramid shape, orange glow, animated
 * Add once in App.jsx, works on every page automatically
 */

import { useState, useEffect } from "react";
import { MY_COLORS } from "../../constants/colors.js";

const ScrollToTop = () => {
  const [visible, setVisible]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [clicked, setClicked]   = useState(false);

  // Show after scrolling 320px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={scrollUp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Back to top"
        style={{
          // Position fixed bottom-right
          position:   "fixed",
          bottom:     32,
          right:      32,
          zIndex:     9999,

          // Size
          width:  52,
          height: 52,

          // Visibility fade in/out + slide up
          opacity:   visible ? 1 : 0,
          transform: visible
            ? (clicked ? "translateY(-6px) scale(0.92)" : hovered ? "translateY(-4px) scale(1.08)" : "translateY(0) scale(1)")
            : "translateY(16px) scale(0.85)",
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.4s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",

          // Shape circle container
          borderRadius: "50%",
          background:   "transparent",
          border:       "none",
          cursor:       "pointer",
          padding:      0,
          outline:      "none",

          // Outer glow ring
          boxShadow: hovered
            ? `0 0 0 1px rgba(232,117,10,0.5), 0 0 24px rgba(232,117,10,0.6), 0 0 48px rgba(232,117,10,0.3)`
            : `0 0 0 1px rgba(232,117,10,0.2), 0 0 16px rgba(232,117,10,0.25)`,
        }}
      >
        {/* Dark circle background */}
        <div style={{
          position:     "absolute",
          inset:        0,
          borderRadius: "50%",
          background:   "rgba(10,10,10,0.92)",
          backdropFilter: "blur(12px)",
          border:       `1px solid rgba(232,117,10,${hovered ? "0.5" : "0.2"})`,
          transition:   "border-color 0.3s ease",
        }} />

        {/* Spinning glow ring only on hover */}
        <div style={{
          position:     "absolute",
          inset:        -2,
          borderRadius: "50%",
          background:   "conic-gradient(from 0deg, transparent 0%, #E8750A 20%, transparent 40%, transparent 100%)",
          opacity:      hovered ? 0.7 : 0,
          transition:   "opacity 0.3s ease",
          animation:    "spinRing 1.8s linear infinite",
        }} />

        {/* Inner mask to keep ring thin */}
        <div style={{
          position:     "absolute",
          inset:        2,
          borderRadius: "50%",
          background:   "rgba(10,10,10,0.92)",
        }} />

        {/* ── PYRAMID SVG ── */}
        <svg
          viewBox="0 0 40 40"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            padding: "11px",
            boxSizing: "border-box",
          }}
        >
          <defs>
            <linearGradient id="pyramidGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#C4620A"/>
              <stop offset="50%"  stopColor="#E8750A"/>
              <stop offset="100%" stopColor="#F5A623"/>
            </linearGradient>
            <linearGradient id="pyramidShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(0,0,0,0.35)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
            </linearGradient>
            <filter id="pyramidGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={hovered ? "2.5" : "1.5"} result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Shadow under pyramid */}
          <ellipse cx="20" cy="37" rx="10" ry="2"
            fill="rgba(232,117,10,0.15)"
            style={{ transition: "all 0.3s ease" }}
          />

          {/* Main pyramid face */}
          <polygon
            points="20,4 34,34 6,34"
            fill="url(#pyramidGrad)"
            filter="url(#pyramidGlow)"
          />

          {/* Left face shade gives 3D depth */}
          <polygon
            points="20,4 6,34 20,34"
            fill="url(#pyramidShade)"
          />

          {/* Horizontal tier lines classic pyramid look */}
          <line x1="11.5" y1="24" x2="28.5" y2="24"
            stroke="rgba(255,255,255,0.15)" strokeWidth="0.7"/>
          <line x1="15"   y1="14" x2="25"   y2="14"
            stroke="rgba(255,255,255,0.10)" strokeWidth="0.5"/>

          {/* Apex glow dot */}
          <circle cx="20" cy="4" r="1.5"
            fill="#F5A623"
            opacity={hovered ? 1 : 0.7}
            style={{ transition: "opacity 0.3s ease" }}
          >
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>

        {/* Pulse ring always animating when visible */}
        <div style={{
          position:     "absolute",
          inset:        -6,
          borderRadius: "50%",
          border:       "1px solid rgba(232,117,10,0.3)",
          animation:    "pulseRing 2.5s ease-out infinite",
          pointerEvents: "none",
        }} />
      </button>

      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);    opacity: 0.6; }
          100% { transform: scale(1.6);  opacity: 0;   }
        }
      `}</style>
    </>
  );
};

export default ScrollToTop;