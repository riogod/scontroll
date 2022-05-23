import { makeAutoObservable } from 'mobx';
import { singleton } from 'tsyringe';
import { IAuthCredModel } from './interface';
import { AuthCred } from '../structure/AuthCred';

import { IOAuthCredentialItem } from '../structure/interface';
import { EService } from '../../services';

@singleton()
export class AuthCredModel implements IAuthCredModel {
  protected authCredList = new AuthCred();

  constructor() {
    makeAutoObservable(this);
  }

  getOAuthCred(service: EService): IOAuthCredentialItem | undefined {
    if (
      !this.authCredList.oauthCreds[service].clientSecret &&
      !this.authCredList.oauthCreds[service].clientId
    ) {
      return undefined;
    }

    return this.authCredList.oauthCreds[service];
  }

  updateOAuthCred(service: EService, item: IOAuthCredentialItem): void {
    this.authCredList.oauthCreds[service] = { ...item };
  }
}
