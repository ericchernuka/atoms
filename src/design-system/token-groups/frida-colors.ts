import { TokenGroup } from "../types";

export const colors = {
  focused: {
    value: "rgb(69, 143, 255)",
    description: "For use in the focus ring on interactive elements.",
  },
  "action-primary": {
    value: "rgb(127, 108, 211)",
    description:
      "Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.",
  },
  "action-primary-hovered": {
    value: "rgb(118, 98, 206)",
    description:
      "Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.",
  },
  "action-primary-pressed": {
    value: "rgb(105, 82, 209)",
    description:
      "Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.",
  },
};

export type FridaColorsTokenGroup = TokenGroup<typeof colors>;
export type FridaColorsTokenName = keyof FridaColorsTokenGroup;
