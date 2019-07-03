import * as React from 'react';
import { observable } from 'mobx';

import store from '.';
import { setStyle } from '../utils';

export type ContextMenuContent = 'file' | 'page';

export class ContextMenuStore {
  @observable
  public content: ContextMenuContent;

  public refs = {
    file: React.createRef<HTMLDivElement>(),
    page: React.createRef<HTMLDivElement>(),
  };

  public show(content: ContextMenuContent) {
    this.content = content;
    this.update();
  }

  public hide = () => {
    this.content = null;
  }

  public update() {
    const { top, left } = this.pos;

    setStyle(this.ref, {
      top: `${top}px`,
      left: `${left}px`,
    })
  }

  public get pos() {
    let { top, left } = store.mousePos;

    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;

    const width = this.ref.clientWidth;
    const height = this.ref.clientHeight;

    if (top + height > screenHeight && top - height > 0) {
      top -= height;
    }

    if (left + width > screenWidth) {
      left -= width;
    }

    return { top, left };
  }

  public get ref(): HTMLDivElement {
    return (this.refs as any)[this.content].current;
  }
}
