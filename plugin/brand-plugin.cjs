// @ts-check

const plugin = require("tailwindcss/plugin");

// ------------------------------
// Helpers
// ------------------------------
const getRgbChannels = (rgbString) => {
  const [, r, g, b] =
    rgbString.replace(/\s/g, "").match(/rgb\((\d+),(\d+),(\d+)\)/) || [];
  return `${r} ${g} ${b}`;
};

// Generate CSS variables
function getCssVariableDeclarations(input, path = [], output = {}) {
  Object.entries(input).forEach(([key, value]) => {
    const newPath = path.concat(key);
    if (typeof value !== "string") {
      getCssVariableDeclarations(value, newPath, output);
    } else {
      output[`--${newPath.join("-")}`] = getRgbChannels(value);
    }
  });
  return output;
}

// Generate color extension object
function getColorUtilitiesWithCssVariableReferences(input, path = []) {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => {
      const newPath = path.concat(key);
      if (typeof value !== "string") {
        return [
          key,
          getColorUtilitiesWithCssVariableReferences(value, newPath),
        ];
      } else {
        return [key, `rgb(var(--${newPath.join("-")}) / <alpha-value>)`];
      }
    })
  );
}

// Check for valid color themes input
function checkForValidColorThemesInput(input) {
  const isValid =
    typeof input === "object" &&
    Object.keys(input).some((key) => typeof input[key] === "object");
  if (!isValid) {
    throw new Error(
      "The Theme Plugin expects a `colorThemes` option passed to it, which contains at least one theme object."
    );
  }
}

// ------------------------------
// Plugin definition
// ------------------------------
module.exports = plugin.withOptions(
  function (options) {
    const { colorThemes } = options;
    checkForValidColorThemesInput(colorThemes);

    const [baseTheme] = Object.values(colorThemes);

    return function ({ addBase }) {
      Object.entries(colorThemes).forEach(([key, value], index) => {
        let themeKey = `[data-brand="${key}"]`;
        // set the first theme as the root theme
        if (index === 0) {
          themeKey = ":root";
        }
        addBase({
          [themeKey]: getCssVariableDeclarations(value),
        });
      });
    };
  },
  function (options) {
    const { colorThemes } = options;
    checkForValidColorThemesInput(colorThemes);

    const [baseTheme] = Object.values(colorThemes);

    return {
      theme: {
        extend: {
          colors: getColorUtilitiesWithCssVariableReferences(baseTheme),
        },
      },
    };
  }
);
