import { ipcRenderer } from 'electron';
import { observable, action } from 'mobx';
import { extname } from 'path';

import { IFile } from '~/interfaces';
import { makeId } from '~/utils';
import { icons } from '~/renderer/constants/icons';
import { transparency } from '~/renderer/constants/transparency';

export class IconsStore {
  @observable
  public icons: Map<string, string> = new Map();

  @action
  public load(...files: IFile[]) {
    if (!files || !files.length) return null;

    return new Promise(resolve => {
      const id = makeId(32);
      const list = files
        .map(r => r.ext)
        .filter(
          (ext, index, arr) =>
            ext.length && arr.indexOf(ext) === index && !this.icons.get(ext),
        );

      if (!list.length) return resolve();

      ipcRenderer.once(`get-icons-${id}`, (e, icons) => {
        for (const ext in icons) {
          this.icons.set(ext, icons[ext]);
        }

        resolve();
      });

      ipcRenderer.send(`get-icons`, list, id);
    });
  }

  public getIcon(file: IFile) {
    if (!file) return { icon: '', opacity: 1 };

    let icon = file.type === 'folder' ? icons.folder : this.icons.get(file.ext);
    const opacity =
      file.type === 'folder' || !icon ? transparency.icons.inactive : 1;

    if (!icon && file.type !== 'folder') {
      icon = icons.file;
    }

    return { icon, opacity };
  }

  public getPathIcon(path: string) {
    return this.getIcon({
      type: 'file',
      ext: extname(path),
    });
  }
}
