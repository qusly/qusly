import { observable } from 'mobx';

import store from '../store';

export class PathManager {
  @observable
  public list: string[] = [];

  public async init() {
    const { path } = await store.session.client.pwd();
    const slash = path.startsWith('/') ? '/' : '';
    this.list = [slash, ...path.split(/\\|\//).filter(v => v !== '')];
  }

  public push(name: string) {
    this.list.push(name);
    store.session.fetchFiles();
  }

  public slice(index: number) {
    this.list = this.list.slice(0, index + 1);
    store.session.fetchFiles();
  }

  public get path() {
    return this.list.join('/');
  }
}
