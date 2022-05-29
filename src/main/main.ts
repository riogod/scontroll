/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'reflect-metadata';
import { app, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { container } from 'tsyringe';
import AppWindowController from './controller/Windows/AppWindowController';
import { servicesConfig } from './services/services.config';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const appWindowController = container.resolve(AppWindowController);

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

Object.keys(servicesConfig).forEach((el) => {
  import(`./services${servicesConfig[el].path}/events`);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  // require('electron-debug')();
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // console.log('All closed!!', process.platform);

  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  // if (process.platform !== 'darwin') {
  app.quit();
  // }
});

app.on('ready', () => {
  // globalShortcut.register('Esc', () => {
  //   if (appWindowController.settingsWindow?.isVisible()) {
  //     appWindowController.settingsWindow?.hide();
  //     appWindowController.mainWindow?.setFocusable(true);
  //     appWindowController.mainWindow?.focus();
  //   }
  // });
});
app
  .whenReady()
  .then(() => {
    appWindowController.initWindows();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (appWindowController.mainWindow === null)
        appWindowController.initWindows();
    });
  })
  .catch(console.log);
