import { Client } from 'qusly-core';

import { Session } from './session';

export class TransferManager {
  public client: Client;

  public queue: string[] = [];

  constructor(public session: Session) { }

  public async connect() {
    if (this.client) return true;

    const config = this.session.site;
    const { error } = await this.session.client.connect(config);

    if (error) {
      console.error('Error before transfering files', error);
    }

    return error;
  }

  public async add() {
    if (await this.connect()) {
      console.log("XDDD");
    }
  }
}
