const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        firaCond: ["Fira Sans Condensed", "sans-serif"],
      },
      // that is animation class
      animation: {
        fadeIn: "fadeIn 0.1s",
        slideIn: "slideIn 0.3s",
      },

      // that is actual animation
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        slideIn: {
          "0%": {
            transform: "translateX(-0.5rem)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),

    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`
            )}`
        );
      });
    }),
  ],
};