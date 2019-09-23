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

    await setPassword('qusly', `site-${res._id}`, password);
  }

  public async openInTab(site: ISite) {
    site.password = await this.getPassword(site._id);
    store.tabs.addTab({ active: true, site });
  }

  public getPassword(_id: string) {
    return getPassword('qusly', `site-${_id}`);
  }

  public async update(_id: string, changed: ISite) {
    const index = this.list.indexOf(this.list.find(r => r._id === _id));

    this.list[index] = { ...this.list[index], ...changed };

    await this.db.update({ _id: _id } as any, { ...changed, password: '' }); // TODO
    await setPassword('qusly', `site-${_id}`, changed.password);
  }
}
