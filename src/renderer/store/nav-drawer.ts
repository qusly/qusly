import { observable } from 'mobx';

export class NavDrawerStore {
  @observable
  public selectedItem = 0;
}
