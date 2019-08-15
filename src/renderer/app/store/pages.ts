import { observable } from 'mobx';

import { Page, Tab } from '../models';
import { ISite } from '~/interfaces';
import store from '.';

export class PagesStore {
  @observable
  public list: Page[] = [];

  @observable
  public currentId = 0;

  public get current() {
    return this.list.find(e => e.id === this.currentId);
  }

  public async add(site: ISite, tab: Tab) {
    const session = await store.sessions.add(site);
    const page = new Page(session);

    tab.pageId = page.id;
    tab.sessionId = session.id;
    tab.title = site.title;

    this.list.push(page);

    await session.connect();
  }
}
