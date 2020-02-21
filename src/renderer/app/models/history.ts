import { observable, action, computed } from 'mobx';

export class History {
  @observable
  protected list: string[] = [];

  @observable
  public pos = -1;

  public listen: (path: string) => void;

  @computed
  public get canGoBack() {
    return this.list.length && this.pos > 0;
  }

  @computed
  public get canGoForward() {
    return this.list.length && this.pos < this.list.length - 1;
  }

  @action
  public goBack = () => {
    if (this.canGoBack) {
      this.pos--;
      this.emitListen();
    }
  };

  @action
  public goForward = () => {
    if (this.canGoForward) {
      this.pos++;
      this.emitListen();
    }
  };

  @action
  public push(path: string, emit = true) {
    if (path) {
      this.pos++;
      this.list = [...this.list.slice(0, this.pos), path];

      if (emit) this.emitListen();
    }
  }

  @computed
  public get path() {
    return this.list[this.pos];
  }

  @computed
  public get folders() {
    if (!this.path) return [];
    return ['/', ...this.path?.split('/')].filter(r => r.length);
  }

  @action
  public go(n: number) {
    this.pos = n;
    this.emitListen();
  }

  @action
  public goToFolder(n: number) {
    this.push(this.folderPath(n));
  }

  @action
  public pushFolder(folder: string) {
    this.push(`${this.path}/${folder}`);
  }

  public folderPath(n: number) {
    const folders = this.folders.slice(1, n + 1);

    return `/${folders.join('/')}`;
  }

  protected emitListen() {
    if (this.listen) {
      this.listen(this.path);
    }
  }
}
