import { ipcRenderer } from 'electron';
import { observable } from 'mobx';

import { TabsStore } from './tabs';
import { AddTabStore } from './add-tab';

export class Store {
  public tabs = new TabsStore();
  public addTab = new AddTabStore();

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
