const plugin = require("tailwindcss/plugin");
const { stackPlugin } = require("./src/stack/stack.plugin.cjs");
const brands = require("./plugin/brands.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        "l-slot": "max(var(--space-2), var(--left-slot-width))",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [
    require("./plugin/brand-plugin.cjs")({
      colorThemes: brands,
    }),
    require("@tailwindcss/forms"),
    require("tailwindcss-radix"),
    require("tailwindcss-animate"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          mis: (value) => {
            return {
              "margin-inline-start": value,
            };
          },
        },
        {
          values: theme("space"),
        }
      );
      matchUtilities(
        {
          mie: (value) => {
            return {
              "margin-inline-end": value,
            };
          },
        },
        {
          values: theme("space"),
        }
      );
    }),
    stackPlugin,
  ],
};
