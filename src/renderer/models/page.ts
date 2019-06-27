import { observable } from 'mobx';
import { IFile } from 'qusly-core';

import store from '../store';
import { Session } from './session';
import { sortFiles } from '../utils';
import { Location } from './location';

let id = 0;

export class Page {
  @observable
  public id = id++;

  @observable
  public tabId: number;

  @observable
  public files: IFile[] = [];

  @observable
  public selectedFiles: string[] = [];

  public location = new Location(this);

  @observable
  public loading = true;

  @observable
  public pathInputVisible = false;

  constructor(public session: Session) { }

  public async load() {
    const { path, error } = await this.session.client.pwd();
    if (error) console.error(error);
    this.location.path = path;
  }

  public async fetchFiles() {
    this.selectedFiles = [];
    this.loading = true;

    const { files, error } = await this.session.client.readDir(
      this.location.path,
    );

    if (error) console.error(this.location.path, error);

    files && (await store.favicons.load(files));

    this.files = sortFiles(files);
    this.loading = false;

    store.tabs.getTabById(this.tabId).title = this.title;
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
    return `${this.session.site.title} - ${this.location.path}`;
  }
}
