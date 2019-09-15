import * as React from 'react';
import { observable, action } from 'mobx';

import store from '.';
import { IPos } from '~/interfaces';
import { getMenuPosition } from '~/renderer/app/utils';

export type ContextMenuContent = 'page' | 'file' | 'tab';

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

  public ref = React.createRef<HTMLDivElement>();

  @action
  public show = (content: ContextMenuContent) => {
    this.content = content;
    this.visible = true;
    this.pos = getMenuPosition(this.ref.current, store.mousePos);
  }
}
