import { observable, computed, action } from 'mobx';

import { ISite } from '~/interfaces';
import { Session } from '../models';
import store from '.';

export class SessionsStore {
  @observable
  public list: Session[] = [];

  @computed
  public get current() {
    const tab = store.tabs.selectedTab;
    return this.list.find(r => tab && r.id === tab.sessionId);
  }

  @action
  public add(site: ISite) {
    let session = this.findSession(site);

    if (!session) {
      session = new Session(site);
      this.list.push(session);
    }

    return session;
  }

  private findSession({ host, port, protocol, user, password }: ISite) {
    return this.list.find(
      ({ site }) =>
        site.host === host &&
        site.port === port &&
        site.protocol === protocol &&
        site.user === user &&
        site.password === password,
    );
  }
}
