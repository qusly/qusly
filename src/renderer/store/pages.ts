import { observable } from "mobx";
import { IConfig } from "qusly-core";

import { Page, Session } from "../models";
import store from ".";

export class PagesStore {
  @observable
  public list: Page[] = [];

  public get current() {
    return this.list.find(e => e.tabId === store.tabs.selectedTab.id);
  }

  public async add(config: IConfig) {
    const page = new Page();

    this.list.push(page);

    let session = store.sessions.list.find(e => e.hostname === config.host);

    if (session == null) {
      session = new Session();
      store.sessions.list.push(session);

      await session.connect(config);
    }

    page.sessionId = session.id;
    page.init();
  }
}
