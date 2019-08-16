import { observable, action } from 'mobx';

import { Session } from './session';
import { Location } from './location';
import { IFile } from '~/interfaces';
import store from '../store';

let id = 0;

export class Page {
  @observable
  public id = id++;

  @observable
  public loading = true;

  @observable
  public files: IFile[] = [];

  public path = new Location();

  constructor(public session: Session) { }

  public async load(path?: string) {
    this.path.push(path);
    await this.fetchFiles();
  }

  @action
  public async fetchFiles() {
    this.loading = true;

    const path = this.path.toString();
    console.log(path);
    const res = await this.session.client.readDir(path);
    if (!res.success) throw res.error;


    this.files = res.files;
    this.loading = false;
    this.tab.title = `${this.session.site.title} - ${path}`;
  }

  public get tab() {
    return store.tabs.list.find(r => r.pageId === this.id);
  }
}
