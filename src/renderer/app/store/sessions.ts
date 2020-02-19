import { observable, computed, action } from 'mobx';

import { Session } from '../models';
import { ISite } from '~/interfaces';
import store from '.';

export class SessionsStore {
  @observable
  public list: Session[] = [];

  @observable
  public selectedId = 0;

  @computed
  public get current() {
    return store.pages.current?.session;
  }

  @action
  public create(config: ISite) {
    let session = this.list.find(r => r.config.id === config.id);

    if (!session) {
      session = new Session(config);

      this.list.push(session);
    }

    return session;
  }
}
