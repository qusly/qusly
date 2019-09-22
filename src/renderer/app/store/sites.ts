import { observable } from 'mobx';
import { setPassword, getPassword } from 'keytar';

import { Database } from '~/renderer/models';
import { ISite } from '~/interfaces';

export class SitesStore {
  public db = new Database<ISite>('sites');

  @observable
  public list: ISite[] = [];

  constructor() {
    this.load();
  }

  private async load() {
    const res = await this.db.get({} as any);

    res.forEach(async item => {
      item.password = await getPassword('qusly', `site-${item._id}`);
    });

    this.list = res;
  }

  public async add(site: ISite) {
    const { password } = site;
    const res = await this.db.insert({ ...site, password: '' });

    setPassword('qusly', `site-${res._id}`, password);
  }
}
