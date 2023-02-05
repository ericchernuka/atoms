import { colors as freddieColors } from "./token-groups/freddie-colors";
import { colors as fridaColors } from "./token-groups/frida-colors";
import { Brand } from "./types";

const tokenGroups = {
  freddie: freddieColors,
  frida: fridaColors,
} as const;

export const getCSSVariablesForBrand = (brand: Brand) =>
  buildCSSVariables(tokenGroups[brand]);

const extractRGBValues = (rgbString: string) => {
  const [, r, g, b] = rgbString.match(/rgb\((\d+), (\d+), (\d+)\)/) || [];
  return [r, g, b];
};

export const buildCSSVariables = <T extends typeof tokenGroups["freddie"]>(
  tokenGroup: T
) => {
  return Object.entries(tokenGroup).reduce((acc, [key, { value }]) => {
    return {
      ...acc,
      [`--${key}`]: extractRGBValues(value).join(" "),
    };
  }, {} as React.CSSProperties);
};
