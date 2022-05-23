import { singleton } from 'tsyringe';
import Store from 'electron-store';
import { appUISettings } from './initData/app.UISettings';

@singleton()
export default class AppStoreController {
  private _store = new Store();

  get store() {
    return this._store;
  }

  constructor() {
    console.log(this._store.store);
    if (!this._store.has('app.init')) {
      this._store.set('app', appUISettings);
    }

    this._store.set('app.init', 1);
  }
}
