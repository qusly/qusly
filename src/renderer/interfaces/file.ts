import { IFile as ICoreFile } from 'qusly-core';

export interface IFile extends ICoreFile {
  index: number;
}

export interface IFileIcon {
  data: any;
  opacity: number;
}
