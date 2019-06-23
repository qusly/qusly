import { observable } from 'mobx';
import { Client } from 'qusly-core';

import { Tree } from './tree';
import { Site } from './site';
import store from '../store';

let id = 0;

export class Session {
  @observable
  public id = id++;

  @observable
  public connected = false;

  public client = new Client();

  public tree = new Tree();

  public site: Site;

  public connecting = false;

  public async connect(config: Site) {
    if (this.connecting) return;

    this.connecting = true;
    this.site = config;

    const res = await this.client.connect(config);
    if (!res.success) throw res.error;

    this.connected = true;
  }

  public close() {
    store.sessions.list = store.sessions.list.filter(r => r.id !== this.id);
    this.client.disconnect();
  }
}
