import 'reflect-metadata';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
// eslint-disable-next-line import/no-named-as-default
import createThemeOption from './util/createThemeOption';

window.electron.ipcRenderer
  .invoke('app-get-settings', 'app.UISettings')
  // eslint-disable-next-line promise/always-return
  .then((uISettings: never) => {
    console.log(uISettings);
    const container = document.getElementById('root')!;
    const root = createRoot(container);
    root.render(
      <ThemeProvider theme={createTheme(createThemeOption(uISettings))}>
        <App />
      </ThemeProvider>
    );
  })
  .catch((e: never) => {
    // eslint-disable-next-line no-console
    console.log(e);
  });
