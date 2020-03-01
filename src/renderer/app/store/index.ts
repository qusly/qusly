import { ipcRenderer } from 'electron';
import { observable } from 'mobx';

import { TabsStore } from './tabs';
import { AddTabStore } from './add-tab';
import { SessionsStore } from './sessions';
import { PagesStore } from './pages';
import { IconsStore } from './icons';
import { SidebarStore } from './sidebar';
import { ContextMenuStore } from './context-menu';
import { DialogStore } from './dialog';

export class Store {
  public tabs = new TabsStore();
  public addTab = new AddTabStore();
  public sessions = new SessionsStore();
  public pages = new PagesStore();
  public icons = new IconsStore();
  public sidebar = new SidebarStore();
  public contextMenu = new ContextMenuStore();
  public dialog = new DialogStore();

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

    window.addEventListener('mouseup', this.onWindowMouseUp);
  }

  private onWindowMouseUp = (e: MouseEvent) => {
    if (e.button === 3) {
      this.pages.current.history.goBack();
    } else if (e.button === 4) {
      this.pages.current.history.goForward();
    }
  };
}

export default new Store();
