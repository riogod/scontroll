import { Button, TextField, Typography } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

export const TelegramSettings = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [connected, setConnected] = useState(false);
  const [codeSend, setCodeSend] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'loading-telegram-mtproto-service',
      (arg) => {
        setLoading(arg.loading);
      }
    );
  }, []);

  //  const checkStatus = () => window.telegram.ipcRenderer.subscribeTelegramStatus('_connect_Telegram').then((data: any) => {
  //     setConnected(data.connected);
  //   });
  // checkStatus();

  const logoutHandler = async () => {
    // await window.telegram.ipcRenderer.logout();
    // checkStatus();
  };

  const sendCodeHandler = () => {
    // window.telegram.ipcRenderer.sendCode(phone);
    // setCodeSend(true);
  };

  const testSoundHandler = () => {
    // window.telegram.ipcRenderer.aliceSay('Ха-ха-ха-ха! Работает сученька!');
  };

  const singInHandler = async () => {
    // try {
    // await window.telegram.ipcRenderer.singIn(code);
    // } finally {
    //   checkStatus();
    // }
  };

  if (loading) {
    return <>loading...</>;
  }

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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Код авторизации из сообщения"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            size="small"
            sx={{ width: 400, marginBottom: 2 }}
          >
            <InputMask mask="(0)999 999 99 99" maskChar=" " />
          </TextField>

          <Button sx={{ width: 400 }} onClick={singInHandler}>
            Отправить код
          </Button>
        </div>
      )}

      {/*<TextField id="outlined-basic" label="Outlined" variant="outlined" value={phone} onChange={(e) => {*/}
      {/*  setPhone(e.target.value)*/}
      {/*}} />*/}
      {/*<button type="button" onClick={() => {*/}
      {/*  window.telegram.ipcRenderer.sendCode(phone);*/}
      {/*}} > SendPhone </button>*/}

      {/*<TextField id="outlined-basic" label="Outlined" variant="outlined" value={code} onChange={(e) => {*/}
      {/*  setCode(e.target.value)*/}
      {/*}} />*/}
      {/*<button type="button" onClick={() => {*/}
      {/*  window.telegram.ipcRenderer.singIn(code);*/}
      {/*}} > Send Code </button>*/}
      {/*<button type="button" onClick={() => {*/}

      {/*}} > Logout </button>*/}
      {/*<button type="button" onClick={() => {*/}

      {/*}} > STATUS </button>*/}
    </div>
  );
};
