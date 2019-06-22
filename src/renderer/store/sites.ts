import { observable } from 'mobx';
import * as Datastore from 'nedb';

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

  public add(site: Site) {
    return new Promise((resolve) => {
      console.log(site);
      this.db.insert(site, (err, doc) => {
        if (err) throw err;

        this.items.push(doc);
        resolve();
      })
    });
  }
}
