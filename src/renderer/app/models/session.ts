import { Client } from 'qusly-core';

import { ISite } from '~/interfaces';

export type ConnectionStatus = 'connecting' | 'connected';

let id = 0;

export class Session {
  public id = id++;

  public client = new Client();

  public site: ISite;

  public status: ConnectionStatus;

  public async connect(site: ISite) {
    this.site = site;
    this.status = 'connecting';

    const res = await this.client.connect(site);

    if (res.success) {
      this.status = 'connected';
    } else {
      console.error(res.error);
    }
  }
}
