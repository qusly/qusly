import { observable, action } from 'mobx';

import { Session } from './session';
import { History } from './history';
import { PageFiles } from './page-files';

let id = 0;

export class Page {
  @observable
  public id = id++;

  @observable
  public loading = true;

  public history = new History();

  public files = new PageFiles(this);

  constructor(public session: Session, path?: string) {
    this.history.push(path);
  }

  @action
  public async prepare() {
    await this.session.connect();
    await this.fetch();
  }

  @action
  public async fetch() {
    this.loading = true;
    await this.files.fetch();
    this.loading = false;
  }

  public get client() {
    return this.session.client;
  }
}
