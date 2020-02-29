import React from 'react';
import { observable, action } from 'mobx';

import { setMenuPosition } from '../utils';
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
    if (this.ref.current && e.button === 2) {
      window.removeEventListener('mousedown', this.hide);
      window.addEventListener('mousedown', this.hide);

      this.data = data;
      this.visible = true;

      setMenuPosition(e, this.ref.current);
    }
  };

  public hide = () => {
    if (this.visible) {
      window.removeEventListener('mousedown', this.hide);
      this.visible = false;
    }
  };
}
