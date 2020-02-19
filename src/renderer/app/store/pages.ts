import { observable, computed, action } from 'mobx';

import { Page } from '../models';
import { ISite } from '~/interfaces';
import store from '.';

export class PagesStore {
  @observable
  public list: Page[] = [];

  @computed
  public get current() {
    const tab = store.tabs.selectedTab;

    return this.list.find(r => r.id === tab.pageId);
  }

  @action
  public add(config: ISite) {
    const session = store.sessions.create(config);
    const page = session.createNewPage();

    this.list.push(page);

    return page;
  }
}
