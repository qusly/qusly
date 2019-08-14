import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';
import { ActivitybarStore } from './activitybar';

export class Store {
  public addTab = new AddTabStore();
  public tabs = new TabsStore();
  public activitybar = new ActivitybarStore();
}

export default new Store();
