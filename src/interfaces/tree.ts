import { IFile } from './file';

export interface ITreeItem {
  file: IFile;
  expanded?: boolean;
  path: string;
  children: ITreeItem[];
}
