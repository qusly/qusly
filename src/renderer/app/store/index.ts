import { ipcRenderer } from 'electron';
import { observable } from 'mobx';

import { IPos } from '~/interfaces';
import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';
import { IconsStore } from './icons';
import { ActivitybarStore } from './activitybar';
import { SessionsStore } from './sessions';
import { PagesStore } from './pages';
import { PathViewStore } from './path-view';
import { ContextMenuStore } from './context-menu';

export class Store {
  public addTab = new AddTabStore();
  public tabs = new TabsStore();
  public icons = new IconsStore();
  public activitybar = new ActivitybarStore();
  public sessions = new SessionsStore();
  public pages = new PagesStore();
  public pathView = new PathViewStore();
  public contextMenu = new ContextMenuStore();

  @observable
  public updateInfo = {
    available: false,
    version: '',
  };

  public mousePos: IPos = {
    top: 0,
    left: 0,
  }

  constructor() {
    ipcRenderer.on(
      'update-available',
      (e, version: string) => {
        this.updateInfo.version = version;
        this.updateInfo.available = true;
      },
    );

    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mousedown', this.onWindowMouseDown);
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mousedown', this.onWindowMouseDown);
  }

  private onWindowMouseMove = (e: MouseEvent) => {
    this.mousePos = {
      top: e.y,
      left: e.x,
    }
  }

  private onWindowMouseDown = () => {
    this.contextMenu.visible = false;
  }
}

export default new Store();
