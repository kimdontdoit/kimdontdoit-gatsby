const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    fontFamily: {
      sans: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
      display:
        'Mona Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      body: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)"
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  corePlugins: {
    container: false
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const buttons = {
        ".container": {
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem"
        }
      };

      addComponents(buttons);
    })
  ]
};
