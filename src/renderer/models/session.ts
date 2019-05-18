import { observable } from 'mobx';
import { Client, IConnectionConfig } from 'qusly-core';

export class Session {
  public client = new Client();

  @observable
  public status: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected';

  public async connect(config: IConnectionConfig) {
    this.status = 'connecting';

    const res = await this.client.connect(config);

    if (!res.success) {
      console.log('Cant connect', config);
      this.status = 'error';
      return;
    }

    this.status = 'connected';
  }
}
