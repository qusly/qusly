import * as React from 'react';
import { observable } from 'mobx';

import store from '.';
import { setStyle } from '../utils';

export class DraggingStore {
  @observable
  public visible = false;

  public active = false;

  public ref = React.createRef<HTMLDivElement>();

  public show() {
    this.active = true;
    this.update();
  }

  public hide = () => {
    this.active = false;
    this.visible = false;
  }

  public update() {
    if (!this.active) return;
    const { top, left } = store.mousePos;

    setStyle(this.ref.current, {
      top: `${top}px`,
      left: `${left}px`,
    });

    this.visible = this.distance > 5;
  }

  public get distance() {
    const { mousePos, startPos } = store;
    return Math.sqrt(Math.pow(mousePos.top - startPos.top, 2) + Math.pow(mousePos.left - startPos.left, 2));
  }
}
