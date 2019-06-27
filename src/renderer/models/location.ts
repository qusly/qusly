import { observable, action } from 'mobx';

import { Page } from './page';

export class Location {
  @observable
  public history: string[] = [];

  @observable
  public pos = -1;

  constructor(public page: Page) { }

  public back() {
    if (this.canGoBack) {
      this.pos--;
      this.page.fetchFiles();
    }
  }

  public forward() {
    if (this.canGoForward) {
      this.pos++;
      this.page.fetchFiles();
    }
  }

  public get canGoBack() {
    return this.pos > 0;
  }

  public get canGoForward() {
    return this.pos + 1 < this.history.length;
  }

  @action
  public go(index: number) {
    this.pos = index + 1;
    this.history = this.history.slice(0, this.pos);
    this.page.fetchFiles();
  }

  @action
  public push(...items: string[]) {
    this.pos += items.length;
    this.history = [...this.history.slice(0, this.pos), ...items];
  }

  public set path(str: string) {
    // TODO: Determinate OS
    this.history = ['/', ...str.split(/\\|\//).filter(v => v !== '')];
    this.pos = this.history.length - 1;
    this.page.fetchFiles();
  }

  public get pathItems() {
    return this.history.slice(0, this.pos + 1);
  }

  public get path() {
    const items = this.pathItems;
    return items.join('/').slice(items.length > 1 && items[0] === '/' ? 1 : 0);
  }
}
