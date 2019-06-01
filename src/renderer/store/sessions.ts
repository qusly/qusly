import { observable } from "mobx";

import { Session } from "../models";

export class SessionsStore {
  @observable
  public list: Session[] = [];

  @observable
  public currentId = 0;

  public get current() {
    return this.list.find(e => e.id === this.currentId);
  }
}
