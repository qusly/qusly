import * as React from 'react';
import { observable, action } from 'mobx';

import store from '.';
import { IPos, ITreeItem, ISite } from '~/interfaces';
import { Tab } from '../models/tab';
import { getMenuPosition } from '../utils/context-menu';

export type ContextMenuContent =
  | 'page'
  | 'file'
  | 'tab'
  | 'path'
  | 'explorer'
  | 'site';

export class ContextMenuStore {
  @observable
  public visible = false;

  @observable
  public pos: IPos = {
    top: 0,
    left: 0,
  };

  @observable
  public content: ContextMenuContent = 'file';

  public ref = React.createRef<HTMLTableElement>();

  public focusedTab: Tab;

  public focusedExplorerItem: ITreeItem;

  public focusedSite: ISite;

  @action
  public show = (content: ContextMenuContent) => {
    this.content = content;
    this.visible = true;
    this.pos = getMenuPosition(this.ref.current, store.mousePos);
  };
}
