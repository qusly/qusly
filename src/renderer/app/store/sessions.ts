import { observable } from 'mobx';

import { Session } from '../models';
import { ISite } from '~/interfaces';

export class SessionsStore {
  @observable
  public list: Session[] = [];

  @observable
  public currentId = 0;

  public get current() {
    return this.list.find(r => r.id === this.currentId);
  }

  public add(site: ISite) {
    let session = this.list.find(r => r.site._id === site._id);

    if (!session) {
      session = new Session(site);
      this.list.push(session);
    }

    return session;
  }
}
