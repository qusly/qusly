import { ipcRenderer } from 'electron';

import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';
import { ExtIcons } from '../models';

export class Store {
  public addTab = new AddTabStore();
  public tabs = new TabsStore();

  public extIcons: ExtIcons = {};

  constructor() {
    ipcRenderer.on('get-ext-icon', (e: any, { ext, data }: any) => {
      this.extIcons[ext] = data;
    });
  }

  public get session() {
    return this.tabs.selectedTab.session;
  }

  public loadIcon(ext: string) {
    if (this.extIcons[ext] == null) {
      ipcRenderer.send('get-ext-icon', ext);
    }
  }
}

export default new Store();
