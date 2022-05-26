import { inject, singleton } from 'tsyringe';
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { RefreshingAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';
import { PubSubClient } from '@twurple/pubsub';
import OAuth2Provider from 'electron-oauth-helper/dist/oauth2';
import AppStoreController from '../../controller/AppStore/AppStoreController';
import { IAPIAuthSecure } from '../../controller/AppStore/interfaces';
import AppWindowController from '../../controller/Windows/AppWindowController';

@singleton()
export default class TwitchService {
  private client_id = 'om9b4ylu7maljx5hr6h02f7gbejnoq';

  private client_secret = 'b47bb3v1l438u51h9jy6iof93pp1a8';

  private scope = [
    'analytics:read:extensions',
    'analytics:read:games',
    'bits:read',
    'channel:edit:commercial',
    'channel:manage:broadcast',
    'channel:manage:extensions',
    'channel:manage:polls',
    'channel:manage:predictions',
    'channel:manage:redemptions',
    'channel:manage:schedule',
    'channel:manage:videos',
    'channel:read:editors',
    'channel:read:goals',
    'channel:read:hype_train',
    'channel:read:polls',
    'channel:read:predictions',
    'channel:read:redemptions',
    'channel:read:stream_key',
    'channel:read:subscriptions',
    'clips:edit',
    'moderation:read',
    'moderator:manage:banned_users',
    'moderator:read:blocked_terms',
    'moderator:manage:blocked_terms',
    'moderator:manage:automod',
    'moderator:read:automod_settings',
    'moderator:manage:automod_settings',
    'moderator:read:chat_settings',
    'moderator:manage:chat_settings',
    'user:edit',
    'user:edit:follows',
    'user:manage:blocked_users',
    'user:read:blocked_users',
    'user:read:broadcast',
    'user:read:email',
    'user:read:follows',
    'user:read:subscriptions',
    'channel:moderate',
    'chat:edit',
    'chat:read',
    'whispers:read',
    'whispers:edit',
  ];

  private oAuthToken = '';

  private oAuthRefreshToken = '';

  private apiAuth = false;

  private apiHeaders: any;

  private API_URL = 'https://api.twitch.tv/helix';

  twitchAuthProvider;

  constructor(
    @inject(AppStoreController) private storeController: AppStoreController,
    @inject(AppWindowController) private windowController: AppWindowController
  ) {
    const authCred = storeController.store.get(
      'apiAuthSecure.twitch'
    ) as IAPIAuthSecure;

    if (authCred) {
      this.apiAuth = authCred.auth;
      this.oAuthToken = authCred.token;
      this.oAuthRefreshToken = authCred.refreshToken;
      this.apiHeaders = {
        Authorization: `Bearer ${this.oAuthToken}`,
        'Client-Id': this.client_id,
      };

      this.twitchAuthProvider = new RefreshingAuthProvider(
        {
          clientId: this.client_id,
          clientSecret: this.client_secret,
          onRefresh: (token) => {
            if (token.refreshToken && token.expiresIn) {
              this.storeAuthData({
                auth: true,
                token: token.accessToken,
                refreshToken: token.refreshToken,
                expiresIn: token.expiresIn,
                obtainmentTimestamp: token.obtainmentTimestamp,
              });
            }
          },
        },
        {
          accessToken: this.oAuthToken,
          refreshToken: this.oAuthRefreshToken,
          scope: this.scope,
          obtainmentTimestamp: 13123,
          expiresIn: 12312,
        }
      );
    }
  }

  twitchAuth() {
    if (!this.windowController.mainWindow) return;

    const config = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      scope: this.scope.join(' '),
      redirect_uri: 'http://localhost:1212/',
      authorize_url: 'https://id.twitch.tv/oauth2/authorize',
      response_type: 'code',
      access_token_url: 'https://id.twitch.tv/oauth2/token',
      login: true,
    };

    const window = new BrowserWindow({
      width: 500,
      height: 800,
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../../../.erb/dll/preload.js'),
      },
    });

    const provider = new OAuth2Provider(config);

    provider
      .perform(window)
      .then((resp) => {
        if (typeof resp !== 'string' && resp?.statusCode === 200) {
          const body = JSON.parse(resp.body);
          this.storeAuthData({
            auth: true,
            token: body.access_token,
            refreshToken: body.refresh_token,
            expiresIn: body.expires_in,
            obtainmentTimestamp: new Date(Date.now() + 14369 * 1000).getTime(),
          });
        }

        window.close();
        return resp;
      })
      .catch((error) => console.error('>>', error));
  }

  async twitchChatConnect() {
    const chatClient = new ChatClient({
      authProvider: this.twitchAuthProvider,
      channels: ['riogz'],
    });
    await chatClient.connect();
    return chatClient;
  }

  async twitchPubSubConnect() {
    const pubsub = new PubSubClient();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const auth = await pubsub.registerUserListener(this.twitchAuthProvider);

    return { pubsub, auth };
  }

  storeAuthData(params: IAPIAuthSecure): void {
    const { auth, token, refreshToken } = params;

    this.apiAuth = auth;
    this.oAuthToken = token;
    this.oAuthRefreshToken = refreshToken;

    this.storeController.store.set('apiAuthSecure.twitch', params);
  }
}
