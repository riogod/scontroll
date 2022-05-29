import React, { FC } from 'react';
import { Divider } from '@mui/material';

const DialogFooter: FC = ({ children }) => {
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
        {children}
      </div>
    </>
  );
};

export default DialogFooter;
