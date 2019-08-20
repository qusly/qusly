import { computed, observable, action } from 'mobx';

export class Location {
  @observable
  private history: string[] = [];

  @observable
  private pos = -1;

  @computed
  public get items() {
    if (this.pos === -1) return [];

    const items = this.history[this.pos].split('/').filter(r => r.length);
    return ['/', ...items];
  }

  @computed
  public get canGoBack() {
    return this.pos > 0;
  }

  @computed
  public get canGoForward() {
    return this.pos < this.history.length - 1;
  }

  public goBack() {
    if (this.canGoBack) {
      this.pos--;
    }
  }

  public goForward() {
    if (this.canGoForward) {
      this.pos++;
    }
  }

  @action
  public push(path: string) {
    this.pos++;
    this.history = [...this.history.slice(0, this.pos), path];
  }

  @action
  public pushRelative(...items: string[]) {
    const path = this.relative(...items);
    this.push(path);
  }

  public toString() {
    return this.relative();
  }

  public relative(...items: string[]) {
    return '/' + [...this.items.slice(1), ...items].join('/');
  }
}
