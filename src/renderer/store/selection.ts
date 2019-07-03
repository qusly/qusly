import * as React from 'react';
import { observable } from 'mobx';

import store from '.';
import { setStyle, isElementInArea, cursorDistance } from '../utils';

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

    store.startPos = this.mousePos;

    this.active = true;
    this.update();
    this.parent.addEventListener('scroll', this.onScroll);
  }

  public hide = () => {
    if (this.parent) {
      this.parent.removeEventListener('scroll', this.onScroll);
    }

    this.visible = false;
    this.active = false;
  }

  public update() {
    if (!this.active) return;

    const { width, height } = this.size;
    const parentRect = this.parent.getBoundingClientRect();

    const mousePos = this.mousePos;
    const { startPos } = store;

    const top = mousePos.top < startPos.top ? (startPos.top - height) : startPos.top;
    const left = mousePos.left < startPos.left ? (startPos.left - width) : startPos.left;

    setStyle(this.ref.current, {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top - parentRect.top}px`,
      left: `${left - parentRect.left}px`,
    });

    this.visible = cursorDistance(store.startPos, mousePos) > 5;
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

  public onScroll = () => {
    this.update();
  }

  public get mousePos() {
    const { top, left } = store.mousePos;
    return {
      top: top + this.parent.scrollTop,
      left: left + this.parent.scrollLeft,
    }
  }

  public get parent() {
    const current = this.ref.current;
    return current && current.parentElement;
  }

  public get size() {
    const mousePos = this.mousePos;
    const { startPos } = store;

    const width = Math.abs(mousePos.left - startPos.left);
    const height = Math.abs(mousePos.top - startPos.top);

    return { width, height };
  }
}
