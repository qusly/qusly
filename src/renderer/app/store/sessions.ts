import { observable } from 'mobx';

import { Session } from '../models';
import { ISite } from '~/interfaces';

export class SessionsStore {
  @observable
  public list: Session[] = [];

  @observable
  public currentId = 0;

  public create(site: ISite) {
    let session = this.list.find(r => r.site === site);

    if (!session) {
      session = new Session();
      this.list.push(session);
    }

    return session;
  }
}
