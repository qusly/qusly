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

  public ref = React.createRef<HTMLDivElement>();

  @action
  public show = (e: React.MouseEvent) => {
    if (!this.visible) {
      window.addEventListener('click', this.onWindowMouseDown);
    }

    this.pos = this.calcPos(e.clientX, e.clientY);
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

  public calcPos(x: number, y: number) {
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;

    const width = this.ref.current.clientWidth;
    const height = this.ref.current.clientHeight;

    if (y + height > screenHeight && y - height > 0) {
      y -= height;
    }

    if (x + width > screenWidth) {
      x -= width;
    }

    return {
      top: y,
      left: x,
    };
  }
}
