import { ipcRenderer } from 'electron';
import { IFile as ICoreFile } from 'qusly-core';

import { ISite } from '~/interfaces';
import { IFile } from '~/renderer/interfaces';

export class Client {
  public config: ISite;

  protected created = false;

  protected get id() {
    return this.config.id;
  }

  protected async create() {
    if (!this.created) {
      await ipcRenderer.invoke('core-create', this.id);
      this.created = true;
    }
  }

  public async connect(config: ISite) {
    this.config = config;

    await this.create();
    await ipcRenderer.invoke('core-connect', this.config);
  }

  public async readDir(path: string): Promise<IFile[]> {
    const files: ICoreFile[] = await ipcRenderer.invoke(
      'core-read-dir',
      this.id,
      path,
    );

    return files.map((r, index) => ({ ...r, index } as IFile));
  }

  public pwd(): Promise<string> {
    return ipcRenderer.invoke('core-pwd', this.id);
  }

  public move(src: string, dest: string) {
    return ipcRenderer.invoke('core-move', this.id, src, dest);
  }

  public touch(path: string) {
    return ipcRenderer.invoke('core-touch', this.id, path);
  }

  public mkdir(path: string) {
    return ipcRenderer.invoke('core-mkdir', this.id, path);
  }
}
