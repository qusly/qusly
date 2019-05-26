import { observable } from 'mobx';
import { Client, IConfig, IFile } from 'qusly-core';

import { PathManager } from './path';

export class Session {
  @observable
  public status: 'disconnected' | 'loading' | 'ok' = 'disconnected';

  @observable
  public files: IFile[] = [];

  public client = new Client();

  public pathManager = new PathManager();

  public async connect(config: IConfig) {
    this.status = 'loading';

    const res = await this.client.connect(config);
    if (!res.success) throw res.error;

    await this.pathManager.init();
    await this.fetchFiles();
  }

  public async fetchFiles() {
    this.status = 'loading';

    const res = await this.client.readDir(this.pathManager.path);

    this.files = res.files;
    this.status = 'ok';
  }

  public async close() {
    await this.client.disconnect();
  }
}
