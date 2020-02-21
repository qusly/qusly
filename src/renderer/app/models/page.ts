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

  constructor(public session: Session) {
    this.history.listen = this.listenHistory;
  }

  public get client() {
    return this.session.client;
  }

  @action
  public async prepare(path?: string) {
    await this.session.connect();
    await this.fetch();

    const _path = path || this.session.startingDir;

    this.history.push(_path, false);
  }

  @action
  public fetch = async () => {
    this.loading = true;
    await this.files.fetch();
    this.loading = false;
  };

  @action
  public listenHistory = (path: string) => {
    if (!path || this.loading) return;
    this.fetch();
  };
}
