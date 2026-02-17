// src/assets/fonts/fonts.js

export const FONTS = {

  // ── Primary Font — Syne ─────────────────────────────────────
  // Sharp, geometric, bold — perfect for powerful tech brand
  // Used for: headings, logo, navbar, buttons
  primary: "'Syne', sans-serif",

  // ── Secondary Font — Inter ──────────────────────────────────
  // Clean, highly readable — industry standard for tech
  // Used for: body text, descriptions, paragraphs
  secondary: "'Inter', sans-serif",

  // ── Font Weights ────────────────────────────────────────────
  weight: {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
  },

  // ── Type Scale ──────────────────────────────────────────────
  size: {
    xs:   "11px",   // labels, badges, captions
    sm:   "13px",   // nav links, small text
    base: "15px",   // body text
    md:   "18px",   // lead paragraphs
    lg:   "24px",   // section subtitles
    xl:   "32px",   // section titles
    xxl:  "48px",   // page headings
    hero: "72px",   // hero display text
  },

  // ── Letter Spacing ──────────────────────────────────────────
  tracking: {
    tight:  "-0.5px",  // large headings
    normal: "0px",     // body text
    wide:   "1.5px",   // nav links (uppercase)
    wider:  "3px",     // labels, badges
    widest: "5px",     // section eyebrows
  },

  // ── Line Height ─────────────────────────────────────────────
  leading: {
    tight:  1.1,   // hero headlines
    snug:   1.3,   // headings
    normal: 1.6,   // subheadings
    relaxed:1.75,  // body text
    loose:  2.0,   // captions, labels
  },

};