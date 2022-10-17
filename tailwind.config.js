const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    fontFamily: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
      display:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
      body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
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
        },
      };

      addComponents(buttons);
    }),
  ],
};
