import { action } from 'mobx';

import { ISite } from '~/interfaces';
import { Page } from './page';
import { Client } from './client';
import { Tree } from './tree';

export class Session {
  public client = new Client();

  public tree = new Tree(this);

  public status: 'disconnected' | 'connecting' | 'connected' = 'disconnected';

  public startingDir: string;

  constructor(public config: ISite) {}

  public async prepare() {
    if (this.status === 'connected') return;

    this.status = 'connecting';

    try {
      await this.client.connect(this.config);

      this.startingDir = await this.client.pwd();

      await this.tree.prepare();
    } catch (error) {
      console.log(error);
    }

    this.status = 'connected';
  }

  @action
  public createNewPage(path?: string) {
    const page = new Page(this);

    page.prepare(path);

    return page;
  }
}
