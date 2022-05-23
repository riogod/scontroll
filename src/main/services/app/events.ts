import { ipcMain } from 'electron';
import { container } from 'tsyringe';
import AppWindowController from '../../controller/Windows/AppWindowController';
import AppStoreController from '../../controller/AppStore/AppStoreController';

const appWindowController = container.resolve(AppWindowController);
const appStoreController = container.resolve(AppStoreController);

ipcMain.on('app-settings-open-window', async (_event) => {
  appWindowController.showSettingsWindow();
});

ipcMain.handle('app-get-settings', (_event, storeSettings: string) => {
  return appStoreController.store.get(storeSettings);
});

ipcMain.handle('app-set-settings', (_event, args) => {
  appStoreController.store.set(args.storePath, args.storeValue);
  return appStoreController.store.get(args.storePath);
});
