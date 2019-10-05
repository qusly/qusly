import { observable, action, computed } from 'mobx';
import { extname } from 'path';

import store from '../store';
import { Session } from './session';
import { Location } from './location';
import { IFile, ITreeItem } from '~/interfaces';
import { sortFiles } from '../utils';

let id = 0;

export class Page {
  @observable
  public id = id++;

  @observable
  public loading = true;

  @observable
  public files: IFile[] = [];

  @observable
  public focusedFile: IFile;

  @observable
  public cutFiles: IFile[] = [];

  public hoveredFile: IFile;

  public path = new Location(this);

  public cutPath: string;

  constructor(public session: Session) { }

  public async load(path?: string) {
    await this.path.push(path);
  }

  public async close() {
    const pages = store.pages.list.filter(r => r.session.id === this.session.id);

    if (!pages.length) {
      this.session.close();
    }

    store.pages.list = store.pages.list.filter(r => r !== this);
  }

  @action
  public fetchFiles = async () => {
    this.loading = true;

    const path = this.path.toString();
    const files = await this.session.client.readDir(path);

    await store.icons.load(...files);

    this.tab.title = `${this.session.site.title} - ${path}`;
    this.files = sortFiles(files);
    this.loading = false;

    this.session.tree.update(this.treeItem, this.files);
  }

  @computed
  public get tab() {
    return store.tabs.list.find(r => r.pageId === this.id);
  }

  @computed
  public get treeItem() {
    const path = this.path.toString();
    return this.session.tree.getItem(path);
  }

  @computed
  public get selectedFiles() {
    return this.files.filter(e => e.selected);
  }

  @action
  public unselectFiles(...skip: IFile[]) {
    this.files.forEach(item => {
      item.selected = skip.indexOf(item) !== -1;
    });
  }

  @action
  public selectGroup(start: number, end: number) {
    if (start > end) [start, end] = [end, start];

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      file.selected = i >= start && i <= end;
    }
  }

  @action
  public async dropRemote() {
    if (this.hoveredFile && this.hoveredFile.type === 'folder' && this.focusedFile !== this.hoveredFile) {
      this.loading = true;

      for (const file of this.selectedFiles) {
        const oldPath = this.path.relative(file.name);
        const newPath = this.path.relative(this.hoveredFile.name, file.name);

        await this.session.client.move(oldPath, newPath);
      }

      await this.fetchFiles();
    }
  }

  @action
  public async rename(file: IFile, newName: string) {
    newName = newName.trim();
    file.renamed = false;

    const oldName = file.name;
    const ext = extname(newName);
    const exists = this.files.find(r => r.name.toLowerCase() === newName.toLowerCase() && r.ext === ext);

    if (!exists && newName.length) {
      file.name = newName;
      file.ext = ext;

      if (file.type !== 'folder') {
        await store.icons.load(file);
      }

      const oldPath = this.path.relative(oldName);
      const newPath = this.path.relative(newName);

      try {
        await this.session.client.move(oldPath, newPath);
      } catch (error) {
        file.name = oldName;
      }

      this.files = sortFiles(this.files);
    }
  }

  @action
  public async delete(files: IFile[]) {
    this.loading = true;

    for (const file of files) {
      const path = this.path.relative(file.name);

      if (file.type === 'folder') {
        await this.session.client.rimraf(path);
      } else {
        await this.session.client.unlink(path);
      }
    }

    await this.fetchFiles();
  }

  @action
  public async cut(files: IFile[]) {
    this.cutFiles = files;
    this.cutPath = this.path.toString();
    this.files.forEach(file => {
      file.cut = files.indexOf(file) !== -1;
    });
  }

  @action
  public async paste(wd = false) {
    if (this.cutFiles.length) {
      this.loading = true;

      const dir = wd ? '' : this.focusedFile.name;

      for (const file of this.cutFiles) {
        const oldPath = `${this.cutPath}/${file.name}`;
        const newPath = this.path.relative(dir, file.name);

        await this.session.client.move(oldPath, newPath)
      }

      this.cutFiles = [];

      await this.fetchFiles();
    }
  }

  @action
  public async createBlank(type: 'folder' | 'file') {
    const path = this.path.toString();
    const fileName = await this.session.client.createBlank(type, path, this.files);

    await this.fetchFiles();
    const file = this.files.find(r => r.name === fileName);

    file.selected = true;
    this.focusedFile = file;
  }
}
