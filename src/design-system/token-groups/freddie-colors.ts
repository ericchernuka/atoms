import { TokenGroup } from "../types";

export const colors = {
  focused: {
    value: "rgb(69, 143, 255)",
    description: "For use in the focus ring on interactive elements.",
  },
  "action-primary": {
    value: "rgb(0, 128, 96)",
    description:
      "Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.",
  },
  "action-primary-hovered": {
    value: "rgb(10, 104, 88)",
    description:
      "Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.",
  },
  "action-primary-pressed": {
    value: "rgb(5, 102, 86)",
    description:
      "Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.",
  },
};

export type FreddieColorsTokenGroup = TokenGroup<typeof colors>;
export type FreddieColorsTokenName = keyof FreddieColorsTokenGroup;
