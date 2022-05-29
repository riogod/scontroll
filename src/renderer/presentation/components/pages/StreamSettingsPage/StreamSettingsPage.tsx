import React, { FC } from 'react';
import { Button, Typography } from '@mui/material';
import DialogHeader from '../../common/dialog/DialogHeader/DialogHeader';
import DialogFooter from '../../common/dialog/DialogFooter/DialogFooter';

const StreamSettingsPage: FC = () => {
  const closeHandle = () => {
    window.electron.ipcRenderer.send('app-stream-settings-close-window');
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
          Настройки трансляции
        </Typography>
      </DialogHeader>
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          height: '100%',
          padding: 20,
        }}
      >
        Stream settings
      </div>
      <DialogFooter>
        <Button variant="contained" onClick={closeHandle}>
          Закрыть
        </Button>
      </DialogFooter>
    </div>
  );
};

export default StreamSettingsPage;
