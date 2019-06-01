import { observable } from "mobx";
import { Client, IConfig } from "qusly-core";

import { TreeItem } from "./tree-item";
import { makeId } from "../utils";

interface QueueItem {
  parent?: TreeItem;
  path: string;
}

export class Tree {
  @observable
  public items: TreeItem[] = [];

  public client = new Client();

  public queue: QueueItem[] = [{ path: '/' }];

  public tempQueue: QueueItem[] = [];

  public searchDepth = 0;

  public blackList = [
    'etc',
    'lost+found',
    'proc',
    'sys',
    'srv'
  ]

  public async init(config: IConfig) {
    const { error } = await this.client.connect(config);
    if (error) throw error;
    this.search();
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

          list.push({
            _id: makeId(10),
            name: file.name,
            children: [],
          })

          this.tempQueue.push({
            path: `${item.path}/${file.name}/`,
            parent: list[list.length - 1],
          });
        }
      }
    }

    this.queue = this.tempQueue;
    this.tempQueue = [];
    this.searchDepth++;
    this.search(maxDepth);
  }

  public async stop() {
    await this.client.disconnect();
  }
}
