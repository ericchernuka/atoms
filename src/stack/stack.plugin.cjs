const plugin = require("tailwindcss/plugin");

// NOTE: This might be an optional addition as we can accomplish it all using the custom tailwind syntax

const PLUGIN_NAME = "stack";
const PLUGIN_RAW_NAME = `${PLUGIN_NAME}-gap`;
const PLUGIN_CSS_VARIABLE_NAME = `--${PLUGIN_RAW_NAME}`;

module.exports = {
  stackPlugin: plugin(({ addComponents, matchUtilities, theme }) => {
    const PLUGIN_BASE_CLASS = `.${PLUGIN_NAME}`;

    addComponents({
      [PLUGIN_BASE_CLASS]: {
        [PLUGIN_CSS_VARIABLE_NAME]: theme("spacing.4"),
        display: "flex",
        gap: 0,
      },
    });

    const directions = [
      ["col", "column"],
      ["row", "row"],
      ["col-reverse", "column-reverse"],
      ["row-reverse", "row-reverse"],
    ];

    directions.forEach(([className, direction]) => {
      addComponents({
        [`${PLUGIN_BASE_CLASS}.${PLUGIN_NAME}-${className}`]: {
          "flex-direction": direction,
          gap: `var(${PLUGIN_CSS_VARIABLE_NAME})`,
        },
      });
    });

    matchUtilities(
      {
        [PLUGIN_RAW_NAME]: (value) => ({
          [PLUGIN_CSS_VARIABLE_NAME]: value,
        }),
      },
      { values: theme("space") }
    );
  }),
};
