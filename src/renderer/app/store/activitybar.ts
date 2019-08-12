import { observable } from 'mobx';

export type ActivitybarContent = 'explorer' | 'sites-manager' | 'search' | 'transfer';

export class ActivitybarStore {
  @observable
  public content: ActivitybarContent = 'explorer';
}
