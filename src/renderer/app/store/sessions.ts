import { observable, computed } from 'mobx';

import { ISite } from '~/interfaces';
import { Session } from '../models';
import store from '.';

export class SessionsStore {
  @observable
  public list: Session[] = [];

  @computed
  public get current() {
    const tab = store.tabs.selectedTab;
    return this.list.find(r => r.id === tab.sessionId);
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
