const plugin = require("tailwindcss/plugin");

const PLUGIN_NAME = "stack";
const PLUGIN_CSS_VARIABLE_NAME = `--${PLUGIN_NAME}-space`;

module.exports = {
  stackPlugin: plugin(({ addComponents, matchUtilities, theme }) => {
    addComponents({
      [`.${PLUGIN_NAME}`]: {
        [PLUGIN_CSS_VARIABLE_NAME]: theme("spacing.4"),
        display: "flex",
        gap: 0,
      },
      [`.${PLUGIN_NAME}-col`]: {
        "flex-direction": "column",
        gap: `var(${PLUGIN_CSS_VARIABLE_NAME})`,
      },
      [`.${PLUGIN_NAME}-col-reverse`]: {
        "flex-direction": "column-reverse",
        gap: `var(${PLUGIN_CSS_VARIABLE_NAME})`,
      },
      [`.${PLUGIN_NAME}-row`]: {
        "flex-direction": "row",
        gap: `var(${PLUGIN_CSS_VARIABLE_NAME})`,
      },
      [`.${PLUGIN_NAME}-row-reverse`]: {
        "flex-direction": "row-reverse",
        gap: `var(${PLUGIN_CSS_VARIABLE_NAME})`,
      },
    });

    matchUtilities(
      {
        "stack-space": (value) => {
          return {
            [PLUGIN_CSS_VARIABLE_NAME]: value,
          };
        },
      },
      {
        values: theme("space"),
      }
    );
  }),
};
