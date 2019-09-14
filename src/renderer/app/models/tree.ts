import { observable, action } from 'mobx';
import { formatPath } from 'qusly-core';

import { Session } from './session';
import { ITreeItem } from '~/interfaces';

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

    const folders = res.files.filter(r => r.type === 'directory').map(r => ({
      file: r,
      path: formatPath(path, r),
      children: []
    }) as ITreeItem);

    list.push(...folders);
  }
}
