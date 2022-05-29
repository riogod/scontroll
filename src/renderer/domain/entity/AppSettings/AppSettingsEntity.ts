import { singleton } from 'tsyringe';
import { set } from 'lodash';

import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { IAppSettings } from '../../../../main/controller/AppStore/interfaces';
import { IUIThemeSettings } from './interfaces';

@singleton()
export default class AppSettingsEntity {
  loaded = false;

  private appSettings: IAppSettings = {
    UISettings: {
      themeMode: 'light',
    },
    mainWindow: {
      width: 1024,
      height: 768,
    },
  };

  get getThemeSettings(): IUIThemeSettings {
    return {
      themeMode: this.appSettings.UISettings.themeMode,
    };
  }

  constructor() {
    makeAutoObservable(this);
    this.initAppSettings();

    window.electron.ipcRenderer.on('app-update-render-settings', () => {
      this.initAppSettings();
    });
  }

  initAppSettings() {
    window.electron.ipcRenderer
      .invoke('app-get-settings', 'app')
      .then((settings: IAppSettings) => {
        runInAction(() => {
          this.appSettings = toJS(settings);
          this.loaded = true;
        });
        return settings;
      })
      .catch((e: never) => {
        throw new Error(e);
      });
  }

  setAppSettings(path: string, value: string | number | boolean): void {
    if (!this.appSettings) return;
    set<IAppSettings>(this.appSettings, path, value);
    this.syncSettings();
  }

  syncSettings(): void {
    window.electron.ipcRenderer.invoke('app-set-settings', {
      storePath: 'app',
      storeValue: toJS(this.appSettings),
    });
  }
}
