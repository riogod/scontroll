import { EService } from '../../services';

export interface IAuthCred {
  oauthCreds: Record<EService, IOAuthCredentialItem>;
}

export interface IOAuthCredentialItem {
  clientId: string;
  clientSecret: string;
}
