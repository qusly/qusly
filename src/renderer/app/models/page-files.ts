import { observable, action } from 'mobx';

import { Page } from './page';
import store from '../store';
import { IFile } from '~/renderer/interfaces';

export class PageFiles {
  @observable
  public list: IFile[] = [];

  @observable
  protected _selected: IFile[] = [];

  @observable
  public anchorFile: IFile;

  public refs: HTMLDivElement[] = [];

  constructor(protected page: Page) {}

  @action
  public fetch = async () => {
    this.page.loading = true;

    const path = this.page.history.path;

    const files = await this.page.client.readDir(path);
    const icons = files.map(r => r.ext);

    await store.icons.load(icons);

    this.refs = [];
    this.list = files;
    this._selected = [];
    this.page.loading = false;
  };

  @action
  public async move(files: IFile[], dest: string) {
    this.selected = [];

    const path = this.page.history.path;

    try {
      for (const file of files) {
        const srcPath = `${path}/${file.name}`;
        const destPath = `${dest}/${file.name}`;

        await this.page.client.move(srcPath, destPath);

        this.list = this.list.filter(r => r !== file);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public get selected() {
    return this._selected;
  }

  public set selected(files: IFile[]) {
    this.selectFiles(this._selected, false);
    this._selected = files;
    this.selectFiles(this._selected);
  }

  public selectGroup = (start: number, end: number) => {
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

      this.selectGroup(anchorIndex, destIndex);
    } else {
      this.anchorFile = data;
    }

    if (!selected && !e.ctrlKey && !e.shiftKey) {
      this.selected = [data];
    }
  };

  public onFileMouseUp = (e: React.MouseEvent, data: IFile) => {
    if (e.ctrlKey || e.shiftKey) return;

    const index = this.selected.indexOf(data);
    const selected = index !== -1;

    if (selected) {
      this.selected = [data];
    }
  };

  public onSelection = (selected: IFile[]) => {
    this.selected = selected;
  };

  public onDrop = (dest: IFile) => {
    if (dest.type !== 'folder' || !this.selected.length) return;

    const files = this.selected.filter(r => r !== dest);
    const path = `${this.page.history.path}/${dest.name}`;

    this.move(files, path);
  };
}
