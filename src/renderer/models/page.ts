import { observable } from 'mobx';
import { IFile } from 'qusly-core';

import store from '../store';
import { Session } from './session';

let id = 0;

export class Page {
  @observable
  public id = id++;

  @observable
  public tabId: number;

  @observable
  public files: IFile[] = [];

  @observable
  public pathItems: string[] = [];

  @observable
  public loading = true;

  constructor(public session: Session) { }

  public async load() {
    const { path } = await this.session.client.pwd();
    await this.updatePath(path);
  }

  public async updatePath(path: string) {
    const slash = path.startsWith('/') ? '/' : '';

    this.pathItems = [slash, ...path.split(/\\|\//).filter(v => v !== '')];

    await this.fetchFiles();
  }

  public async fetchFiles() {
    this.loading = true;

    const path = this.path;
    const { files } = await this.session.client.readDir(path);

    await store.favicons.load(files);

    this.files = files;
    this.loading = false;

    store.tabs.getTabById(this.tabId).title = this.title;
  }

  public get path() {
    return this.pathItems.join('/');
  }

  public close() {
    store.pages.list = store.pages.list.filter(r => r.id !== this.id);

    const page = store.pages.list.find(r => r.session === this.session);

    if (page == null) {
      this.session.close();
    } else if (store.tabs.nextTab != null) {
      store.tabs.nextTab.select();
    } else if (store.tabs.previousTab != null) {
      store.tabs.previousTab.select();
    }
  }

  public get title() {
    let path = this.path;
    if (this.pathItems.length > 1) path = path.substring(1);
    return `${this.session.site.title} - ${path}`;
  }
}
