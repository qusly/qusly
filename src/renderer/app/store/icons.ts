import { ipcRenderer } from 'electron';
import { observable, action } from 'mobx';
import { IFile } from 'qusly-core';

import { IFileIcon } from '~/renderer/interfaces';
import { icons, transparency } from '~/renderer/constants';

interface IGetIconsRes {
  [key: string]: string;
}

export class IconsStore {
  @observable
  public map = new Map<string, string>();

  @action
  public async load(...list: string[]) {
    if (!list || !list.length) return;

    const data: IGetIconsRes = await ipcRenderer.invoke('get-icons', list);

    for (const ext in data) {
      this.map.set(ext, data[ext]);
    }
  }

  @action
  public async loadFiles(...files: IFile[]) {
    const list = files.filter(r => r.type !== 'folder').map(r => r.ext);

    await this.load(...list);
  }

  public getFileIcon(file: IFile): IFileIcon {
    const base64 = this.map.get(file?.ext);

    if (file?.ext && file?.type !== 'folder' && base64) {
      return { data: base64, opacity: 1 };
    }

    return {
      data: file?.type === 'folder' ? icons.folder : icons.file,
      opacity: transparency.icons.inactive,
    };
  }
}
