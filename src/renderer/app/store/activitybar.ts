import { observable } from 'mobx';

export type SidebarContent = 'explorer' | 'sites-manager' | 'search' | 'transfer';

export class ActivitybarStore {
  @observable
  public content: SidebarContent = 'explorer';
}
