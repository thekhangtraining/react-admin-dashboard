module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // that is animation class
      animation: {
        fadeIn: "fadeIn 0.1s",
        slideIn: "slideIn 0.5s",
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
            transform: "translateX(-1rem)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
