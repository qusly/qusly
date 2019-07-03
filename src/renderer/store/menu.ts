import { observable } from 'mobx';

export type MenuContent = 'file-tree' | 'transfer' | 'search' | 'sites';

export class MenuStore {
  @observable
  public content: MenuContent = 'sites';
}
