import * as React from 'react';
import { observable, action } from 'mobx';

import { Pos, Page } from '../models';
import store from '.';

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
      top: e.clientY,
      left: e.clientX,
    };

    this.update(e);
    this.addListeners();
  }

  public update(e: MouseAction) {
    this.updateSize(e);
    this.updatePos(e);
  }

  public updatePos(e: MouseAction) {
    const { width, height } = this.size;
    const top = e.clientY < this.startPoint.top ? (this.startPoint.top - height) : this.pos.top;
    const left = e.clientX < this.startPoint.left ? (this.startPoint.left - width) : this.pos.left;

    this.pos = ({ top, left });

    this.ref.current.style.top = `${top}px`;
    this.ref.current.style.left = `${left}px`;
  }

  public updateSize(e: MouseAction) {
    const width = Math.abs(e.clientX - this.startPoint.left);
    const height = Math.abs(e.clientY - this.startPoint.top);

    this.size = { width, height };

    this.ref.current.style.width = `${width}px`;
    this.ref.current.style.height = `${height}px`;
  }

  public onWindowMouseMove = (e: MouseEvent) => {
    this.update(e);
  }

  public onWindowMouseUp = () => {
    this.visible = false;
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
