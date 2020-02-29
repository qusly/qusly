import React from 'react';
import { observable, action } from 'mobx';

import { IContextMenuData } from '~/renderer/interfaces';

export class ContextMenuStore {
  @observable
  public visible = false;

  @observable
  public data: IContextMenuData = [];

  public ref = React.createRef<HTMLTableElement>();

  @action
  public show = (
    e: MouseEvent | React.MouseEvent<any>,
    data: IContextMenuData,
  ) => {
    if (e.button === 2 && this.ref) {
      window.removeEventListener('mousedown', this.hide);
      window.addEventListener('mousedown', this.hide);

      this.data = data;
      this.visible = true;

      this.updatePos(e);
    } else if (!this.ref.current) {
      console.error('Context menu ref is null!');
    }
  };

  public hide = () => {
    if (this.visible) {
      window.removeEventListener('mousedown', this.hide);
      this.visible = false;
    }
  };

  protected updatePos(e: MouseEvent | React.MouseEvent<any>) {
    let left = e.pageX;
    let top = e.pageY;

    requestAnimationFrame(() => {
      const current = this.ref.current;

      if (!current) return;

      const screenWidth = document.body.clientWidth;
      const screenHeight = document.body.clientHeight;

      const width = current.clientWidth;
      const height = current.clientHeight;

      if (top + height > screenHeight && top - height > 0) {
        top -= height;
      }

      if (left + width > screenWidth) {
        left -= width;
      }

      Object.assign(current.style, {
        top: `${top}px`,
        left: `${left}px`,
      } as React.CSSProperties);
    });
  }
}
