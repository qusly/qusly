import { ipcRenderer } from 'electron';
import { observable, action } from 'mobx';
import { IFile } from 'qusly-core';

import { IFileIcon } from '~/renderer/interfaces';
import { icons, transparency } from '~/renderer/constants';

interface IMap {
  [key: string]: string;
}

export class IconsStore {
  @observable
  public map: IMap = {};

  @action
  public async load(list: string[]) {
    if (!list || !list.length) return;

    const data: IMap = await ipcRenderer.invoke('get-icons', list);

    this.map = { ...this.map, ...data };
  }

  public getFileIcon(file: IFile): IFileIcon {
    const base64 = file.ext && this.map[file.ext];

    if (base64) {
      return { data: base64, opacity: 1 };
    } else {
      return {
        data: file.type === 'folder' ? icons.folder : icons.file,
        opacity: transparency.icons.inactive,
      };
    }
  }
}
