import { ipcMain } from 'electron';
import { container } from 'tsyringe';
import AppWindowController from '../../controller/Windows/AppWindowController';
import AppStoreController from '../../controller/AppStore/AppStoreController';

const appWindowController = container.resolve(AppWindowController);
const appStoreController = container.resolve(AppStoreController);

ipcMain.on('app-settings-open-window', async (_event) => {
  appWindowController.showSettingsWindow();
});

ipcMain.on('app-settings-close-window', async (_event) => {
  appWindowController.hideSettingsWindow();
});

ipcMain.on('app-stream-settings-open-window', async (_event) => {
  appWindowController.showStreamSettingsWindow();
});

ipcMain.on('app-stream-settings-close-window', async (_event) => {
  appWindowController.hideStreamSettingsWindow();
});

ipcMain.handle('app-get-settings', (_event, storeSettings: string) => {
  return appStoreController.store.get(storeSettings);
});

ipcMain.handle('app-set-settings', (_event, args) => {
  appStoreController.store.set(args.storePath, args.storeValue);
  // _event.sender.send('app-update-render-settings');
  appWindowController.mainWindow?.webContents.send(
    'app-update-render-settings'
  );
  appWindowController.streamSettingsWindow?.webContents.send(
    'app-update-render-settings'
  );
  return appStoreController.store.get(args.storePath);
});
