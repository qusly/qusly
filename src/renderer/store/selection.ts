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

  @action
  public show(e: React.MouseEvent) {
    this.page = store.pages.current;
    this.visible = true;
    this.startPoint = this.pos = {
      top: e.pageY,
      left: e.pageX,
    };

    this.update(e);
    this.addListeners();
  }

  public update(e: MouseAction) {
    this.updateSize(e);
    this.updatePos(e);
    this.selectFiles();
  }

  public updatePos(e: MouseAction) {
    const { width, height } = this.size;
    const parent = this.ref.current.parentElement;

    const top = e.pageY < this.startPoint.top ? (this.startPoint.top - height) : this.pos.top;
    const left = e.pageX < this.startPoint.left ? (this.startPoint.left - width) : this.pos.left;

    this.pos = ({ top, left });

    this.ref.current.style.top = `${top - parent.offsetTop}px`;
    this.ref.current.style.left = `${left - parent.offsetLeft}px`;
  }

  public updateSize(e: MouseAction) {
    const width = Math.abs(e.pageX - this.startPoint.left);
    const height = Math.abs(e.pageY - this.startPoint.top);

    this.size = { width, height };

    this.ref.current.style.width = `${width}px`;
    this.ref.current.style.height = `${height}px`;
  }

  public selectFiles() {
    const files = this.page.filesComponents;
    const rects = this.ref.current.getBoundingClientRect();

    for (const file of files) {
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
    //this.visible = false;
    this.removeListeners();
  }

  public addListeners() {
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
  }

  public removeListeners() {
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
  }
}
