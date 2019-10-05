import { IFile } from '~/interfaces';

export const sortFiles = (files: IFile[]): IFile[] => {
  if (!files) return [];

  return files.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    const isFirstFolder = a.type === 'folder';
    const isSecondFolder = b.type === 'folder';

    if (isFirstFolder && isSecondFolder
      || !isFirstFolder && !isSecondFolder) {
      return nameA.localeCompare(nameB);
    }

    if (isSecondFolder) return 0;
    if (isFirstFolder) return -1;

    return 0;
  });
}
