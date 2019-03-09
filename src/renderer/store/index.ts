import { observable } from 'mobx';
import { TabsStore } from './tabs';

export class Store {
  public tabsStore = new TabsStore();

  @observable
  public isFullscreen = false;

  @observable
  public updateInfo = {
    available: false,
    version: '',
  };

  public mouse = {
    x: 0,
    y: 0,
  };
}

export default new Store();
