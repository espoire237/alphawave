/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E8750A",       // Orange — hover, active, accents
        secondary: "#1A6B3C",     
        dark: "#0D0D0D",          
        light: "#FAF7F2",         
        accent: "#F5C842",        
        text: "#F0EDE8",          

        // ✅ New additions
        background: "#1E1E1E",    // Dark grey — main background
        surface: "#2A2A2A",       // Slightly lighter grey — cards, navbars
        foreground: "#FFFFFF",    // White — main text
      },
    },
  },
};