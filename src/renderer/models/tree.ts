import { observable } from "mobx";
import { Client, IConfig } from "qusly-core";

import { TreeItem } from "./tree-item";

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

  public depth = 0;

  public async init(config: IConfig) {
    await this.client.connect(config);
    this.search();
  }

  public async search(maxDepth = 0) {
    if (this.depth > maxDepth) return;

    for (const item of this.queue) {
      const res = await this.client.readDir(item.path);
      if (res.error) throw res.error;

      for (const file of res.files) {
        if (file.type === 'directory') {
          const root = item.parent == null ? this.items : item.parent.children;

          root.push({
            name: file.name,
            children: [],
          });

          this.tempQueue.push({
            path: `${item.path}/${file.name}`,
            parent: this.items[this.items.length - 1],
          });
        }
      }
    }

    this.queue = this.tempQueue;
    this.tempQueue = [];
    this.depth++;
    this.search(maxDepth);
  }

  public async stop() {
    await this.client.disconnect();
  }
}
