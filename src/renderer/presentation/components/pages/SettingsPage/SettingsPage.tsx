import React, { FC, useState } from 'react';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from './components/TabPanel/TabPanel';
import TelegramSettings from './components/TelegramSettings';
import TwitchSettings from './components/TwitchSettings';
import SettingsSettings from './components/SettingsSettings';
import DialogHeader from '../../common/dialog/DialogHeader/DialogHeader';
import DialogFooter from '../../common/dialog/DialogFooter/DialogFooter';

const SettingsPage: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const closeHandle = () => {
    window.electron.ipcRenderer.send('app-settings-close-window');
  };

  return (
    <div
      style={{
        height: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DialogHeader>
        <Typography variant="h5" style={{ paddingTop: 15, paddingBottom: 15 }}>
          Настройки
        </Typography>
      </DialogHeader>
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            width: 250,
          }}
        >
          <Tab label="Настройки" />
          <Tab label="Telegram" />
          <Tab label="Twitch" />
          <Tab label="Trovo" />
          <Tab label="Youtube" />
          <Tab label="VKONTAKTE" />
          <Tab label="GOODGAME" />
          <Tab label="Discord" />
          <Tab label="OBS" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <SettingsSettings />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TelegramSettings />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TwitchSettings />
        </TabPanel>
      </div>
      <DialogFooter>
        <Button variant="contained" onClick={closeHandle}>
          Закрыть
        </Button>
      </DialogFooter>
    </div>
  );
};

export default SettingsPage;
