import { IFile } from '~/renderer/interfaces';

export const sortFiles = (files: IFile[]) => {
  return files.sort((a, b) => {
    if (a.type !== 'folder' && b.type === 'folder') {
      return 1;
    } else if (a.type === 'folder' && b.type !== 'folder') {
      return -1;
    }

    return a.name.localeCompare(b.name);
  });
};
