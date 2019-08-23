import * as React from 'react';
import { observable, action } from 'mobx';
import { cursorDistance, setElementStyle } from 'rectangle-selection';

import { IPos } from '~/interfaces';
import store from '.';

export class DragStore {
  @observable
  public visible = false;

  public ref = React.createRef<HTMLDivElement>();

  public startPos: IPos;

  public active = false;

  @action
  public update(pos: IPos) {
    const { top, left } = pos;

    if (this.active) {
      this.visible = this.visible || cursorDistance(pos, this.startPos) > 5;

      setElementStyle(this.ref.current, {
        top: `${top}px`,
        left: `${left}px`,
      });
    }
  }

  public hide() {
    if (this.visible) {
      store.pages.current.dropRemote();
    }

    this.visible = false;
    this.active = false;
  }
}
