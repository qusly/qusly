import React from 'react';
import { observable, action } from 'mobx';

import store from '.';
import { getPathViewContextMenu } from '../components/ContextMenu/Appbar';

export class PathViewStore {
  @observable
  public visible = false;

  public ref = React.createRef<HTMLInputElement>();

  @action
  public show = () => {
    if (!this.visible) {
      this.visible = true;

      requestAnimationFrame(() => {
        const ref = this.ref.current;

        ref.value = store.pages.current.history.path;
        ref.focus();
        ref.select();
      });
    }
  };

  @action
  public hide = () => {
    this.visible = false;

    const page = store.pages.current;
    const path = this.ref.current.value;

    if (path !== page.history.path) {
      page.history.push(path);
    }
  };

  public onContextMenu = (e: React.MouseEvent) => {
    if (!this.visible) {
      store.contextMenu.show(e, getPathViewContextMenu());
    }
  };

  public onMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) this.show();
  };

  public onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.hide();
    }
  };
}
