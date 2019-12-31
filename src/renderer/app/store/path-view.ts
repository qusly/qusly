import * as React from 'react';
import { observable, action } from 'mobx';

import store from '.';

export class PathViewStore {
  @observable
  public inputVisible = false;

  public inputRef = React.createRef<HTMLInputElement>();

  @action
  public show = () => {
    if (!this.inputVisible) {
      const page = store.pages.current;
      const input = this.inputRef.current;

      input.value = page.path.toString();
      this.inputVisible = true;

      requestAnimationFrame(() => {
        input.focus();
        input.select();
      });
    }
  };
}
