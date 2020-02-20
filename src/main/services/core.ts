import { ipcMain } from 'electron';
import { Client } from 'qusly-core';

import { AppWindow } from '../windows';
import { ISite } from '~/interfaces';

export class Core {
  public clients = new Map<number, Client>();

  constructor(public appWindow: AppWindow) {
    ipcMain.handle('core-create', (e, id: number) => {
      if (!this.clients.has(id)) {
        this.clients.set(id, new Client());
      }
    });

    ipcMain.handle('core-connect', (e, site: ISite) => {
      return this.clients.get(site.id).connect(site);
    });

    ipcMain.handle('core-read-dir', (e, id: number, path: string) => {
      return this.clients.get(id).readDir(path);
    });

    ipcMain.handle('core-pwd', (e, id: number) => {
      return this.clients.get(id).pwd();
    });
  }
}
