import * as React from 'react';
import { observable, action } from 'mobx';

import { Pos, Page } from '../models';
import store from '.';

export type MouseAction = React.MouseEvent | MouseEvent;

interface Size {
  width?: number;
  height?: number;
}

export class SelectionStore {
  @observable
  public visible = false;

  public startPoint: Pos = {};

  public pos: Pos = {};

  public size: Size = {};

  public ref = React.createRef<HTMLDivElement>();

  public mousePos: Pos = {};

  public lastScrollTop = 0;

  public timer: number;

  constructor() {
    this.removeListeners();
  }

  public get parent() {
    return this.ref.current ? this.ref.current.parentElement : null;
  }

  @action
  public show(e: MouseAction) {
    if (e.ctrlKey || e.shiftKey ||
      e.button === 1 || e.button === 2) {
      this.visible = false;
      return;
    }

    this.visible = true;
    this.startPoint = this.pos = this.getPos(e);

    this.update(e);
    this.addListeners();
  }

  public update(e?: MouseAction) {
    if (e) {
      this.mousePos = this.getPos(e);
    } else {
      const scrollTop = this.parent.scrollTop;
      this.mousePos.top += scrollTop - this.lastScrollTop;
      this.lastScrollTop = scrollTop;
    }

    this.updateSize();
    this.updatePos();

    clearTimeout(this.timer);
    this.timer = setTimeout(this.selectFiles, 20);
  }

  public getPos(e: MouseAction): Pos {
    return {
      top: e.clientY + this.parent.scrollTop,
      left: e.clientX + this.parent.scrollLeft,
    }
  }

  public updatePos() {
    const { width, height } = this.size;
    const parentRect = this.parent.getBoundingClientRect();

    const top = this.mousePos.top < this.startPoint.top ? (this.startPoint.top - height) : this.pos.top;
    const left = this.mousePos.left < this.startPoint.left ? (this.startPoint.left - width) : this.pos.left;

    this.pos = ({ top, left });

    this.ref.current.style.top = `${top - parentRect.top}px`;
    this.ref.current.style.left = `${left - parentRect.left}px`;
  }

  public updateSize() {
    const width = Math.abs(this.mousePos.left - this.startPoint.left);
    const height = Math.abs(this.mousePos.top - this.startPoint.top);

    this.size = { width, height };

    this.ref.current.style.width = `${width}px`;
    this.ref.current.style.height = `${height}px`;
  }

  public selectFiles = () => {
    const files = store.pages.current.filesComponents;
    const rects = this.ref.current.getBoundingClientRect();

    for (const file of files) {
      if (!file.ref) continue;

      const { data } = file.props;
      const fileRects = file.ref.current.getBoundingClientRect();
      const selected = this.checkRects(rects, fileRects) &&
        this.checkRects(rects, fileRects, false);

      if (data.selected !== selected) {
        data.selected = selected;
      }
    }
  }

  public checkRects(rects: ClientRect, fileRects: ClientRect, horizontal = true) {
    const sideA = horizontal ? 'left' : 'top';
    const sideB = horizontal ? 'right' : 'bottom';

    return rects[sideA] < fileRects[sideA] && rects[sideB] > fileRects[sideB] ||
      rects[sideA] > fileRects[sideA] && rects[sideB] < fileRects[sideB] ||
      rects[sideA] < fileRects[sideA] && fileRects[sideA] < rects[sideB] ||
      fileRects[sideB] > rects[sideA] && fileRects[sideB] < rects[sideB];
  }

  public onWindowMouseMove = (e: MouseEvent) => {
    this.update(e);
  }

  public onWindowMouseClick = () => {
    this.visible = false;
    this.removeListeners();
  }

  public onScroll = () => {
    this.update();
  }

  public addListeners() {
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('click', this.onWindowMouseClick);
    this.parent.addEventListener('scroll', this.onScroll);
  }

  public removeListeners() {
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('click', this.onWindowMouseClick);

    const parent = this.parent;

    if (parent) {
      parent.removeEventListener('scroll', this.onScroll);
    }
  }
}
