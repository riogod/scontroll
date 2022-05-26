import { singleton } from 'tsyringe';

import { makeAutoObservable, toJS } from 'mobx';
import { IAPIAuthSecure } from '../../../../../main/controller/AppStore/interfaces';

@singleton()
export default class TwitchAPIEntity {
  loaded = false;

  private twitchAPICred: Partial<IAPIAuthSecure> = {
    auth: false,
    token: '',
    refreshToken: '',
  };

  get isTwitchAuth(): boolean {
    return this.twitchAPICred.auth || false;
  }

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    window.electron.ipcRenderer
      .invoke('app-get-settings', 'apiAuthSecure.twitch')
      .then((cred: IAPIAuthSecure) => {
        this.twitchAPICred = toJS(cred);
        this.loaded = true;

        return cred;
      })
      .catch((e: never) => {
        throw new Error(e);
      });
  }
}
