import { ipcRenderer, IpcMessageEvent } from 'electron';
import { observable } from 'mobx';

import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';
import { IconsStore } from './icons';
import { ActivitybarStore } from './activitybar';
import { SessionsStore } from './sessions';
import { PagesStore } from './pages';

export class Store {
  public addTab = new AddTabStore();
  public tabs = new TabsStore();
  public icons = new IconsStore();
  public activitybar = new ActivitybarStore();
  public sessions = new SessionsStore();
  public pages = new PagesStore();

  @observable
  public updateInfo = {
    available: false,
    version: '',
  };

  constructor() {
    ipcRenderer.on(
      'update-available',
      (e, version: string) => {
        this.updateInfo.version = version;
        this.updateInfo.available = true;
      },
    );
  }
}

export default new Store();
