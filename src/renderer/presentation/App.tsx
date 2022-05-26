import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import useContainer from './hooks/useContainer/useContainer';
import AppSettingsEntity from '../domain/entity/AppSettings/AppSettingsEntity';

import MainPage from './components/pages/MainPage/MainPage';
import createThemeOption from '../util/createThemeOption';
import SettingsPage from './components/pages/SettingsPage/SettingsPage';

// const shandle = async () => {
//   // window.electron.ipcRenderer.send('ipc-example', 'PINGGGG!!!!2222');
//   await window.electron.ipcRenderer.invoke('app-set-settings', {
//     storePath: 'app.UISettings.themeMode',
//     storeValue: 'dark',
//   });
//
//   const res = await window.electron.ipcRenderer.invoke(
//     'app-get-settings',
//     'app.mainWindow'
//   );
//   alert(JSON.stringify(res));
// };

//
// window.electron.ipcRenderer.on('ipc-example', (data) => {
//   console.log('>>>>>>', data);
// });

const App: FC = () => {
  const appSettingsEntity = useContainer<AppSettingsEntity>(AppSettingsEntity);

  if (!appSettingsEntity.loaded) {
    return <>Loading...</>;
  }

  return (
    <ThemeProvider
      theme={createTheme(createThemeOption(appSettingsEntity.getThemeSettings))}
    >
      <div
        style={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/test" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default observer((data) => {
  // alert(data);
  return App(data);
});
