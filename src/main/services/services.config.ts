import { IServiceConfig } from './interface';

export const servicesConfig: IServiceConfig = {
  app: {
    name: 'App',
    path: '/app',
  },
  twitch: {
    name: 'Twitch API',
    path: '/twitch',
  },
  telegram: {
    name: 'Telegram API',
    path: '/telegram',
  },
};
