import { observable } from 'mobx';

import { Session } from './session';
import { Location } from './location';

let id = 0;

export class Page {
  @observable
  public id = id++;

  @observable
  public loading = true;

  public path = new Location();

  constructor(public session: Session) { }

  public async load(path?: string) {
    this.path.push(path);
  }
}
