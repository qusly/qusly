import * as React from 'react';
import { observable } from 'mobx';

import store from '.';
import { setStyle, isElementInArea } from '../utils';

export class SelectionStore {
  @observable
  public visible = false;

  public active = false;

  public ref = React.createRef<HTMLDivElement>();

  public show = (e: React.MouseEvent) => {
    if (e.button !== 0) {
      this.hide();
      return;
    }

    store.setStartPos(e);
    this.active = true;
    this.update();
  }

  public hide() {
    this.visible = false;
    this.active = false;
  }

  public update() {
    if (!this.active) return;

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

    this.visible = store.cursorDistance > 5;
    this.selectFiles();
  }

  public selectFiles = () => {
    if (!this.visible) return;

    const files = store.pages.current.filesComponents;
    const rects = this.ref.current.getBoundingClientRect();

    for (const file of files) {
      const el = file.ref.current;

      if (el) {
        const selected = isElementInArea(rects, el);
        const { data } = file.props;

        if (selected !== data.selected) {
          data.selected = selected;
        }
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
