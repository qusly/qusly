import { File, FileType } from 'qusly-core';

export const sortFiles = (files: File[]) => {
  return files.sort((a, b) => {
    if (a.type === FileType.Directory && b.type === FileType.Directory) {
      return a.name < b.name ? -1 : 1;
    }

    return b.type - a.type;
  });
}
