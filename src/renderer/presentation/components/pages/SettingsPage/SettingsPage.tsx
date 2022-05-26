import React, { FC, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import TabPanel from './components/TabPanel/TabPanel';
import SettingsHeader from './components/SettingsHeader/SettingsHeader';
import SettingsFooter from './components/SettingsFooter/SettingsFooter';
import TelegramSettings from './components/TelegramSettings';
import TwitchSettings from './components/TwitchSettings';
import SettingsSettings from './components/SettingsSettings';

const SettingsPage: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      <SettingsHeader />
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
          <Tab label="API: Telegram" />
          <Tab label="API: Twitch" />
          <Tab label="API: Trovo" />
          <Tab label="API: Youtube" />
          <Tab label="API: VKONTAKTE" />
          <Tab label="API: GOODGAME" />
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
      <SettingsFooter />
    </div>
  );
};

export default SettingsPage;
