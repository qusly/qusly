import { observable, action } from 'mobx';
import { extname } from 'path';
import { IRes, IFile } from 'qusly-core';

import store from '../store';
import { Session } from './session';
import { sortFiles, genFileName } from '../utils';
import { Location } from './location';
import { File } from '../models';
import FileComponent from '../components/File';

let id = 0;

export class Page {
  @observable
  public id = id++;

  @observable
  public tabId: number;

  @observable
  public files: File[] = [];

  public filesComponents: FileComponent[] = [];

  @observable
  public loading = true;

  @observable
  public pathInputVisible = false;

  public focusedFile: File;

  public hoveredFile: File;

  public fileNameInput: HTMLTextAreaElement;

  public location = new Location(this);

  public cutFiles: IFile[] = [];

  public cutPath: string;

  constructor(public session: Session) { }

  public get title() {
    return `${this.session.site.title} - ${this.location.path}`;
  }

  public get selectedFiles() {
    return this.files.filter(e => e.selected);
  }

  public async load(path?: string) {
    if (path == null) {
      const res = await this.session.client.pwd();
      path = res.path;

      if (res.error) {
        console.error(res.error);
      }
    }

    this.location.path = path;
  }

  public close() {
    store.pages.list = store.pages.list.filter(r => r.id !== this.id);

    const page = store.pages.list.find(r => r.session === this.session);

    if (!page) {
      this.session.close();
    } else if (store.tabs.nextTab != null) {
      store.tabs.nextTab.select();
    } else if (store.tabs.previousTab != null) {
      store.tabs.previousTab.select();
    }
  }

  @action
  public focusFile(file: File) {
    if (!file.selected) {
      this.unselectFiles();
    }

    this.focusedFile = file;
    file.selected = true;
  }

  @action
  public unselectFiles() {
    for (const file of this.files) {
      if (file.selected) {
        file.selected = false;
      }
    }
  }

  public selectGroup(start: number, end: number) {
    const bigger = start >= end;
    const startIndex = bigger ? end : start;
    const endIndex = !bigger ? end : start;

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const selected = i >= startIndex && i <= endIndex;

      if (file.selected !== selected) {
        file.selected = selected;
      }
    }
  }

  public cutSelectedFiles() {
    this.uncutFiles();
    this.cutFiles = this.selectedFiles;
    this.cutPath = this.location.path;

    for (const file of this.selectedFiles) {
      file.cut = true;
    }
  }

  public uncutFiles() {
    for (const file of this.files) {
      file.cut = false;
    }
  }

  public async fetchFiles() {
    this.loading = true;

    const path = this.location.path;
    const { files, error } = await this.session.client.readDir(path);

    if (error) console.error(path, error);
    if (files) await store.favicons.load(files);

    this.files = sortFiles(files);
    this.loading = false;

    store.tabs.getTabById(this.tabId).title = this.title;
  }

  public async rename(file: File, newName: string) {
    const oldName = file.name;

    this.focusedFile = null;
    file.renaming = false;
    newName = newName.trim();

    if (newName.length && !this.files.find(e => e.name.toLowerCase() === newName.toLowerCase())) {
      file.name = newName;
      file.ext = extname(newName);

      await store.favicons.loadExt(file.ext);

      const oldPath = this.location.relative(oldName);
      const newPath = this.location.relative(newName);

      const { error } = await this.session.client.move(oldPath, newPath);

      if (error) {
        file.name = oldName;
        console.error(error);
      }
    }
  }

  public async createBlank(type: 'folder' | 'file') {
    const name = genFileName(this.files, `new ${type}`);
    const path = this.location.relative(name);
    let res: IRes;

    if (type === 'folder') {
      res = await this.session.client.mkdir(path);
    } else {
      res = await this.session.client.touch(path);
    }

    if (res.error) return console.error(name, type, path, res.error);

    await this.fetchFiles();
    const file = this.files.find(item => item.name === name);

    file.selected = true;
    this.focusedFile = file;
  }

  public async dropRemoteFiles() {
    this.loading = true;

    if (this.hoveredFile.type === 'directory' && this.focusedFile !== this.hoveredFile) {
      for (const file of this.selectedFiles) {
        const oldPath = this.location.relative(file.name);
        const newPath = this.location.relative(this.hoveredFile.name, file.name);

        await this.session.client.move(oldPath, newPath);
      }

      await this.fetchFiles();
    }
  }

  public async deleteFiles(files: File[]) {
    this.loading = true;

    for (const file of files) {
      const path = this.location.relative(file.name);

      if (file.type === 'directory') {
        await this.session.client.rimraf(path);
      } else {
        await this.session.client.unlink(path);
      }
    }

    await this.fetchFiles();
  }

  public async pasteFiles(page = false) {
    this.loading = true;

    for (const file of this.cutFiles) {
      const focusedFile = page ? null : this.focusedFile.name;
      const oldPath = this.location.combine(this.cutPath, file.name);
      const newPath = this.location.relative(focusedFile, file.name)

      await this.session.client.move(oldPath, newPath);
    }

    this.cutFiles = [];

    await this.fetchFiles();
  }
}
