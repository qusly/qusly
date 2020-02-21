import { observable, action } from 'mobx';

import { Page } from './page';
import store from '../store';
import { IFile } from '~/renderer/interfaces';

const _files: IFile[] = Array.from(Array(50).keys()).map(r => {
  return {
    name: r.toString(),
  } as IFile;
});

export class PageFiles {
  @observable
  public list: IFile[] = [..._files];

  @observable
  protected _selected: IFile[] = [];

  public refs: HTMLDivElement[] = [];

  protected anchorFile: IFile;

  constructor(protected page: Page) {}

  @action
  public async fetch() {
    const files = await this.page.client.readDir(this.page.history.path);
    const icons = files.map(r => r.ext);

    await store.icons.load(icons);

    this.refs = [];
    this.list = files;
    this._selected = [];
  }

  public get selected() {
    return this._selected;
  }

  public set selected(files: IFile[]) {
    this.selectFiles(this._selected, false);
    this._selected = files;
    this.selectFiles(this._selected);
  }

  public selectFilesGroup = (start: number, end: number) => {
    if (start > end) [start, end] = [end, start];

    this.selected = this.list.slice(start, end + 1);
  };

  protected selectFiles(items: IFile[], select = true) {
    items.forEach(r => {
      const ref = this.refs[r.index];

      if (select) ref.classList.add('selected');
      else ref.classList.remove('selected');
    });
  }

  public onFileMouseDown = (e: React.MouseEvent, data: IFile) => {
    if (e.button !== 0) return;

    const index = this.selected.indexOf(data);
    const selected = index !== -1;

    if (e.ctrlKey) {
      if (selected) {
        this.selected = this.selected.filter(r => r !== data);
      } else {
        this.selected = [...this.selected, data];
      }
    }

    if (e.shiftKey) {
      const anchorIndex = this.list.indexOf(this.anchorFile);
      const destIndex = this.list.indexOf(data);

      this.selectFilesGroup(anchorIndex, destIndex);
    } else {
      this.anchorFile = data;
    }

    if (!e.ctrlKey && !e.shiftKey) {
      this.selected = [data];
    }
  };
}
