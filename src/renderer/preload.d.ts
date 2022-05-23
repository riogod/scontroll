declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send(channel: string, args?: any): void;
        invoke(channel: string, args: any): any;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
    appApi: {
      diContainer: {
        getContainer(): void;
      };
    };
  }
}

export {};
