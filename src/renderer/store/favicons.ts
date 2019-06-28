import { observable } from 'mobx';
import { ipcRenderer } from 'electron';
import { transparency } from 'wexond-ui';

import { icons } from '../constants';
import { File } from '../models';

export class FaviconsStore {
  @observable
  public favicons: { [key: string]: string } = {};

  public load(files: File[]) {
    return new Promise((resolve) => {
      ipcRenderer.once('get-extensions-icons', (e: any, data: any) => {
        this.favicons = { ...this.favicons, ...data };
        resolve();
      });

      const list = files.filter(e => this.favicons[e.ext] == null && e.ext !== '').map((e) => e.ext);

      ipcRenderer.send('get-extensions-icons', list);
    })
  }

  public get(file: File) {
    const { type, ext } = file;

    let icon = icons.file;
    let opacity = transparency.icons.inactive;

    if (type === 'directory') {
      icon = icons.folder;
    } else if (ext !== '' && this.favicons[ext] != null) {
      icon = this.favicons[ext];
      opacity = 1;
    }

    return { icon, opacity };
  }
}

export default new FaviconsStore();
