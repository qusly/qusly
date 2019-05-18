import { observable } from 'mobx';
import { Client, IConnectionConfig, File, FileType } from 'qusly-core';

import store from '../store';

export class Session {
  public client = new Client();

  @observable
  public status: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected';

  @observable
  public path: string[] = [];

  @observable
  public files: File[] = [];

  public async connect(config: IConnectionConfig) {
    this.status = 'connecting';

    const res = await this.client.connect(config);

    if (!res.success) {
      console.log('Cant connect', config);
      this.status = 'error';
      return;
    }

    await this.updatePath();
    await this.loadFiles();

    this.status = 'connected';
  }

  public async updatePath() {
    const { path } = await this.client.pwd();
    const slash = path.startsWith('/') ? '/' : '';
    this.path = [slash, ...path.split(/\\|\//).filter(v => v !== '')];
  }

  public async loadFiles() {
    const { files } = await this.client.ls('./');

    for (const file of files) {
      if (file.type === FileType.File) {
        store.loadIcon(file.ext);
      }
    }

    this.files = files;
  }
}
