import { observable, action } from 'mobx';

export class Location {
  @observable
  public history: string[] = [];

  @observable
  public pos = -1;

  public back() {
    if (this.canGoBack) {
      console.log(this.pos, this.history);

      this.pos--;
    }
  }

  public forward() {
    if (this.canGoForward) {
      this.pos++;
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
  }

  @action
  public push(...items: string[]) {
    if (items.length === 1 && items[0] === this.history[this.history.length - 1]) return;

    this.pos += items.length;
    this.history = this.history.slice(0, this.pos);
    this.history = [...this.history, ...items];
  }

  public set path(str: string) {
    // TODO: Determinate OS
    this.history = ['/', ...str.split(/\\|\//).filter(v => v !== '')];
    this.pos = this.history.length - 1;
  }

  public get pathItems() {
    return this.history.slice(0, this.pos + 1);
  }

  public get path() {
    return this.pathItems.join('/');
  }
}
