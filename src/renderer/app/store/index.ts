import { ipcRenderer } from 'electron';
import { observable } from 'mobx';

import { TabsStore } from './tabs';
import { AddTabStore } from './add-tab';
import { SessionsStore } from './sessions';
import { PagesStore } from './pages';
import { IconsStore } from './icons';

export class Store {
  public tabs = new TabsStore();
  public addTab = new AddTabStore();
  public sessions = new SessionsStore();
  public pages = new PagesStore();
  public icons = new IconsStore();

  @observable
  public updateInfo = {
    available: false,
    version: '',
  };

  constructor() {
    ipcRenderer.on('update-available', (e, version: string) => {
      this.updateInfo.version = version;
      this.updateInfo.available = true;
    });
  }
}

export default new Store();
