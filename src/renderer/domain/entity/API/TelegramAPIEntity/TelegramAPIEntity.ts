import { singleton } from 'tsyringe';

import { makeAutoObservable, toJS } from 'mobx';
import { IAPIAuthSecure } from '../../../../../main/controller/AppStore/interfaces';

@singleton()
export default class TelegramAPIEntity {
  loaded = false;

  private twitchAPICred: Partial<IAPIAuthSecure> = {
    auth: false,
  };

  get isTelegramAuth(): boolean {
    return this.twitchAPICred.auth || false;
  }

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    window.electron.ipcRenderer
      .invoke('app-get-settings', 'apiAuthSecure.telegram')
      .then((cred: IAPIAuthSecure) => {
        console.log(toJS(cred));
        this.twitchAPICred = toJS(cred);
        this.loaded = true;

        return cred;
      })
      .catch((e: never) => {
        throw new Error(e);
      });
  }
}
