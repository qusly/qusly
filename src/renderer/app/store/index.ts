import { ipcRenderer } from 'electron';
import { observable, action } from 'mobx';

import { IPos } from '~/interfaces';
import { AddTabStore } from './add-tab';
import { TabsStore } from './tabs';
import { IconsStore } from './icons';
import { ActivitybarStore } from './activitybar';
import { SessionsStore } from './sessions';
import { PagesStore } from './pages';
import { PathViewStore } from './path-view';
import { ContextMenuStore } from './context-menu';
import { DragStore } from './drag';
import { DialogStore } from './dialog';
import { SitesStore } from './sites';
import { TransferStore } from './transfer';

export class Store {
  public addTab = new AddTabStore();
  public tabs = new TabsStore();
  public icons = new IconsStore();
  public activitybar = new ActivitybarStore();
  public sessions = new SessionsStore();
  public pages = new PagesStore();
  public pathView = new PathViewStore();
  public contextMenu = new ContextMenuStore();
  public drag = new DragStore();
  public dialog = new DialogStore();
  public sites = new SitesStore();
  public transfer = new TransferStore();

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
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('mouseup', this.onWindowMouseUp);

    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mousedown', this.onWindowMouseDown);
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('mouseup', this.onWindowMouseUp);
  }

  @action
  private onWindowMouseMove = (e: MouseEvent) => {
    this.mousePos = {
      top: e.pageY,
      left: e.pageX,
    }

    this.drag.update(this.mousePos);
  }

  @action
  private onWindowMouseDown = () => {
    this.pathView.inputVisible = false;
    this.contextMenu.visible = false;
  }

  @action
  private onWindowClick = () => {
    this.drag.hide();
  }

  @action
  private onWindowMouseUp = (e: MouseEvent) => {
    if (e.button === 3) {
      this.pages.current.path.goBack();
    } else if (e.button === 4) {
      this.pages.current.path.goForward();
    }
  }
}

export default new Store();
