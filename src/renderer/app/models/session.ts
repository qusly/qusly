import { Client } from 'qusly-core';

import { ISite } from '~/interfaces';
import store from '../store';

export type ConnectionStatus = 'connecting' | 'connected';

let id = 0;

export class Session {
  public id = id++;

  public client = new Client();

  public status: ConnectionStatus;

  public startPath: string;

  constructor(public site: ISite) { }

  public async connect() {
    if (this.status !== 'connecting') {
      this.status = 'connecting';

      const res = await this.client.connect(this.site);
      if (!res.success) throw res.error;

      const { path } = await this.client.pwd();

      this.startPath = path;
      this.status = 'connected';
    }
  }

  public async close() {
    await this.client.disconnect();

    store.sessions.list = store.sessions.list.filter(r => r !== this);
  }
}
