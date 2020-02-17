import { observable } from 'mobx';

import { Session } from './session';

let id = 0;

export class Page {
  @observable
  public id = id++;

  constructor(public session: Session) {}
}
