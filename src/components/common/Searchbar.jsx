/**
 * SearchBar Reusable Search Component
 * AlphaWaves brand system
 *
 * Designed to sit inside HeroSection as a child OR standalone.
 *
 * Usage:
 * import SearchBar from "../components/ui/SearchBar.jsx";
 *
 * Props:
 * - value       {string}    required  controlled input value
 * - onChange    {function}  required  called on every keystroke
 * - placeholder {string}    optional  input placeholder
 * - onSubmit    {function}  optional  called on Enter key press
 * - maxWidth    {number}    optional  max width in px (default: 480)
 */

import { useState } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS }     from "../../assets/fonts/fonts.js";

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 12L15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const SearchBar = ({
  value       = "",
  onChange,
  placeholder = "Search...",
  onSubmit,
  maxWidth    = 520,
}) => {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSubmit) onSubmit(value);
  };

  return (
    <div style={{
      display:   "flex",
      maxWidth,
      width:     "100%",
      position:  "relative",
      zIndex:    10,
    }}>

      {/* Search icon */}
      <div style={{
        position:      "absolute",
        left:          18,
        top:           "50%",
        transform:     "translateY(-50%)",
        color:         focused ? MY_COLORS.orange : "rgba(232,117,10,0.6)",
        pointerEvents: "none",
        display:       "flex",
        alignItems:    "center",
        zIndex:        2,
        transition:    "color 0.25s ease",
      }}>
        <SearchIcon />
      </div>

      {/* Input */}
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width:                "100%",
          height:               56,
          padding:              "0 52px 0 52px",
          borderRadius:         16,
          background:           focused
            ? "rgba(10,10,10,0.95)"
            : "rgba(10,10,10,0.85)",
          border:               `1.5px solid ${focused ? MY_COLORS.orange : "rgba(232,117,10,0.4)"}`,
          color:                "#ffffff",
          fontFamily:           FONTS.secondary,
          fontSize:             FONTS.size.base,
          fontWeight:           FONTS.weight.regular,
          outline:              "none",
          backdropFilter:       "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxSizing:            "border-box",
          boxShadow:            focused
            ? `0 0 0 3px rgba(232,117,10,0.15), 0 16px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`
            : `0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
          transition:           "all 0.25s ease",
          WebkitAppearance:     "none",
          appearance:           "none",
        }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          style={{
            position:       "absolute",
            right:          14,
            top:            "50%",
            transform:      "translateY(-50%)",
            width:          26,
            height:         26,
            borderRadius:   "50%",
            background:     "rgba(255,255,255,0.08)",
            border:         "none",
            color:          "rgba(255,255,255,0.5)",
            cursor:         "pointer",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontSize:       12,
            transition:     "all 0.2s ease",
            zIndex:         2,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(232,117,10,0.15)";
            e.currentTarget.style.color      = MY_COLORS.orange;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color      = "rgba(255,255,255,0.5)";
          }}
        >
          ✕
        </button>
      )}

      <style>{`
        input[type="search"]::placeholder {
          color: rgba(255,255,255,0.35);
        }
        input[type="search"]::-webkit-search-cancel-button {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;