import { observable, computed, action } from 'mobx';

import { Page, Tab } from '../models';
import { ISite } from '~/interfaces';
import store from '.';

export class PagesStore {
  @observable
  public list: Page[] = [];

  @computed
  public get current() {
    const tab = store.tabs.selectedTab;
    return this.list.find(e => e.id === tab.pageId);
  }

  @action
  public async add(site: ISite, tab: Tab, path?: string) {
    const session = await store.sessions.add(site);
    const page = new Page(session);

    tab.pageId = page.id;
    tab.sessionId = session.id;
    tab.title = site.title;

    this.list.push(page);

    await session.connect();
    await page.load(path || session.startPath);
  }
}
