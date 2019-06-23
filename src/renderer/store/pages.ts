import { observable } from 'mobx';

import { Page, Site, Tab } from '../models';
import store from '.';

export class PagesStore {
  @observable
  public list: Page[] = [];

  public get current() {
    return this.list.find(e => e.tabId === store.tabs.selectedTab.id);
  }

  public async add(site: Site, tab: Tab) {
    const session = store.sessions.create(site);
    const page = new Page(session);

    tab.title = site.title;
    this.list.push(page);

    await session.connect(site);
    await page.load();
  }
}
