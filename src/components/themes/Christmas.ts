import { CustomTheme } from ".";
import moon from "../../assets/verse-moon.png";
import halfMoon from "../../assets/half-moon.png";
import { colors } from "../colors";

export const Christmas: CustomTheme = {
  moon,
  halfMoon,
  background: "linear-gradient(180deg, #020A10 0%, #10518D 100%)",
  buttons: {
    primary: {
      background: {
        base: "linear-gradient(180deg, #0ebef0 0%, #0085ff 100%)",
        hover: "linear-gradient(180deg, #31c9f4 0%, #2c96f6 100%)",
        active: "linear-gradient(180deg, #0189fe 0%, #2c96f6 100%)",
        disabled: "#1a2231",
      },
      text: {
        base: colors.shade100,
        hover: colors.shade100,
        active: colors.shade100,
        disabled: colors.shade50,
      },
    },
    secondary: {
      background: {
        base: "linear-gradient(180deg, #425472 0%, #313e57 100%)",
        hover: "linear-gradient(180deg, #586f91 0%, #425472 100%)",
        active: "linear-gradient(180deg, #334059 0%, #425371 100%)",
        disabled: "#1a2231",
      },
      text: {
        base: colors.shade100,
        hover: colors.shade100,
        active: colors.shade100,
        disabled: colors.shade50,
      },
    },
    tertiary: {
      background: {
        base: "#1a2231",
        hover: "#313e57",
        active: "#252d40",
        disabled: "#1a2231",
      },
      text: {
        base: colors.shade90,
        hover: colors.shade100,
        active: colors.shade100,
        disabled: colors.shade50,
      },
    },
  },
};
