import { observable, action } from 'mobx';
import { extname } from 'path';

import { Page } from './page';
import store from '../store';
import { IFile } from '~/renderer/interfaces';
import { sortFiles } from '../utils';

export class PageFiles {
  @observable
  public list: IFile[] = [];

  @observable
  protected _selected: IFile[] = [];

  @observable
  public anchorFile: IFile;

  @observable
  public renamingFile = false;

  public refs: HTMLDivElement[] = [];

  constructor(protected page: Page) {}

  @action
  public fetch = async () => {
    this.page.loading = true;

    const path = this.page.history.path;
    const files = await this.page.client.readDir(path);

    await store.icons.loadFiles(...files);

    this.refs = [];
    this.list = sortFiles(files);
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

        if (srcPath !== destPath) {
          await this.page.client.move(srcPath, destPath);

          this.list = this.list.filter(r => r !== file);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  @action
  public async rename(file: IFile, name: string) {
    this.renamingFile = false;

    if (this.exists(name)) return;

    const oldName = file.name;
    const path = this.page.history.path;

    try {
      await this.page.client.move(`${path}/${oldName}`, `${path}/${name}`);
      await store.icons.load(name);

      this.editFileData(file, { ext: extname(name), name: name });
    } catch (err) {
      console.log(err);
    }
  }

  @action
  protected editFileData(file: IFile, data: Partial<IFile>) {
    const index = this.list.indexOf(file);

    const list = [
      ...this.list.slice(0, index),
      {
        ...file,
        ...data,
      },
      ...this.list.slice(index + 1, this.list.length),
    ];

    this.list = sortFiles(list);
  }

  public exists(name: string) {
    const ext = extname(name);

    return this.list.find(
      r => r.name.toLowerCase() === name.toLowerCase() && r.ext === ext,
    );
  }

  public get selected() {
    return this._selected;
  }

  public set selected(files: IFile[]) {
    const unselect = this._selected.filter(r => !files.includes(r));

    this.selectFiles(unselect, false);
    this._selected = files;
    this.selectFiles(this._selected);
  }

  protected selectFiles(items: IFile[], select = true) {
    items.forEach(r => {
      const ref = this.refs[r.index];

      if (!ref) return;

      if (select) ref.classList.add('selected');
      else ref.classList.remove('selected');
    });
  }

  @action
  public selectGroup = (start: number, end: number) => {
    if (start > end) [start, end] = [end, start];

    this.selected = this.list.slice(start, end + 1);
  };

  @action
  public onFileMouseDown = (e: React.MouseEvent, data: IFile) => {
    if (e.button !== 0) return;

    store.contextMenu.hide();

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

  @action
  public onFileMouseUp = (e: React.MouseEvent, data: IFile) => {
    if (e.button === 2 || (!e.ctrlKey && !e.shiftKey)) {
      const selected = this.selected.includes(data);

      if (e.button === 2) {
        store.contextMenu.show(e, 'file');

        if (!selected) {
          this.selected = [data];
          this.anchorFile = data;
        }
      } else if (selected) {
        this.selected = [data];
      }
    }
  };

  @action
  public onSelection = (selected: IFile[]) => {
    this.selected = selected;
  };

  @action
  public onDrop = (dest: IFile) => {
    if (dest.type !== 'folder' || !this.selected.length) return;

    const files = this.selected.filter(r => r !== dest);
    const path = `${this.page.history.path}/${dest.name}`;

    this.move(files, path);
  };
}
