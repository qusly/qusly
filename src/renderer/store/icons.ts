import { observable } from 'mobx';
import { ipcRenderer } from 'electron';
import { IFile } from 'qusly-core';

import { icons, transparency } from '../constants';

export interface ExtIcons {
  [key: string]: string;
}

export class IconsStore {
  @observable
  public map: ExtIcons = {};

  constructor() {
    ipcRenderer.on('get-ext-icon', (e: any, { ext, data }: any) => {
      this.map[ext] = data;
    });
  }

  public load(ext: string) {
    if (this.map[ext] == null) {
      ipcRenderer.send('get-ext-icon', ext);
    }
  }

  public get(file: IFile) {
    const { type, ext } = file;

    let icon = icons.file;
    let opacity = transparency.icons.inactive;

    if (type === 'directory') {
      icon = icons.folder;
    } else if (ext !== '' && this.map[ext] != null) {
      icon = this.map[ext];
      opacity = 1;
    }

    return { icon, opacity };
  }
}

export default new IconsStore();
