import { observable, action } from 'mobx';
import { IFile } from 'qusly-core';

import { Session } from './session';

let id = 0;

const _files: IFile[] = [
  {
    name: 'a',
  },
  {
    name: 'b',
  },
  {
    name: 'c',
  },
  {
    name: 'd',
  },
  {
    name: 'e',
  },
  {
    name: 'f',
  },
  {
    name: 'g',
  },
];

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
