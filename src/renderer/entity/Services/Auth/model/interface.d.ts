import { IOAuthCredentialItem } from '../structure/interface';
import { EService } from '../../services';

export interface IAuthCredModel {
  getOAuthCred(service: EService): IOAuthCredentialItem | undefined;
  updateOAuthCred(service: EService, item: IOAuthCredentialItem): void;
}
