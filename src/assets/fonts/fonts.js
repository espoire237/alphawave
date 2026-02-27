// src/assets/fonts/fonts.js

/**
 * AlphaWaves Typography System
 * Corporate-grade type scale — authoritative, clean, trustworthy
 *
 * Manrope  → Headings, logo, navbar, buttons (geometric, sharp, corporate)
 * Inter    → Body text, descriptions, paragraphs (clean, readable, standard)
 *
 * Google Fonts import (add to your index.html or main CSS):
 * @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
 */

export const FONTS = {

  // ── Primary Font — Manrope ───────────────────────────────────
  // Geometric, authoritative, modern corporate
  // Used for: headings, logo, navbar, buttons, section titles
  primary: "'Manrope', sans-serif",

  // ── Secondary Font — Inter ───────────────────────────────────
  // Clean, highly readable, universally trusted
  // Used for: body text, descriptions, paragraphs, captions
  secondary: "'Inter', sans-serif",

  // ── Font Weights ─────────────────────────────────────────────
  weight: {
    regular:   400,   // body text, descriptions
    medium:    500,   // nav links, secondary labels
    semibold:  600,   // buttons, emphasis
    bold:      700,   // section titles, card headings
    extrabold: 800,   // hero text, logo wordmark
  },

  // ── Type Scale ───────────────────────────────────────────────
  size: {
    xs:   "11px",   // badges, labels, legal text
    sm:   "13px",   // captions, metadata, nav links
    base: "15px",   // body text, descriptions
    md:   "17px",   // lead paragraphs, card text
    lg:   "22px",   // section subtitles
    xl:   "28px",   // card titles, sub-headings
    xxl:  "40px",   // section titles
    hero: "64px",   // hero display text — desktop
  },

  // ── Letter Spacing ───────────────────────────────────────────
  tracking: {
    tight:   "-0.03em",  // large headings, hero text
    normal:  "0em",      // body text, paragraphs
    wide:    "0.04em",   // buttons, nav links
    wider:   "0.08em",   // small labels, metadata
    widest:  "0.15em",   // section eyebrows (uppercase)
  },

  // ── Line Height ──────────────────────────────────────────────
  leading: {
    tight:   1.1,    // hero headlines
    snug:    1.25,   // large headings
    normal:  1.5,    // subheadings, card text
    relaxed: 1.7,    // body paragraphs
    loose:   1.9,    // captions, small text
  },

};