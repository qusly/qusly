import * as React from 'react';
import { observable, action } from 'mobx';

export type ContextMenuRef = React.RefObject<HTMLDivElement>;

export interface ContextMenuPos {
  top?: number;
  left?: number;
}

export type ContextMenuContent = 'file' | 'page';

export class ContextMenuStore {
  @observable
  public content: ContextMenuContent;

  @observable
  public pos: ContextMenuPos = {};

  public refs = {
    file: React.createRef<HTMLDivElement>(),
    page: React.createRef<HTMLDivElement>(),
  };

  @action
  public show(content: ContextMenuContent, e: React.MouseEvent) {
    this.addListener();

    this.content = content;
    this.pos = this.calcPos(e.clientX, e.clientY);
  }

  public hide = () => {
    this.removeListener();
    this.content = null;
  }

  public calcPos(x: number, y: number): ContextMenuPos {
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;

    const width = this.ref.current.clientWidth;
    const height = this.ref.current.clientHeight;

    if (y + height > screenHeight && y - height > 0) {
      y -= height;
    }

    if (x + width > screenWidth) {
      x -= width;
    }

    return {
      top: y,
      left: x,
    };
  }

  public onWindowClick = (e: MouseEvent) => {
    e.stopPropagation();
    this.hide();
  }

  public addListener() {
    this.removeListener();
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('mousedown', this.onWindowClick);
  }

  public removeListener() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('mousedown', this.onWindowClick);
  }

  public get ref(): React.RefObject<HTMLDivElement> {
    return (this.refs as any)[this.content];
  }
}
