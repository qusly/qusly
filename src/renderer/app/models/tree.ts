import { observable, action } from 'mobx';

import { Session } from '.';
import { ITreeFolder } from '~/renderer/interfaces';

export class Tree {
  @observable
  public items: ITreeFolder[] = [];

  constructor(protected session: Session) {}

  @action
  public async prepare() {
    const root: ITreeFolder = {
      name: '/',
      path: '/',
    };

    await this.fetch(root);

    this.items.push(root);
  }

  @action
  public async fetch(folder: ITreeFolder) {
    if (!folder || folder.children) return;

    const subfolders: ITreeFolder[] = [];

    const files = await this.session.client.readDir(folder.path);

    files.forEach(r => {
      if (r.type === 'folder') {
        let path = `/${r.name}`;
        if (folder.path !== '/') path = `/${path}`;

        subfolders.push({ name: r.name, path });
      }
    });

    folder.children = subfolders;
  }
}
