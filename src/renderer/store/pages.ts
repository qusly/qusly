import { observable } from "mobx";

import { Page, Session } from "../models";
import store from ".";

export class PagesStore {
  @observable
  public list: Page[] = [];

  public get current() {
    return this.list.find(e => e.tabId === store.tabs.selectedTab.id);
  }

  public add() {
    const page = new Page();
    const session = new Session();

    store.sessions.list.push(session);
    page.sessionId = session.id;

    this.list.push(page);
  }
}
