import { observable, action } from 'mobx';
import { IFile } from 'qusly-core';

import { Session } from './session';
import { History } from './history';

let id = 0;

const _files: IFile[] = Array.from(Array(50).keys()).map(r => {
  return {
    name: r.toString(),
  } as IFile;
});

export class Page {
  @observable
  public id = id++;

  @observable
  public files: IFile[] = [..._files];

  @observable
  public selectedFiles: IFile[] = [];

  @observable
  public loading = true;

  public anchorFile: IFile;

  public history = new History();

  constructor(public session: Session, path?: string) {
    this.history.push(path);
  }

  @action
  public async prepare() {
    setTimeout(async () => {
      await this.session.connect();
      await this.fetch();
    }, 100);
  }

  @action
  public async fetch() {
    this.loading = true;

    const path = this.history.path;

    const files = await this.session.client.readDir(path);
    console.log(files);
    // this.files = files;
    this.loading = false;
  }

  @action
  public selectFiles = (start: number, end: number) => {
    if (start > end) [start, end] = [end, start];

    this.selectedFiles = this.files.slice(start, end + 1);
  };
}
