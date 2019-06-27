import { observable } from 'mobx';

import { Page, Site, Tab } from '../models';
import store from '.';

export class PagesStore {
  @observable
  public list: Page[] = [];

  public get current() {
    const tab = store.tabs.selectedTab;
    if (tab == null) return null;
    return this.list.find(e => e.tabId === tab.id);
  }

  public async add(site: Site, tab: Tab, path?: string) {
    const session = store.sessions.create(site);
    const page = new Page(session);

    page.tabId = tab.id;
    tab.page = page;
    tab.title = site.title;
    store.sessions.currentId = session.id;

    this.list.push(page);

    await session.connect(site);
    await page.load(path);
  }
}
