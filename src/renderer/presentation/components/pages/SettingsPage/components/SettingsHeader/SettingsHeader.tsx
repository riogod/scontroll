import { FC } from 'react';
import { Divider, Typography } from '@mui/material';

const SettingsHeader: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: 0,
      }}
    >
      <Typography variant="h5" style={{ paddingTop: 15, paddingBottom: 15 }}>
        Настройки
      </Typography>
      <Divider style={{ width: '100%', padding: 0 }} />
    </div>
  );
};

export default SettingsHeader;
