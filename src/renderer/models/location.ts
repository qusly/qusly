import { observable } from 'mobx';

export class Location {
  @observable
  public history: string[] = [];

  private pos = -1;

  public back() {
    if (this.canGoBack) {
      this.pos--;
    }
  }

  public forward() {
    if (this.canGoForward) {
      this.pos++;
    }
  }

  public go(index: number) {
    this.pos = index + 1;
    this.history = this.history.slice(0, this.pos);
  }

  public get canGoBack() {
    return this.pos > 0;
  }

  public get canGoForward() {
    return this.pos + 1 < this.history.length;
  }

  public push(...items: string[]) {
    this.pos += items.length;
    this.history = this.history.slice(0, this.pos);
    this.history = [...this.history, ...items];
  }

  public set path(str: string) {
    // TODO: Determinate OS
    this.history = ['/', ...str.split(/\\|\//).filter(v => v !== '')];
    this.pos = this.history.length - 1;
  }

  public get path() {
    return this.history.join('/').slice(this.history.length > 1 && this.history[0] === '/' ? 1 : 0);
  }
}
