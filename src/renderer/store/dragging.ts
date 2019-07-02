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

    this.visible = store.cursorDistance > 5;
  }
}
