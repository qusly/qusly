import { observable } from 'mobx';

export type ISidebarContent = 'explorer' | 'sites' | 'search' | 'transfer';

export class SidebarStore {
  @observable
  public content: ISidebarContent = 'explorer';
}
