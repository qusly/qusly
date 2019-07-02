import * as React from 'react';
import { observable } from 'mobx';

import store from '.';
import { setStyle, cursorDistance } from '../utils';

export class DraggingStore {
  @observable
  public visible = false;

  public active = false;

  public ref = React.createRef<HTMLDivElement>();

  public show = (e: React.MouseEvent) => {
    if (e.button !== 0) {
      this.hide();
      return;
    }

    store.startPos = store.mousePos;

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

    this.visible = cursorDistance(store.startPos, store.mousePos) > 5;
  }
}
