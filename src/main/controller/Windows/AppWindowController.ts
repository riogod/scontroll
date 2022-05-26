import { inject, singleton } from 'tsyringe';
import { app, BrowserWindow, shell } from 'electron';

import path from 'path';
import { resolveHtmlPath } from '../../util';
import MenuBuilder from '../../menu';
import AppStoreController from '../AppStore/AppStoreController';

@singleton()
export default class AppWindowController {
  private _mainWindowID: number = -1;

  private _settingsWindowID: number = -1;

  private isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

  RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../../../assets');

  get mainWindow(): BrowserWindow | null {
    return BrowserWindow.fromId(this._mainWindowID);
  }

  get mainWindowID() {
    return this._mainWindowID;
  }

  get settingsWindow(): BrowserWindow | null {
    return BrowserWindow.fromId(this._settingsWindowID);
  }

  constructor(
    @inject(AppStoreController) private storeController: AppStoreController
  ) {}

  initWindows = async () => {
    const installExtensions = async () => {
      // eslint-disable-next-line global-require
      const installer = require('electron-devtools-installer');
      const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
      const extensions = ['REACT_DEVELOPER_TOOLS'];

      return installer
        .default(
          extensions.map((name) => installer[name]),
          forceDownload
        )
        .catch(console.log);
    };

    if (this.isDebug) {
      await installExtensions();
    }
    // this.storeController.store.delete('app.mainWindow.x');
    // this.storeController.store.delete('app.mainWindow.y');
    const opts = {
      show: false,
      width:
        (this.storeController.store.get('app.mainWindow.width') as number) ||
        1024,
      height:
        (this.storeController.store.get('app.mainWindow.height') as number) ||
        728,
      modal: true,
      icon: this.getAssetPath('icon.png'),
      // frame: false,
      webPreferences: {
        nodeIntegration: true,
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../../../.erb/dll/preload.js'),
      },
    };

    if (this.storeController.store.has('app.mainWindow')) {
      Object.assign(opts, this.storeController.store.get('app.mainWindow'));
    }

    const mainWindow = new BrowserWindow(opts);

    this.setMainWindowId(mainWindow.id);
    mainWindow.loadURL(resolveHtmlPath('index.html#/'));

    mainWindow.on('ready-to-show', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
      }
    });

    mainWindow.on('resized', () => {
      if (!this.mainWindow) {
        return;
      }
      const size = this.mainWindow.getSize();
      this.storeController.store.set('app.mainWindow.width', size[0]);
      this.storeController.store.set('app.mainWindow.height', size[1]);
    });
    mainWindow.on('moved', () => {
      if (!this.mainWindow) {
        return;
      }
      const pos = this.mainWindow.getPosition();
      this.storeController.store.set('app.mainWindow.x', pos[0]);
      this.storeController.store.set('app.mainWindow.y', pos[1]);
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);

      return { action: 'deny' };
    });

    mainWindow.on('closed', () => {
      this._mainWindowID = -1;
      BrowserWindow.getAllWindows().forEach((window) => {
        window.close();
      });
    });

    this.createSettingsWindow();
  };

  setMainWindowId(id: number) {
    this._mainWindowID = id;
  }

  createSettingsWindow() {
    if (!this.mainWindow) {
      return;
    }

    const settingsWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 768,
      skipTaskbar: true,
      center: true,
      frame: false,
      movable: false,
      resizable: false,
      minimizable: false,
      maximizable: false,
      parent: this.mainWindow,
      webPreferences: {
        nodeIntegration: true,
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../../../.erb/dll/preload.js'),
      },
    });

    settingsWindow.loadURL(resolveHtmlPath('index.html').concat('#/test'));
    this._settingsWindowID = settingsWindow.id;

    settingsWindow.on('close', (event) => {
      event.preventDefault();
      settingsWindow.hide();
    });
  }

  showSettingsWindow() {
    this.settingsWindow?.show();
  }

  getAssetPath(...paths: string[]): string {
    return path.join(this.RESOURCES_PATH, ...paths);
  }
}
