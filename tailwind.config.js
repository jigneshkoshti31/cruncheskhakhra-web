/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1800px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        lg: "0 0px 15px -3px rgb(0 0 0 / 0.13), 0 0px 6px -2px rgb(0 0 0 / 0.16)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.16), 0 8px 10px -4px rgb(0 0 0 / 0.16)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      },
      colors: {
        primary_color: "#F4B618",
        primary_light: "#fde68a",
        primary_dark: "#b45309",
        "primary-hover": "#BF27D7",
        green_color: "#01572E",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  safelist: [
    { pattern: /^border-(red|green)-[^/]+$/ },
    { pattern: /^text-(red|green)-[^/]+$/ },
    {
      pattern: /^bg-(indigo|yellow|red|purple|pink|blue|green)-[^/]+$/,
      variants: [
        "hover",
        "dark",
        "dark:hover",
        "group-hover",
        "group-hover/navitem",
        "group-hover/submenu",
      ],
    },
  ],
  plugins: [require("tailwindcss-animate")],
};
