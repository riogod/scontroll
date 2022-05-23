import { IAuthCred, IOAuthCredentialItem } from './interface';
import { EService } from '../../services';

const defaultAuth: IOAuthCredentialItem = {
  clientId: '',
  clientSecret: '',
};

export class AuthCred implements IAuthCred {
  oauthCreds = {
    [EService.TWITCH]: defaultAuth,
  };
}
