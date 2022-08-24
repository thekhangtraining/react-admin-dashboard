const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        firaCond: ["Fira Sans Condensed", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", "0.75rem"],
      },
      animation: {
        fadeIn: "fadeIn 2s",
        slideIn: "slideIn 0.5s",
        slideAndFadeIn: "slideAndFadeIn 1s",
        float: "float 4s ease-in-out infinite",
      },
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
        slideAndFadeIn: {
          "0%": {
            opacity: 0,
            transform: "translateY(-4rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        float: {
          "0%": {
            boxShadow: "0 2px 5px 0px rgba(0,0,0,0.6)",
            transform: "translateY(0px)",
          },
          "50%": {
            boxShadow: "0 5px 5px 0px rgba(0,0,0,0.2)",
            transform: "translateY(-0.5rem)",
          },
          "100%": {
            boxShadow: "0 2px 5px 0px rgba(0,0,0,0.6)",
            transform: "translatey(0px)",
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
