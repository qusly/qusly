import { observable, computed } from 'mobx';
import store from '.';

export type SidebarContent = 'explorer' | 'sites' | 'search' | 'transfer';

export class ActivitybarStore {
  @observable
  public _content: SidebarContent = 'explorer';

  public set content(value: SidebarContent) {
    this._content = value;
  }

  @computed
  public get content(): SidebarContent {
    if (!store.sessions.current) return 'sites';
    return this._content;
  }
}
