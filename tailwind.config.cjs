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
      animation: {
        "slide-down": "slideDown 300ms ease-out",
        "slide-up": "slideUp 300ms ease-out",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        slideDown: {
          from: {
            height: 0,
          },
          to: {
            height: "var(--radix-collapsible-content-height)",
          },
        },
        slideUp: {
          from: {
            height: "var(--radix-collapsible-content-height)",
          },
          to: {
            height: 0,
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-radix"),
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
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
    // margin-inline-start and margin-inline-end utils
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
