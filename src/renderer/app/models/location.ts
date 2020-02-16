import { clipboard } from 'electron';
import { computed, observable, action } from 'mobx';

import { Page } from './page';

export class Location {
  @observable
  private history: string[] = [];

  @observable
  private pos = -1;

  constructor(private page: Page) { }

  @computed
  public get items() {
    if (this.pos === -1) return [];

    const items = this.history[this.pos]?.split('/').filter(r => r.length);
    if (!items) return [];

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

  public goBack = async () => {
    if (this.canGoBack) {
      this.pos--;
      await this.page.fetchFiles();
    }
  };

  public goForward = async () => {
    if (this.canGoForward) {
      this.pos++;
      await this.page.fetchFiles();
    }
  };

  @action
  public async push(path: string) {
    this.pos++;
    this.history = [...this.history.slice(0, this.pos), path];
    await this.page.fetchFiles();
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

  @action
  public goto(index: number) {
    if (!this.page.loading) {
      if (this.items.length - 1 === index) {
        this.page.fetchFiles();
        return;
      }

      const items = this.items.slice(1, index + 1);
      const path = '/' + items.join('/');
      this.push(path);
    }
  }

  public copyToClipboard() {
    clipboard.writeText(this.toString(), 'clipboard');
  }
}
