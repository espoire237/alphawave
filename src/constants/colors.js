// src/constants/colors.js

/**
 * AlphaWaves Color System
 * Dark corporate tech brand — Orange / Gray / White
 *
 * Rule of thumb:
 * → Orange   : 10–15% of any page — CTAs, accents, active states only
 * → White    : All text — never used as background
 * → Gray     : Everything structural — backgrounds, cards, borders, dividers
 *
 * Inspired by: Vercel, Linear, Stripe dark mode
 */

export const MY_COLORS = {

  // ── Page Backgrounds ─────────────────────────────────────────
  // Dark layers that create depth — always go darker → lighter
  bgBase:        "#0a0a0a",              // deepest — main page background
  bgSection:     "#111111",              // slightly lighter — alternating sections
  bgSurface:     "#161616",             // card / component background
  bgSurfaceHover:"#1a1a1a",            // card hover / elevated state
  bgGlass:       "rgba(13,13,13,0.82)", // navbar glass — transparent
  bgGlassScrolled:"#393939",// navbar glass — scrolled / opaque

  // ── Text ─────────────────────────────────────────────────────
  // White hierarchy — never use pure white for everything
  textPrimary:   "#FFFFFF",                  // headlines, key info
  textSecondary: "rgba(255,255,255,0.75)",   // body text, descriptions
  textMuted:     "rgba(255,255,255,0.45)",   // captions, metadata, placeholders
  textDisabled:  "rgba(255,255,255,0.25)",   // disabled states

  // ── Borders & Dividers ───────────────────────────────────────
  border:        "rgba(255,255,255,0.07)",   // default subtle border
  borderHover:   "rgba(255,255,255,0.15)",   // border on hover
  borderScrolled:"rgba(232,117,10,0.22)",    // navbar border when scrolled

  // ── Orange — Primary Brand Accent ────────────────────────────
  // Use sparingly — maximum 10–15% of any page
  orange:        "#E8750A",                  // primary brand orange
  orangeLight:   "#F5A623",                  // lighter variant — gradients, glows
  orangeDark:    "#C4620A",                  // darker variant — pressed states
  orangeGlow:    "rgba(232,117,10,0.45)",    // glow effect — logo, buttons
  orangeDim:     "rgba(232,117,10,0.12)",    // subtle background tint
  orangeBorder:  "rgba(232,117,10,0.25)",    // orange-tinted border
  orangeSection: "rgba(232,117,10,0.06)",    // very subtle section tint

  // ── Semantic Colors ──────────────────────────────────────────
  success:       "#4ade80",                  // success states, confirmations
  successGlow:   "rgba(74,222,128,0.15)",    // success background tint
  error:         "#f87171",                  // error states, warnings
  errorGlow:     "rgba(248,113,113,0.15)",   // error background tint
  info:          "#60a5fa",                  // info states, links
  infoGlow:      "rgba(96,165,250,0.15)",    // info background tint

  // ── Gradients ────────────────────────────────────────────────
  gradientOrange: "linear-gradient(135deg, #E8750A 0%, #F5A623 100%)",
  gradientDark:   "linear-gradient(180deg, #0a0a0a 0%, #111111 100%)",
  gradientFade:   "linear-gradient(180deg, transparent 0%, #0a0a0a 100%)",
  gradientGlow:   "linear-gradient(90deg, transparent 0%, rgba(232,117,10,0.15) 50%, transparent 100%)",
  gradientAccent: "linear-gradient(90deg, transparent 0%, #E8750A 35%, #F5A623 65%, transparent 100%)",

};