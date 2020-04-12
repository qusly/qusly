import { observable, action } from 'mobx';

import store from '.';
import { setPassword, getPassword, deletePassword } from '~/utils/credentials';
import { ISite } from '~/interfaces';
import { Database } from '~/renderer/models/database';

export class SitesStore {
  public db = new Database<ISite>('sites');

  @observable
  public list: ISite[] = [];

  constructor() {
    this.load();
  }

  @action
  private async load() {
    this.list = await this.db.get({});
  }

  @action
  public async openInTab(site: ISite) {
    site.password = await getPassword(site._id);
    store.tabs.addTab({ active: true, site });
  }

  @action
  public async add(site: ISite) {
    const { password } = site;
    const res = await this.db.insert({
      ...site,
      password: '',
      date: new Date(),
    });

    this.list.push(res);

    await setPassword(res._id, password);
  }

  @action
  public async update(_id: string, changed: ISite) {
    const index = this.list.indexOf(this.list.find(r => r._id === _id));
    const { password } = changed;

    changed = { ...changed, password: '' };
    this.list[index] = { ...this.list[index], ...changed };

    await this.db.update({ _id }, changed);
    await setPassword(_id, password);
  }

  @action
  public async remove(_id: string) {
    this.list = this.list.filter(r => r._id !== _id);

    await this.db.remove({ _id });
    await deletePassword(_id);
  }
}
