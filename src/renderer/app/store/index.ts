import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';
import { ActivitybarStore } from './activitybar';
import { SessionsStore } from './sessions';
import { PagesStore } from './pages';

export class Store {
  public addTab = new AddTabStore();
  public tabs = new TabsStore();
  public activitybar = new ActivitybarStore();
  public sessions = new SessionsStore();
  public pages = new PagesStore();
}

export default new Store();
