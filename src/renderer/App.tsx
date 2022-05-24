import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import './App.css';
import { FC, useEffect } from 'react';
import icon from '../../assets/icon.svg';
import SettingsPage from './components/pages/SettingsPage/SettingsPage';

const showSettingsHandle = () => {
  window.electron.ipcRenderer.send('app-settings-open-window', 'PINGGGG!!!!');
};

const shandle = async () => {
  // window.electron.ipcRenderer.send('ipc-example', 'PINGGGG!!!!2222');
  await window.electron.ipcRenderer.invoke('app-set-settings', {
    storePath: 'app.UISettings.themeMode',
    storeValue: 'dark',
  });

  const res = await window.electron.ipcRenderer.invoke(
    'app-get-settings',
    'app.mainWindow'
  );
  alert(JSON.stringify(res));
};

//
// window.electron.ipcRenderer.on('ipc-example', (data) => {
//   console.log('>>>>>>', data);
// });
const Hello = () => {
  // console.log(container);

  return (
    <div>
      <div className="Hello">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <a onClick={showSettingsHandle}>
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Settings
          </button>
        </a>

        <Link to="/test">Go to test</Link>
      </div>
    </div>
  );
};

const Test = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-example', (arg) => {
      alert(arg);
    });
  }, []);
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      This is a test! <a onClick={shandle}>asdas</a>
    </div>
  );
};

const App: FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/test" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
