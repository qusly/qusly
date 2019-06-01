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

  public async init(config: IConfig) {
    const { error } = await this.client.connect(config);
    if (error) throw error;
    this.search();
  }

  public async search(maxDepth = 1) {
    if (this.searchDepth > maxDepth) return;

    for (const item of this.queue) {
      const res = await this.client.readDir(item.path);
      if (res.error) throw res.error;

      for (const file of res.files) {
        if (file.type === 'directory') {
          const root = item.parent == null ? this.items : item.parent.children;

          root.push({
            _id: makeId(10),
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
    this.searchDepth++;
    this.search(maxDepth);
  }

  public async stop() {
    await this.client.disconnect();
  }
}
