import { observable } from 'mobx';

import { Session, Site } from '../models';

export class SessionsStore {
  @observable
  public list: Session[] = [];

  @observable
  public currentId = 0;

  public get current() {
    return this.list.find(e => e.id === this.currentId);
  }

  public create(site: Site) {
    const { host } = site;
    let session = this.list.find(e => e.site.host === host);
    if (session != null) return session;

    session = new Session();
    this.list.push(session);

    return session;
  }
}
