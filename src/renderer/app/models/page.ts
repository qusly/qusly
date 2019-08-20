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

  public path = new Location(this);

  public focusedFile: IFile;

  constructor(public session: Session) { }

  public async load(path?: string) {
    await this.path.push(path);
  }

  @action
  public fetchFiles = async () => {
    this.loading = true;

    const path = this.path.toString();
    const res = await this.session.client.readDir(path);
    if (!res.success) throw res.error;

    await store.icons.load(res.files);

    this.tab.title = `${this.session.site.title} - ${path}`;
    this.files = res.files || [];
    this.loading = false;
  }

  public get tab() {
    return store.tabs.list.find(r => r.pageId === this.id);
  }

  @action
  public unselectFiles() {
    this.files.forEach(item => {
      item.selected = false;
    });
  }

  @action
  public selectGroup(start: number, end: number) {
    if (start > end) [start, end] = [end, start];

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const selected = i >= start && i <= end;

      if (file.selected !== selected) {
        file.selected = selected;
      }
    }
  }
}
