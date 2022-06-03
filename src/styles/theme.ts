import {
  blueDark,
  crimsonDark,
  mauveDark,
  purpleDark,
  redDark,
  violetDark
} from "@radix-ui/colors";

// Create your theme
export const theme = {
  colors: {
    ...mauveDark,
    ...violetDark,
    ...purpleDark,
    ...crimsonDark,
    background: mauveDark.mauve1,
    primary: violetDark.violet6,
    secondary: purpleDark.purple6,
    alert: crimsonDark.crimson6,
    danger: crimsonDark.crimson9
  }
};

export const redTheme = {
  primary: redDark.red6,
  secondary: redDark.red8,
  background: redDark.red4
};

export const blueTheme = {
  primary: blueDark.blue6,
  secondary: blueDark.blue8,
  background: blueDark.blue4
};
