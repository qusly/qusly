import { observable } from 'mobx';

import { TabsStore } from './tabs';
import { AddTabStore } from './add-tab';
import { PathViewStore } from './path-view';
import { NavDrawerStore } from './nav-drawer';
import { InfoPanelStore } from './info-panel';

export class Store {
  public tabsStore = new TabsStore();
  public addTabStore = new AddTabStore();
  public pathViewStore = new PathViewStore();
  public navDrawerStore = new NavDrawerStore();
  public infoPanelStore = new InfoPanelStore();

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
