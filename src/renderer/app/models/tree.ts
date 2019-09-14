import { observable, action } from 'mobx';
import { formatPath } from 'qusly-core';

import { Session } from './session';
import { ITreeItem, IFile } from '~/interfaces';
import { formatTreeItems } from '../utils';

export class Tree {
  @observable
  public items: ITreeItem[] = [];

  constructor(public session: Session) { }

  @action
  public async fetch(item?: ITreeItem) {
    if (item) {
      if (item.fetched) return;
      item.fetched = true;
    }

    const path = !item ? '/' : item.path;
    const list = !item ? this.items : item.children;

    const res = await this.session.client.readDir(path);
    if (!res.success) throw res.error;

    const items = formatTreeItems(res.files, path);

    list.push(...items);
  }

  @action
  public async update(item: ITreeItem, files: IFile[]) {
    if (!item) return;

    item.children = formatTreeItems(files, item.path).map(r => {
      const child = item.children.find(r => r.path === item.path);

      if (!child) return r;

      return {
        ...r,
        fetched: child.fetched,
        children: child.children,
      }
    });
  }

  @action
  public getItem(path: string) {
    const queue = this.items.slice();

    while (queue.length) {
      const item = queue.shift();

      if (item.path === path) {
        return item;
      }

      queue.push(...item.children);
    }

    return null;
  }
}
