import { observable, action, computed } from 'mobx';

import store from '../store';
import { Session } from './session';
import { History } from './history';
import { PageFiles } from './page-files';

let id = 0;

export class Page {
  @observable
  public id = id++;

  public history = new History();

  public files = new PageFiles(this);

  public isDragging = false;

  public isSelecting = false;

  constructor(public session: Session) {
    this.history.listen = this.listenHistory;
  }

  public get client() {
    return this.session.client;
  }

  @computed
  public get tab() {
    return store.tabs.list.find(r => r.pageId === this.id);
  }

  public get loading() {
    return this.tab.loading;
  }

  public set loading(loading: boolean) {
    this.tab.loading = loading;
  }

  @action
  public async prepare(path?: string) {
    await this.session.connect();

    this.history.push(path ?? this.session.startingDir, false);
    this.updateTabTitle();

    await this.files.fetch();
  }

  @action
  public listenHistory = (path: string) => {
    if (path && !this.loading) {
      this.updateTabTitle();
      this.files.fetch();
    }
  };

  @action
  public updateTabTitle(path?: string) {
    const _path = path ?? this.history.path;
    const { host } = this.session.config;

    this.tab.title = _path ? `${_path} - ${host}` : host;
  }
}
