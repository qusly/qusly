import { IFile } from './file';

export interface ITreeItem {
  file?: IFile;
  expanded?: boolean;
  path?: string;
  fetched?: boolean;
  children?: ITreeItem[];
}
