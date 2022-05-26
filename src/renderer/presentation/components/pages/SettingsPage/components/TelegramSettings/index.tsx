import { Button, TextField, Typography } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import InputMask from 'react-input-mask';
import useContainer from '../../../../../hooks/useContainer/useContainer';

import TelegramAPIEntity from '../../../../../../domain/entity/API/TelegramAPIEntity/TelegramAPIEntity';

const TelegramSettings = () => {
  const telegramEntity = useContainer<TelegramAPIEntity>(TelegramAPIEntity);

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [connected, setConnected] = useState(false);
  const [codeSend, setCodeSend] = useState(false);

  useEffect(() => {
    setConnected(telegramEntity.isTelegramAuth);
  }, [telegramEntity.isTelegramAuth, telegramEntity.loaded]);
  //  const checkStatus = () => window.telegram.ipcRenderer.subscribeTelegramStatus('_connect_Telegram').then((data: any) => {
  //     setConnected(data.connected);
  //   });
  // checkStatus();

  const logoutHandler = async () => {
    // await window.telegram.ipcRenderer.logout();
    // checkStatus();
  };

  const sendCodeHandler = () => {
    window.electron.ipcRenderer.send('telegram-auth-send-code', {
      phone,
    });
    setCodeSend(true);
  };

  const testSoundHandler = () => {
    // window.telegram.ipcRenderer.aliceSay('Ха-ха-ха-ха! Работает сученька!');
  };

  const singInHandler = async () => {
    if (code) {
      window.electron.ipcRenderer.send('telegram-auth-sing-in', {
        code,
      });
      setConnected(true);
    }
  };

  if (!telegramEntity.loaded) return <>Loading...</>;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {connected && (
        <>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            Учетная запись подключена{' '}
            <Button variant="contained" onClick={logoutHandler}>
              Отключить
            </Button>
          </div>
          <Button
            variant="contained"
            onClick={testSoundHandler}
            sx={{ width: 400, marginTop: 2 }}
          >
            Тест звукового оповещения
          </Button>
        </>
      )}

      {!connected && !codeSend && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Авторизация пользователя в телеграм:
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <InputMask
              mask="+7 (999) 999-99-99"
              value={phone}
              onChange={(e: { target: { value: SetStateAction<string> } }) => {
                setPhone(e.target.value);
              }}
            >
              {() => (
                <TextField
                  label="Phone number "
                  size="small"
                  sx={{ width: 300 }}
                />
              )}
            </InputMask>
            <Button
              sx={{ width: 250, marginLeft: 1 }}
              size="medium"
              onClick={sendCodeHandler}
            >
              Отправить код на телефон
            </Button>
          </div>
        </div>
      )}

      {!connected && codeSend && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Авторизация пользователя в телеграм:
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              label="Код авторизации из сообщения"
              size="small"
              sx={{ width: 300 }}
              value={code}
              onChange={(e: { target: { value: SetStateAction<string> } }) => {
                setCode(e.target.value);
              }}
            />

            <Button
              sx={{ width: 150, marginLeft: 1 }}
              size="medium"
              onClick={singInHandler}
            >
              Ввести код
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(TelegramSettings);
