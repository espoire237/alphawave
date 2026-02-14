/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E8750A",
        secondary: "#1A6B3C",
        dark: "#0D0D0D",
        light: "#FAF7F2",
        accent: "#F5C842",
        text: "#F0EDE8",
      },
    },
  },
};
