import { observable } from 'mobx';
import { Client, IConnectionConfig } from 'qusly-core';
import { sep } from 'path';

export class Session {
  public client = new Client();

  @observable
  public status: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected';

  @observable
  public path: string[] = [];

  public async connect(config: IConnectionConfig) {
    this.status = 'connecting';

    const res = await this.client.connect(config);

    if (!res.success) {
      console.log('Cant connect', config);
      this.status = 'error';
      return;
    }

    await this.updatePath();

    this.status = 'connected';
  }

  public async updatePath() {
    const { path } = await this.client.pwd();
    const slash = path.startsWith('/') ? '/' : '';
    this.path = [slash, ...path.split(/\\|\//).filter(v => v !== '')];
  }
}
