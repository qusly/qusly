import { observable } from "mobx";
import { Client, IConfig } from "qusly-core";

import { Tree } from "./tree";

let id = 0;

export class Session {
  @observable
  public id = id++;

  public client = new Client();

  public hostname = '';

  public tree = new Tree();

  public async connect(config: IConfig) {
    const res = await this.client.connect(config);
    if (!res.success) throw res.error;

    this.tree.init(config);
  }

  public async close() {
    await this.client.disconnect();
  }
}
