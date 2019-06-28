import * as React from 'react';
import { observable, action } from 'mobx';
import { extname } from 'path';
import { IRes } from 'qusly-core';

import store from '../store';
import { Session } from './session';
import { sortFiles } from '../utils';
import { Location } from './location';
import { File } from '../models';

let id = 0;

export class Page {
  @observable
  public id = id++;

  @observable
  public tabId: number;

  @observable
  public files: File[] = [];

  @observable
  public focusedFile: File;

  public location = new Location(this);

  @observable
  public loading = true;

  @observable
  public pathInputVisible = false;

  public fileNameInput = React.createRef<HTMLTextAreaElement>();

  constructor(public session: Session) { }

  public async load(path?: string) {
    if (path == null) {
      const res = await this.session.client.pwd();
      if (res.error) console.error(res.error);
      path = res.path;
    }

    this.location.path = path;
  }

  public async fetchFiles() {
    this.loading = true;

    const { files, error } = await this.session.client.readDir(
      this.location.path,
    );

    if (error) console.error(this.location.path, error);
    if (files) await store.favicons.load(files);

    this.files = sortFiles(files);
    this.loading = false;

    store.tabs.getTabById(this.tabId).title = this.title;
  }

  public close() {
    store.pages.list = store.pages.list.filter(r => r.id !== this.id);

    const page = store.pages.list.find(r => r.session === this.session);

    if (page == null) {
      this.session.close();
    } else if (store.tabs.nextTab != null) {
      store.tabs.nextTab.select();
    } else if (store.tabs.previousTab != null) {
      store.tabs.previousTab.select();
    }
  }

  public get title() {
    return `${this.session.site.title} - ${this.location.path}`;
  }

  public get selectedFiles() {
    return this.files.filter(e => e.selected);
  }

  @action
  public unselectFiles() {
    for (const file of this.files) {
      if (file.selected) {
        file.selected = false;
      }
    }
  }

  public async rename(newName: string) {
    const file = this.focusedFile;
    const oldName = file.name;

    file.renaming = false;
    newName = newName.trim();

    if (newName.length && !this.files.find(e => e.name.toLowerCase() === newName.toLowerCase())) {
      file.name = newName;
      file.ext = extname(newName);

      await store.favicons.loadExt(file.ext);

      const path = this.location.path;
      const { error } = await this.session.client.move(`${path}/${oldName}`, `${path}/${newName}`);

      if (error) {
        file.name = oldName;
        console.error(error);
      }
    }
  }

  public async createBlank(type: 'folder' | 'file') {
    const name = this.getUniqueName(`new ${type}`);
    const path = `${this.location.path}/${name}`;
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
  }

  public getUniqueName(str: string) {
    let exists = false;
    let index = 0;

    for (let i = this.files.length - 1; i > 0; i--) {
      const name = this.files[i].name.toLowerCase();

      if (name.startsWith(str)) {
        exists = true;

        const matches = name.match(/\(([^)]+)\)/);

        if (matches != null) {
          const fileIndex = parseInt(matches[1], 10);

          if (fileIndex > index) {
            index = fileIndex;
          }
        }
      }
    }

    return exists ? `${str} (${index + 1})` : str;
  }
}
