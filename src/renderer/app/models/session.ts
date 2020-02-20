import { action } from 'mobx';
import { ConcurrentClient } from 'qusly-core';

import { ISite } from '~/interfaces';
import { Page } from './page';

export class Session {
  public client = new ConcurrentClient(1, true);

  constructor(public config: ISite) {}

  public async connect() {
    try {
      await this.client.connect(this.config);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  public createNewPage(path?: string) {
    const page = new Page(this, path);

    return page;
  }
}
