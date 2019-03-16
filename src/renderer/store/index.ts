import { observable } from 'mobx';

import { TabsStore } from './tabs';
import { AddTabStore } from './add-tab';
import { PathViewStore } from './path-view';

export class Store {
  public tabsStore = new TabsStore();
  public addTabStore = new AddTabStore();
  public pathViewStore = new PathViewStore();

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

  constructor() {
    window.addEventListener('mousedown', this.onWindowMouseDown);
  }

  public onWindowMouseDown = () => {
    this.pathViewStore.inputVisible = false;
  };
}

export default new Store();
