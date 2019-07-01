import * as React from 'react';
import { observable, action } from 'mobx';

import { Pos } from '../models';

export class SelectionStore {
  @observable
  public visible = false;

  public startPoint: Pos = {};

  public ref = React.createRef<HTMLDivElement>();

  @action
  public show(e: React.MouseEvent) {
    this.visible = true;
    this.startPoint = {
      top: e.clientY,
      left: e.clientX,
    };

    this.setPos(this.startPoint);
    this.update(e);
    this.addListeners();
  }

  public setPos(pos: Pos) {
    const { top, left } = pos;
    if (top) this.ref.current.style.top = `${top}px`;
    if (left) this.ref.current.style.left = `${left}px`;
  }

  public update(e: React.MouseEvent | MouseEvent) {
    const width = Math.abs(e.clientX - this.startPoint.left);
    const height = Math.abs(e.clientY - this.startPoint.top);

    this.setPos({
      top: e.clientY < this.startPoint.top && (this.startPoint.top - height),
      left: e.clientX < this.startPoint.left && (this.startPoint.left - width),
    })

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
