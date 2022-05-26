import { singleton } from 'tsyringe';
import Store from 'electron-store';
import { appInitSettings } from './initData/appInitSettings';

@singleton()
export default class AppStoreController {
  private _store = new Store({ defaults: appInitSettings });

  get store() {
    return this._store;
  }

  constructor() {
    // this._store.clear();

    console.log(this._store.store);
  }
}
