export class Location {
  private history: string[] = [];

  private pos = -1;

  public get items() {
    const items = this.history[this.pos].split('/').filter(r => r.length);
    return ['/', ...items];
  }

  public get canGoBack() {
    return this.pos > 0;
  }

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

  public push(path: string) {
    this.pos++;
    this.history = [...this.history.slice(0, this.pos), path];
  }

  public toString() {
    return this.relative();
  }

  public relative(...items: string[]) {
    return '/' + [...this.items.slice(1, -1), ...items].join('/');
  }
}
