// import { CSSProperties } from "react";
// import { typography } from "./typography";
// import { borderRadius } from "./borders";
import { breakpoints } from "./breakpoints";
import { palette } from "./palette";

export const getTheme = () => ({
  breakpoints,
  palette,
});

declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides {}
}

declare module "@mui/material/styles" {
  export interface ThemeOptions {}
  export interface Theme {}
  export interface TypographyVariants {}

  export interface TypographyVariantsOptions {}

  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    transparent: string;
  }

  interface CustomPalette {
    primary: {
      light: string;
      dark: string;
    };
    secondary: {
      main: string;
    };
    violet: {
      light: string;
      dark: string;
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Palette extends CustomPalette {
    violet: PaletteColor;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface PaletteOptions extends CustomPalette {}
}