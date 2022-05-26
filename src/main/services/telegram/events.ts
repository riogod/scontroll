import { ipcMain } from 'electron';
import { container } from 'tsyringe';
import TelegramService from './TelegramService';

const telegramService = container.resolve(TelegramService);

ipcMain.on('telegram-auth-send-code', async (_event, args) => {
  telegramService.sendCode(args.phone);
});

ipcMain.on('telegram-auth-sing-in', async (_event, args) => {
  telegramService.signIn(args.code);
});
