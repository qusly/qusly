import * as React from 'react';
import { observable } from 'mobx';

import store from '.';
import { MouseAction } from './selection';
import { Pos } from '../models';

export class DraggingStore {
  @observable
  public visible = false;

  public ref = React.createRef<HTMLDivElement>();

  public startPos: Pos = {};

  constructor() {
    this.hide();
  }

  public show(e: MouseAction) {
    if (e.ctrlKey || e.shiftKey ||
      e.button === 1 || e.button === 2) {
      return this.hide();
    }

    this.startPos = {
      top: e.clientY,
      left: e.clientX,
    }

    this.addEventListeners();
    this.updatePos(e);
  }

  public hide = () => {
    this.visible = false;
    this.removeEventListeners();
  }

  public updatePos(e: MouseAction) {
    if (this.ref.current) {
      this.ref.current.style.top = `${e.clientY}px`;
      this.ref.current.style.left = `${e.clientX}px`;
    }
  }

  public calcDistance(e: MouseAction) {
    const { top, left } = this.startPos;
    return Math.sqrt(Math.pow(top - e.clientY, 2) + Math.pow(left - e.clientX, 2));
  }

  public onWindowMouseMove = (e: MouseEvent) => {
    if (this.calcDistance(e) < 5) {
      this.visible = false;
      return;
    }

    this.visible = true;
    this.updatePos(e);
  }

  public onWindowClick = () => {
    this.hide();
    store.pages.current.dragFiles();
  }

  public addEventListeners() {
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('click', this.onWindowClick);
  }

  public removeEventListeners() {
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('click', this.onWindowClick);
  }
}
