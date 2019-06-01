import { observable } from "mobx";
import { IFile } from "qusly-core";

import store from "../store";

export class Page {
  @observable
  public tabId = store.tabs.selectedTab.id;

  @observable
  public files: IFile[] = [];

  @observable
  public pathItems: string[] = [];

  @observable
  public sessionId: number;

  @observable
  public loading = true;

  public async init() {
    const { path } = await store.sessions.current.client.pwd();
    const slash = path.startsWith('/') ? '/' : '';

    this.pathItems = [slash, ...path.split(/\\|\//).filter(v => v !== '')];
    this.fetchFiles();
  }

  public get path() {
    return this.pathItems.join('/');
  }

  public async fetchFiles() {
    this.loading = true;

    const { files } = await store.sessions.current.client.readDir(this.path);

    await store.icons.load(files);

    this.files = files;
    this.loading = false;
  }
}
