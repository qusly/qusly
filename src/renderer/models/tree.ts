import { observable } from 'mobx';
import { Client, IConfig } from 'qusly-core';

import { TreeItem } from './tree-item';
import { makeId } from '../utils';

interface QueueItem {
  parent?: TreeItem;
  path: string;
}

export class Tree {
  @observable
  public items: TreeItem[] = [];

  public client: Client;

  public queue: QueueItem[] = [{ path: '/' }];

  public tempQueue: QueueItem[] = [];

  public searchDepth = 0;

  public blackList = [
    'etc',
    'lost+found',
    'proc',
    'sys',
    'srv',
  ]

  public async init(config: IConfig) {
    this.client = new Client();

    const { error } = await this.client.connect(config);
    if (error) throw error;

    await this.search();
    this.stop();
  }

  public async search(maxDepth = 1) {
    if (this.searchDepth > maxDepth) return;

    for (const item of this.queue) {
      const res = await this.client.readDir(item.path);

      if (res.error) {
        console.error(res.error, item.path);
        continue;
      }

      for (const file of res.files) {
        if (file.type === 'directory' && this.blackList.indexOf(file.name) === -1) {
          const list = item.parent == null ? this.items : item.parent.children;
          const path = `${item.path}/${file.name}/`;

          list.push({
            _id: makeId(10),
            name: file.name,
            children: [],
            path,
          })

          this.tempQueue.push({
            parent: list[list.length - 1],
            path,
          });
        }
      }
    }

    this.queue = this.tempQueue;
    this.tempQueue = [];
    this.searchDepth++;

    await this.search(maxDepth);
  }

  public stop() {
    this.client.disconnect();
    this.queue = [];
    this.tempQueue = [];
  }
}
