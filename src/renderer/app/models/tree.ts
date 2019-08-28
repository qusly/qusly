import { observable, action } from 'mobx';
import { Tree as TraversalClient, ITreeItem as ITraversalItem } from 'qusly-core';

import { Session } from './session';
import { ITreeItem } from '~/interfaces';

export class Tree {
  @observable
  public items: ITreeItem[] = [];

  private parent: ITreeItem;

  public client = new TraversalClient();

  constructor(public session: Session) {
    this.client.on('fetch', this.onFetch);
  }

  public async init(item?: ITreeItem) {
    await this.client.connect(this.session.site);

    if (item) {
      this.parent = item;
    }

    this.client.init({
      maxDepth: -1,
      path: item ? item.path : '/',
      filter: ({ file }) => file.type === 'directory',
    });
  }

  @action
  private onFetch = ({ file, path }: ITraversalItem) => {
    const list = !this.parent ? this.items : this.parent.children;

    list.push({
      file,
      path,
      children: [],
    });
  }
}
