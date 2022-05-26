import React, { FC } from 'react';
import { Button, Divider } from '@mui/material';

const SettingsFooter: FC = () => {
  return (
    <>
      <Divider style={{ width: '100%', padding: 0 }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'end',
          width: '100%',
          margin: 0,
          padding: 15,
        }}
      >
        <Button variant="contained">Закрыть</Button>
      </div>
    </>
  );
};

export default SettingsFooter;
