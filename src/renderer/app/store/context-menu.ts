import * as React from 'react';
import { observable, action } from 'mobx';

import store from '.';
import { IPos } from '~/interfaces';
import { getMenuPosition } from '~/renderer/app/utils';

export type ContextMenuContent = 'file';

export class ContextMenuStore {
  @observable
  public visible = false;

  @observable
  public pos: IPos = {
    top: 0,
    left: 0
  }

  @observable
  public content: ContextMenuContent = 'file';

  public menuRef = React.createRef<HTMLDivElement>();

  @action
  public show = () => {
    this.visible = true;
    this.pos = getMenuPosition(this.menuRef.current, store.mousePos);
  }
}
