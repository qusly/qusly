import { action } from 'mobx';
import { ConcurrentClient } from 'qusly-core';

import { ISite } from '~/interfaces';
import { Page } from './page';

export class Session {
  public client = new ConcurrentClient(1);

  public status: 'disconnected' | 'connecting' | 'connected' = 'disconnected';

  constructor(public config: ISite) {}

  public async connect() {
    if (this.status === 'connected') return;

    this.status = 'connecting';

    try {
      await this.client.connect(this.config);
      console.log('connected');
    } catch (error) {
      console.log(error);
    }

    this.status = 'connected';
  }

  @action
  public createNewPage(path?: string) {
    const page = new Page(this, path);

    page.prepare();

    return page;
  }
}
