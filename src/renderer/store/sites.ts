import * as Datastore from 'nedb';
import { observable } from 'mobx';

import { getPath } from '../utils';
import { Site } from '../models';

export class SitesStore {
  public db = new Datastore({
    filename: getPath('storage/sites.db'),
    autoload: true,
  });

  @observable
  public items: Site[] = [];

  constructor() {
    this.load();
  }

  public async load() {
    await this.db.find({}).exec((err, items: Site[]) => {
      if (err) throw err;

      this.items = items;
    });
  }
}
