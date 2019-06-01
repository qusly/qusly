import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';
import { IconsStore } from './icons';

export class Store {
  public addTab = new AddTabStore();

  public tabs = new TabsStore();

  public icons = new IconsStore();

  public get session() {
    return this.tabs.selectedTab.session;
  }
}

export default new Store();
