import { ipcMain } from 'electron';
import { Client } from 'qusly-core';

import { AppWindow } from '../windows';
import { ISite } from '~/interfaces';
import { IFile } from '~/renderer/interfaces';

export class Core {
  public clients = new Map<number, Client>();

  constructor(public appWindow: AppWindow) {
    ipcMain.handle('core-create', (e, id: number) => {
      if (true || !this.clients.has(id)) {
        this.clients.set(id, new Client());
      }
    });

    ipcMain.handle('core-connect', (e, site: ISite) => {
      return this.clients.get(site.id).connect(site);
    });

    ipcMain.handle('core-read-dir', async (e, id: number, path: string) => {
      return this.clients.get(id).readDir(path);
    });

    ipcMain.handle('core-pwd', (e, id: number) => {
      return this.clients.get(id).pwd();
    });

    ipcMain.handle('core-move', (e, id: number, src: string, dest: string) => {
      return this.clients.get(id).move(src, dest);
    });

    ipcMain.handle('core-touch', (e, id: number, path: string) => {
      return this.clients.get(id).touch(path);
    });

    ipcMain.handle('core-mkdir', (e, id: number, path: string) => {
      return this.clients.get(id).mkdir(path);
    });

    ipcMain.handle('core-delete', (e, id: number, path: string) => {
      return this.clients.get(id).delete(path);
    });
  }
}
