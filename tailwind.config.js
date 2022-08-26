const plugin = require("tailwindcss/plugin");

function withOpacity(varName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${varName}), ${opacityValue})`;
    }
    return `rgb(var(${varName}))`;
  };
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "border-base": withOpacity("--color-fill-1"),
      },
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          strong: withOpacity("--color-text-strong"),
          primary: withOpacity("--color-primary"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          "fill-1": withOpacity("--color-fill-1"),
          primary: withOpacity("--color-primary"),
          secondary: withOpacity("--color-secondary"),
        },
      },
      backgroundImage: {
        opendota: "url('./data/images/opendota/background.jpg')",
      },
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
  plugins: [require("@tailwindcss/line-clamp")],
};
