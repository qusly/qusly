import { remote } from 'electron';
import { basename, resolve } from 'path';
import { action } from 'mobx';
import { Client, TransferClient } from 'qusly-core';

import { ISite } from '~/interfaces';
import store from '../store';
import { Tree } from './tree';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

let id = 0;

const downloadsPath = resolve(remote.app.getPath('downloads'), 'qusly');

export class Session {
  public id = id++;

  public client = new Client();

  public tree = new Tree(this);

  public status: ConnectionStatus = 'disconnected';

  public startPath: string;

  public downloadClient = new TransferClient('download', 1);

  constructor(public site: ISite) {
    this.downloadClient.on('new', store.transfer.onNew);
    this.downloadClient.on('progress', store.transfer.onProgress);
    this.downloadClient.on('finish', store.transfer.onFinish);
  }

  @action
  public async connect() {
    if (this.status === 'disconnected') {
      this.status = 'connecting';

      await this.client.connect(this.site);
      const path = await this.client.pwd();

      this.startPath = path;
      this.status = 'connected';
      this.tree.fetch(this.tree.items[0]);

      await this.downloadClient.connect(this.site);
    }
  }

  @action
  public async close() {
    store.sessions.list = store.sessions.list.filter(r => r !== this);
    await this.client.disconnect();
  }

  @action
  public download(...paths: string[]) {
    for (const path of paths) {
      const fileName = basename(path);
      const localPath = resolve(downloadsPath, fileName);

      this.downloadClient.transfer(localPath, path, this.site);
    }
  }
}
