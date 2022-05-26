export interface IAppSettingsStore {
  app: IAppSettings;
  apiAuthSecure: Record<string, IAPIAuthSecure>;
  init: true;
  mtProtoAPIServiceStorage: Record<string, string>;
}
export interface IAppSettings {
  mainWindow: {
    width: number;
    height: number;
    x?: number;
    y?: number;
  };
  UISettings: {
    themeMode: 'light' | 'dark';
  };
}

export interface IAPIAuthSecure {
  auth: boolean;
  token: string;
  refreshToken: string;
  obtainmentTimestamp: number;
  expiresIn: number;
}
