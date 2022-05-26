import { HashRouter as Router } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router';

import useContainer from './hooks/useContainer/useContainer';
import AppSettingsEntity from '../domain/entity/AppSettings/AppSettingsEntity';

import MainPage from './components/pages/MainPage/MainPage';
import createThemeOption from '../util/createThemeOption';
import SettingsPage from './components/pages/SettingsPage/SettingsPage';

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
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/test" element={<SettingsPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default observer((data) => {
  // alert(data);
  return App(data);
});
