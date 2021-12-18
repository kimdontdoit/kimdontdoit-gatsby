const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,

  theme: {
    fontFamily: {
      sans: "Satoshi, Helvetica, Arial, sans-serif",
      display: "Satoshi, Helvetica, Arial, sans-serif",
      body: "Satoshi, Helvetica, Arial, sans-serif",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)", // https://github.com/adamwathan/tailwind-css-variable-text-opacity-demo
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const buttons = {
        ".container": {
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen md": {
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "1024px",
          },
          "@screen xl": {
            maxWidth: "1200px",
          },
        },
      };

      addComponents(buttons);
    }),
  ],
};
