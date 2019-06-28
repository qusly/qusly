import { IFile } from 'qusly-core';

export interface File extends IFile {
  selected?: boolean;
  renaming?: boolean;
}
