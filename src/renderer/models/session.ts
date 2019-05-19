import { observable } from 'mobx';
import { Client, IConnectionConfig, File, FileType } from 'qusly-core';

import store from '../store';

export class Session {
  public client = new Client();

  @observable
  public status: 'ok' | 'loading' | 'error' | 'disconnected' = 'disconnected';

  @observable
  public path: string[] = [];

  @observable
  public files: File[] = [];

  public async connect(config: IConnectionConfig) {
    this.status = 'loading';
    console.log(config);

    const res = await this.client.connect(config);

    if (res.success) {
      await this.updatePath();
      await this.loadFiles();

      this.status = 'ok';
    } else {
      console.log('Cant connect', config);
      this.status = 'error';
    }
  }

  private async updatePath() {
    const { path } = await this.client.pwd();
    const slash = path.startsWith('/') ? '/' : '';
    this.path = [slash, ...path.split(/\\|\//).filter(v => v !== '')];
  }

  public async loadFiles() {
    this.status = 'loading';

    const { files, error } = await this.client.ls(this.path.join('/'));
    console.log(error);

    for (const file of files) {
      if (file.type === FileType.File) {
        store.loadIcon(file.ext);
      }
    }

    this.files = files;
    this.status = 'ok';
  }
}
