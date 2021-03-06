import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const validChannels = [
  'ipc-example',
  'app-settings-open-window',
  'app-oauth-open-window',
  'app-get-settings',
  'app-set-settings',
  'telegram-auth-send-code',
  'telegram-auth-sing-in',
  'app-update-render-settings',
  'app-stream-settings-open-window',
  'app-stream-settings-close-window',
];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(channel: string, args: any = '') {
      ipcRenderer.send(channel, args);
    },
    invoke(channel: string, args: any) {
      return ipcRenderer.invoke(channel, args);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
});
