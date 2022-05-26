import { ThemeOptions } from '@mui/material/styles/createTheme';
import { jsx } from '@emotion/react';
import IntrinsicAttributes = jsx.JSX.IntrinsicAttributes;
import { IUIThemeSettings } from '../domain/entity/AppSettings/interfaces';

const createThemeOption = (
  UISettings: IUIThemeSettings
): IntrinsicAttributes & ThemeOptions => {
  return {
    palette: {
      mode: UISettings.themeMode,
    },
  };
};

export default createThemeOption;
