import * as React from 'react';
import { observable, action } from 'mobx';

export interface ContextMenuPos {
  top?: number;
  left?: number;
}

export class ContextMenuHandler {
  @observable
  public visible = false;

  @observable
  public pos: ContextMenuPos = {};

  @action
  public show = (e: React.MouseEvent) => {
    if (!this.visible) {
      window.addEventListener('click', this.onWindowMouseDown);
    }

    this.pos = {
      top: e.clientY,
      left: e.clientX,
    }

    this.visible = true;
  }

  public hide = () => {
    console.log('hide');
    this.visible = false;
    window.removeEventListener('click', this.onWindowMouseDown);
  }

  public onWindowMouseDown = () => {
    this.hide();
  }
}
