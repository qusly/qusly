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
import { ContextMenuStore } from './context-menu';
import { SelectionStore } from './selection';
import { DraggingStore } from './dragging';
import { Pos } from '../models';

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
  public selection = new SelectionStore();
  public dragging = new DraggingStore();

  @observable
  public updateInfo = {
    available: false,
    version: '',
  };

  public mousePos: Pos = {};

  public startPos: Pos = {};

  constructor() {
    ipcRenderer.on(
      'update-available',
      (e: IpcMessageEvent, version: string) => {
        this.updateInfo.version = version;
        this.updateInfo.available = true;
      },
    );

    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('mousedown', this.onWindowMouseDown);
    window.removeEventListener('mousemove', this.onWindowMouseMove);

    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('mousedown', this.onWindowMouseDown);
    window.addEventListener('mousemove', this.onWindowMouseMove);
  }

  public onWindowClick = () => {
    if (this.dragging.active) {
      this.pages.current.dragFiles();
    }

    this.selection.hide();
    this.dragging.hide()
  }

  public onWindowMouseDown = () => {
    this.contextMenu.hide();
  }

  public onWindowMouseMove = (e: MouseEvent) => {
    this.mousePos = {
      top: e.pageY,
      left: e.pageX,
    }

    this.selection.update();
    this.dragging.update();
  }

  public relativeMousePos(parent: HTMLElement) {
    const { top, left } = this.mousePos;
    return {
      top: top + parent.scrollTop,
      left: left + + parent.scrollLeft,
    }
  }

  public get cursorDistance() {
    return Math.sqrt(Math.pow(this.mousePos.top - this.startPos.top, 2) +
      Math.pow(this.mousePos.left - this.startPos.left, 2));
  }
}

export default new Store();
