import { Tree as TraversalClient, ITreeItem } from 'qusly-core';

import { Session } from './session';

export class Tree {
  public client = new TraversalClient();

  constructor(public session: Session) {
    this.client.on('fetch', this.onFetch);
  }

  public async init() {
    await this.client.connect(this.session.site);

    this.client.init({
      maxDepth: 1,
      filter: ({ file }) => file.type === 'directory',
    });
  }

  private onFetch = (item: ITreeItem) => {
    console.log(item.path);
  }
}
