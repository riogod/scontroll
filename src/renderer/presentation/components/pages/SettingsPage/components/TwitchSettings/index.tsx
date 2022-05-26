import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import useContainer from '../../../../../hooks/useContainer/useContainer';
import TwitchAPIEntity from '../../../../../../domain/entity/API/TwitchAPIEntity/TwitchAPIEntity';

const TwitchSettings = () => {
  const twitchEntity = useContainer<TwitchAPIEntity>(TwitchAPIEntity);

  const oAuthHandle = () => {
    window.electron.ipcRenderer.send('app-oauth-open-window');
  };

  if (!twitchEntity.loaded) return <>Loading...</>;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!twitchEntity.isTwitchAuth ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            sx={{ width: 400, marginTop: 2 }}
            onClick={oAuthHandle}
          >
            Подключить учетную запись
          </Button>
        </div>
      ) : (
        <>Подключено</>
      )}
    </div>
  );
};

export default observer(TwitchSettings);
