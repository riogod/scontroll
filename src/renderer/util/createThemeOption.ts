import { ThemeOptions } from '@mui/material/styles/createTheme';
import { jsx } from '@emotion/react';
import IntrinsicAttributes = jsx.JSX.IntrinsicAttributes;

export const createThemeOption = (
  UISettings: any
): IntrinsicAttributes & ThemeOptions => {
  return {
    palette: {
      mode: UISettings.themeMode,
    },
  };
};

export default createThemeOption;
