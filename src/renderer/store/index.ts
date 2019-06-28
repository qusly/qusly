import { ipcRenderer, IpcMessageEvent } from 'electron';
import { observable } from 'mobx';

import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';
import { FaviconsStore } from './favicons';
import { SessionsStore } from './sessions';
import { PagesStore } from './pages';
import { MenuStore } from './menu';
import { SitesStore } from './sites';
import { OverlayStore } from './overlay';
import { ContextMenuHandler } from '../models';
import { ContextMenuStore } from './context-menu';

export class Store {
  public addTab = new AddTabStore();
  public tabs = new TabsStore();
  public sessions = new SessionsStore();
  public pages = new PagesStore();
  public favicons = new FaviconsStore();
  public menu = new MenuStore();
  public sites = new SitesStore();
  public overlay = new OverlayStore();
  public contextMenu = new ContextMenuStore();

  @observable
  public updateInfo = {
    available: false,
    version: '',
  };

  constructor() {
    ipcRenderer.on(
      'update-available',
      (e: IpcMessageEvent, version: string) => {
        this.updateInfo.version = version;
        this.updateInfo.available = true;
      },
    );
  }
}

export default new Store();
