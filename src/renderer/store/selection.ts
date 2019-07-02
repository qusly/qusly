import * as React from 'react';
import { observable, action } from 'mobx';

import { Pos, Page } from '../models';
import store from '.';
import File from '../components/File';

type MouseAction = React.MouseEvent | MouseEvent;

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

  public page: Page;

  public mousePos: Pos = {};

  public timer: number;

  public get parent() {
    return this.ref.current.parentElement;
  }

  @action
  public show(e: any) {
    this.page = store.pages.current;
    this.visible = true;
    this.startPoint = this.pos = {
      top: e.clientY,
      left: e.clientX,
    };

    this.update(e);
    this.addListeners();
  }

  public update(e?: MouseAction) {
    if (e) {
      this.mousePos = {
        top: e.clientY,
        left: e.clientX,
      }
    }

    this.updateSize();
    this.updatePos();

    clearTimeout(this.timer);
    setTimeout(this.selectFiles, 100);
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
    const width = Math.abs(this.mousePos.left - this.startPoint.left) + this.parent.scrollLeft;
    const height = Math.abs(this.mousePos.top - this.startPoint.top) + this.parent.scrollTop;

    this.size = { width, height };

    this.ref.current.style.width = `${width}px`;
    this.ref.current.style.height = `${height}px`;
  }

  public selectFiles = () => {
    const files = this.page.filesComponents;
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

  public onWindowMouseUp = () => {
    this.visible = false;
    this.removeListeners();
  }

  public onScroll = () => {
    this.update();
  }

  public addListeners() {
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
    this.parent.addEventListener('scroll', this.onScroll);
  }

  public removeListeners() {
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
    this.parent.removeEventListener('scroll', this.onScroll);
  }
}
