import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const validChannels = [
  'ipc-example',
  'app-settings-open-window',
  'app-get-settings',
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
