import { observable, action } from 'mobx';
import { IFile } from 'qusly-core';

import { Session } from './session';

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

  public anchorFile: IFile;

  constructor(public session: Session) {}

  @action
  public selectFiles = (start: number, end: number) => {
    if (start > end) [start, end] = [end, start];

    this.selectedFiles = this.files.slice(start, end + 1);
  };
}
