import { observable } from "mobx";
import { Client, IConfig } from "qusly-core";

import { Tree } from "./tree";

let id = 0;

export class Session {
  @observable
  public id = id++;

  @observable
  public connected = false;

  public client: Client;

  public tree = new Tree();

  public hostname = '';

  public async connect(config: IConfig) {
    this.client = new Client();
    const res = await this.client.connect(config);
    if (!res.success) throw res.error;

    this.connected = true;
    this.tree.init(config);
  }

  public async close() {
    await this.client.disconnect();
  }
}
