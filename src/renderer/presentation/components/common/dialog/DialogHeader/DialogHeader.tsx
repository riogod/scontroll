import { FC } from 'react';
import { Divider } from '@mui/material';

const DialogHeader: FC = ({ children }) => {
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
      {children}
      <Divider style={{ width: '100%', padding: 0 }} />
    </div>
  );
};

export default DialogHeader;
