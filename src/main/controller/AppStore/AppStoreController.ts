import { singleton } from 'tsyringe';
import Store from 'electron-store';

@singleton()
export default class AppStoreController {
  private _store = new Store();

  get store() {
    return this._store;
  }
}
