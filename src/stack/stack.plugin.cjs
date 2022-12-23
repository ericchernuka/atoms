const plugin = require("tailwindcss/plugin");

const PLUGIN_NAME = "stack";
const PLUGIN_CSS_VARIABLE_NAME = `--${PLUGIN_NAME}-space`;

module.exports = {
  stackPlugin: plugin(({ addComponents, matchUtilities, theme }) => {
    addComponents({
      [`.${PLUGIN_NAME}`]: {
        [PLUGIN_CSS_VARIABLE_NAME]: theme("spacing.4"),
        display: "flex",
        "margin-top": 0,
        "margin-inline-end": 0,
        "margin-bottom": 0,
        "margin-inline-start": 0,
      },
      [`.${PLUGIN_NAME}-col > * ~ *`]: {
        "margin-top": `var(${PLUGIN_CSS_VARIABLE_NAME})`,
      },
      [`.${PLUGIN_NAME}-col-reverse > * ~ *`]: {
        "margin-bottom": `var(${PLUGIN_CSS_VARIABLE_NAME})`,
      },
      [`.${PLUGIN_NAME}-row > * ~ *`]: {
        "margin-inline-start": `var(${PLUGIN_CSS_VARIABLE_NAME})`,
      },
      [`.${PLUGIN_NAME}-row-reverse > * ~ *`]: {
        "margin-inline-end": `var(${PLUGIN_CSS_VARIABLE_NAME})`,
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
