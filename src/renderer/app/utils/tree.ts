import { formatPath } from 'qusly-core';

import { IFile, ITreeItem } from '~/interfaces';

export const formatTreeItems = (files: IFile[], path: string) => {
  return files.filter(r => r.type === 'directory').map(r => ({
    file: r,
    path: formatPath(path, r),
    children: []
  }) as ITreeItem);
}
