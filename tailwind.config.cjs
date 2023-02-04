const plugin = require("tailwindcss/plugin");
const { stackPlugin } = require("./src/stack/stack.plugin.cjs");

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
    require("@tailwindcss/forms"),
    require("tailwindcss-radix"),
    require("tailwindcss-animate"),
    // function ({ addBase, theme }) {
    //   const spacings = theme("spacing");
    //   const spacingProperties = Object.keys(spacings).reduce(
    //     (vars, spacingKey) => {
    //       const value = spacings[spacingKey];
    //       const newVars = {
    //         [`--spacing-${spacingKey.replace(".", "-")}`]: value,
    //       };

    //       return { ...vars, ...newVars };
    //     },
    //     {}
    //   );
    //   addBase({
    //     ":root": spacingProperties,
    //   });
    // },
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
