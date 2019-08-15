import { Client } from 'qusly-core';

import { ISite } from '~/interfaces';

export type ConnectionStatus = 'connecting' | 'connected';

let id = 0;

export class Session {
  public id = id++;

  public client = new Client();

  public status: ConnectionStatus;

  constructor(public site: ISite) { }

  public async connect() {
    this.status = 'connecting';

    const res = await this.client.connect(this.site);

    if (res.success) {
      this.status = 'connected';
    } else {
      console.error(res.error);
    }
  }
}
