import { observable } from 'mobx';

export type MenuContent = 'file-tree' | 'transfers' | 'search' | 'sites';

export class MenuStore {
  @observable
  public content: MenuContent = 'transfers';
}
