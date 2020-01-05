import { observable, action } from 'mobx';

import { Session } from './session';
import { ITreeItem, IFile } from '~/interfaces';
import { formatTreeItems } from '../utils/tree';

export class Tree {
  @observable
  public items: ITreeItem[] = [
    {
      path: '/',
      file: {
        name: '/',
      },
      expanded: true,
      children: [],
    } as any,
  ];

  constructor(public session: Session) {}

  @action
  public async fetch(item?: ITreeItem) {
    if (item) {
      if (item.fetched) return;
      item.fetched = true;
    }

    // TODO: Refactor
    const path = !item ? '/' : item.path;
    const list = !item ? this.items : item.children;

    const files = await this.session.client.readDir(path);
    const items = formatTreeItems(files, path);

    list.push(...items);
  }

  @action
  public async update(item: ITreeItem, files: IFile[]) {
    if (!item) return;

    item.fetched = true;

    item.children = formatTreeItems(files, item.path).map(r => {
      const child = item.children.find(el => el.path === r.path);

      if (!child) return r;

      return {
        ...r,
        children: child.children,
        expanded: child.expanded,
        fetched: child.fetched,
      };
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
