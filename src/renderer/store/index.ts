import { observable } from 'mobx';
import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';

export class Store {
  public addTab = new AddTabStore();
  public tabs = new TabsStore();
}

export default new Store();
