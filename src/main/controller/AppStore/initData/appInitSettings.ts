import { IAppSettingsStore } from '../interfaces';

export const appInitSettings: IAppSettingsStore = {
  app: {
    mainWindow: {
      width: 1024,
      height: 768,
    },
    UISettings: {
      themeMode: 'light',
    },
  },
  apiAuthSecure: {
    twitch: {
      auth: false,
      token: '',
      refreshToken: '',
      obtainmentTimestamp: 0,
      expiresIn: 0,
    },
    telegram: {
      auth: false,
      token: '',
      refreshToken: '',
      obtainmentTimestamp: 0,
      expiresIn: 0,
    },
  },
  mtProtoAPIServiceStorage: {},
  init: true,
};
