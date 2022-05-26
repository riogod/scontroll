import { inject, singleton } from 'tsyringe';
import AppStoreController from '../../controller/AppStore/AppStoreController';
import AppWindowController from '../../controller/Windows/AppWindowController';
import { ITelegramStorageInstance } from './interface';
import { IAPIAuthSecure } from '../../controller/AppStore/interfaces';

const MTProto = require('mtproton');

@singleton()
export default class TelegramService {
  private api_id = '19502339';

  private api_hash = 'bbbe3254be2ce468c399255088033edd';

  private phone = '';

  private phone_code_hash = '';

  private apiAuth = false;

  private voiceBot = undefined;

  mprotoServiceProvider;

  constructor(
    @inject(AppStoreController) private storeController: AppStoreController,
    @inject(AppWindowController) private windowController: AppWindowController
  ) {
    this.mprotoServiceProvider = new MTProto({
      api_id: this.api_id,
      api_hash: this.api_hash,

      storageOptions: {
        instance: this.getStorageInstance(),
      },
    });

    if (!this.voiceBot) {
      this.getVoiceBotCred();
    }
  }

  getStorageInstance(): ITelegramStorageInstance {
    const saveHandle = (key: string, value: string) => {
      this.storeController.store.set(`mtProtoAPIServiceStorage.${key}`, value);
    };

    const readHandle = (key: string) =>
      (this.storeController.store.get(
        `mtProtoAPIServiceStorage.${key}`
      ) as string) || null;
    return {
      set(key: string, value: string): void {
        saveHandle(key, value);
      },
      get(key: string): string | null {
        return readHandle(key);
      },
    };
  }

  async sendCode(phone: string) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { phone_code_hash } = await this.mprotoServiceProvider.call(
      'auth.sendCode',
      {
        phone_number: phone,
        settings: {
          _: 'codeSettings',
        },
      }
    );
    this.phone = phone;
    this.phone_code_hash = phone_code_hash;
  }

  async signIn(code: string) {
    await this.mprotoServiceProvider.call('auth.signIn', {
      phone_code: code,
      phone_number: this.phone,
      phone_code_hash: this.phone_code_hash,
    });

    this.storeAuthData({ auth: true });
  }

  storeAuthData(params: Partial<IAPIAuthSecure>): void {
    const { auth } = params;

    this.apiAuth = auth || false;

    this.storeController.store.set('apiAuthSecure.telegram.auth', this.apiAuth);
  }

  async aliceSay(phrase: string) {
    console.log('aliceSay', phrase);
    if (!this.voiceBot) {
      await this.getVoiceBotCred();
    }
    if (this.voiceBot) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, access_hash } = this.voiceBot;

      await this.mprotoServiceProvider.call('messages.sendMessage', {
        clear_draft: true,
        peer: {
          _: 'inputPeerUser',
          user_id: id,
          access_hash,
        },
        message: `/say ${phrase}`,
        random_id:
          Math.ceil(Math.random() * 0xffffff) +
          Math.ceil(Math.random() * 0xffffff),
      });
    }
  }

  async aliceAsk(phrase: string) {
    if (!this.voiceBot) {
      await this.getVoiceBotCred();
    }
    if (this.voiceBot) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, access_hash } = this.voiceBot;

      await this.mprotoServiceProvider.call('messages.sendMessage', {
        clear_draft: true,
        peer: {
          _: 'inputPeerUser',
          user_id: id,
          access_hash,
        },
        message: `Ответь на вопрос: ${phrase}`,
        random_id:
          Math.ceil(Math.random() * 0xffffff) +
          Math.ceil(Math.random() * 0xffffff),
      });
    }
  }

  async getVoiceBotCred() {
    const { users } = await this.mprotoServiceProvider.call(
      'contacts.resolveUsername',
      {
        username: 'alice_speaker_bot',
      }
    );

    // eslint-disable-next-line prefer-destructuring
    this.voiceBot = users[0];
  }

  async getUser() {
    try {
      const user = await this.mprotoServiceProvider.call('users.getFullUser', {
        id: {
          _: 'inputUserSelf',
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }
}
