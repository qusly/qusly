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

  public isDragging = false;

  constructor(public session: Session) {
    this.history.listen = this.listenHistory;
  }

  public get client() {
    return this.session.client;
  }

  @action
  public async prepare(path?: string) {
    await this.session.connect();

    this.history.push(path ?? this.session.startingDir, false);

    await this.files.fetch();
  }

  @action
  public listenHistory = (path: string) => {
    if (path && !this.loading) {
      this.files.fetch();
    }
  };
}
