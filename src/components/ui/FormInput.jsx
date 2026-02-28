import { useState } from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { FONTS } from "../../assets/fonts/fonts.js";
import { ChevronDown } from "../icons/ContactIcons.jsx";

const FormInput = ({ label, type = "text", name, value, onChange, required, placeholder, as, options, error }) => {
  const [focused, setFocused] = useState(false);

  const baseStyle = {
    width:            "100%",
    padding:          "13px 16px",
    borderRadius:     10,
    background:       MY_COLORS.bgSurface,
    border:           `1px solid ${error ? MY_COLORS.error : focused ? MY_COLORS.orange : MY_COLORS.border}`,
    color:            MY_COLORS.textPrimary,
    fontFamily:       FONTS.secondary,
    fontSize:         FONTS.size.base,
    fontWeight:       FONTS.weight.regular,
    outline:          "none",
    transition:       "border-color 0.25s ease, box-shadow 0.25s ease",
    boxSizing:        "border-box",
    boxShadow:        focused ? `0 0 0 3px ${MY_COLORS.orangeDim}` : "none",
    appearance:       "none",
    WebkitAppearance: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontFamily:    FONTS.primary,
        fontSize:      FONTS.size.sm,
        fontWeight:    FONTS.weight.semibold,
        color:         focused ? MY_COLORS.orange : MY_COLORS.textSecondary,
        transition:    "color 0.25s ease",
        letterSpacing: FONTS.tracking.wide,
      }}>
        {label}{required && <span style={{ color: MY_COLORS.orange, marginLeft: 3 }}>*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          name={name} value={value} onChange={onChange}
          placeholder={placeholder} rows={5}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ ...baseStyle, resize: "vertical", minHeight: 120 }}
        />
      ) : as === "select" ? (
        <div style={{ position: "relative" }}>
          <select
            name={name} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...baseStyle, paddingRight: 40, cursor: "pointer" }}
          >
            <option value="" disabled>{placeholder}</option>
            {options.map(o => <option key={o} value={o} style={{ background: MY_COLORS.bgSurface }}>{o}</option>)}
          </select>
          <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: MY_COLORS.textMuted }}>
            <ChevronDown open={false} />
          </div>
        </div>
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange}
          placeholder={placeholder} autoComplete={name}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}

      {error && (
        <span style={{ fontFamily: FONTS.secondary, fontSize: FONTS.size.xs, color: MY_COLORS.error }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;