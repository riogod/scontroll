import React, { FC, useState } from 'react';
import {
  Backdrop,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const AppMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpenClose = () => setOpen(!open);

  const actions = [
    {
      icon: <AccountBalanceWalletIcon />,
      name: 'Настройки',
      onClick: () => {
        window.electron.ipcRenderer.send('app-settings-open-window');
        handleClose();
      },
    },
    {
      icon: <AccountBalanceWalletIcon />,
      name: 'Сценарии',
      onClick: () => {
        window.electron.ipcRenderer.send('app-settings-open-window');
        handleClose();
      },
    },
  ];

  return (
    <Box sx={{ height: '100%', transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} onClick={handleClose} />
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 40, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleOpenClose}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default AppMenu;
