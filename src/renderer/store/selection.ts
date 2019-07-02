import * as React from 'react';
import { observable } from 'mobx';

import store from '.';
import { setStyle, isFileInArea } from '../utils';

export class SelectionStore {
  @observable
  public visible = false;

  public ref = React.createRef<HTMLDivElement>();

  public show() {
    if (!this.visible) {
      this.visible = true;
      this.update();
    }
  }

  public hide() {
    this.visible = false;
  }

  public update() {
    if (!this.visible) return;

    const { width, height } = this.size;
    const parentRect = this.parent.getBoundingClientRect();

    const { mousePos, startPos } = store;

    const top = mousePos.top < startPos.top ? (startPos.top - height) : startPos.top;
    const left = mousePos.left < startPos.left ? (startPos.left - width) : startPos.left;

    setStyle(this.ref.current, {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top - parentRect.top}px`,
      left: `${left - parentRect.left}px`,
    });

    this.selectFiles();
  }

  public selectFiles = () => {
    const files = store.pages.current.filesComponents;
    const rects = this.ref.current.getBoundingClientRect();

    for (const file of files) {
      const selected = isFileInArea(rects, file);
      const { data } = file.props;

      if (selected != null && selected !== data.selected) {
        data.selected = selected;
      }
    }
  }

  public get parent() {
    const current = this.ref.current;
    return current && current.parentElement;
  }

  public get size() {
    const { mousePos, startPos } = store;
    const width = Math.abs(mousePos.left - startPos.left);
    const height = Math.abs(mousePos.top - startPos.top);
    return { width, height };
  }
}
