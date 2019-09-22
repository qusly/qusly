import { observable } from 'mobx';
import { setPassword, getPassword } from 'keytar';

import { Database } from '~/renderer/models';
import { ISite } from '~/interfaces';
import store from '.';

export class SitesStore {
  public db = new Database<ISite>('sites');

  @observable
  public list: ISite[] = [];

  constructor() {
    this.load();
  }

  private async load() {
    this.list = await this.db.get({} as any);
  }

  public async add(site: ISite) {
    const { password } = site;
    const res = await this.db.insert({ ...site, password: '' });

    setPassword('qusly', `site-${res._id}`, password);
  }

  public async openInTab(site: ISite) {
    site.password = await this.getPassword(site._id);
    store.tabs.addTab({ active: true, site });
  }

  public getPassword(_id: string) {
    return getPassword('qusly', `site-${_id}`);
  }
}
