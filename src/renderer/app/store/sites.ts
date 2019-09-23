import { observable, action } from 'mobx';
import { setPassword, getPassword, deletePassword } from 'keytar';

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

  @action
  private async load() {
    this.list = await this.db.get({} as any);
  }

  @action
  public async add(site: ISite) {
    const { password } = site;
    const res = await this.db.insert({ ...site, password: '' });

    this.list.push(res);

    await setPassword('qusly', `site-${res._id}`, password);
  }

  @action
  public async openInTab(site: ISite) {
    site.password = await this.getPassword(site._id);
    store.tabs.addTab({ active: true, site });
  }

  public setPassword(_id: string, password: string) {
    return setPassword('qusly', `site-${_id}`, password);
  }

  public getPassword(_id: string) {
    return getPassword('qusly', `site-${_id}`);
  }

  public deletePassword(_id: string) {
    return deletePassword('qusly', `site-${_id}`);
  }

  @action
  public async update(_id: string, changed: ISite) {
    const index = this.list.indexOf(this.list.find(r => r._id === _id));

    this.list[index] = { ...this.list[index], ...changed, password: '' };

    await this.db.update({ _id } as any, { ...changed }); // TODO
    await this.setPassword(_id, changed.password);
  }

  @action
  public async remove(_id: string) {
    this.list = this.list.filter(r => r._id !== _id);

    await this.db.remove({ _id } as any); // TODO
    await this.deletePassword(_id);
  }
}
