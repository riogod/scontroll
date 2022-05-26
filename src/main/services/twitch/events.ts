import { container } from 'tsyringe';
import { ipcMain } from 'electron';
import { PubSubRedemptionMessage } from '@twurple/pubsub';
import TwitchService from './TwitchService';
import TelegramService from '../telegram/TelegramService';

const twitchService = container.resolve(TwitchService);
const telegramService = container.resolve(TelegramService);

ipcMain.on('app-oauth-open-window', async (_event) => {
  twitchService.twitchAuth();
});

// twitchService
//   .twitchChatConnect()
//   .then((client) => {
//     client.onMessage((channel, user, message) => {
//       console.log(`[${channel}] ${user}: ${message} `);
//     });
//   })
//   .catch((e) => console.error(e));

twitchService
  .twitchPubSubConnect()
  .then(({ pubsub, auth }) => {
    pubsub.onRedemption(auth, (message: PubSubRedemptionMessage) => {
      switch (message.rewardTitle) {
        case 'Озвучить текст':
          telegramService.aliceSay(
            `${message.userName} говорит: ${message.message}`
          );
          break;
        case 'Задать вопрос Алисе':
          telegramService.aliceAsk(message.message);
          break;
        default:
      }
    });
  })
  .catch((e) => console.error(e));
