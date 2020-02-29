import { IFile as ICoreFile } from 'qusly-core';

export interface IFile extends ICoreFile {
  index: number;
  state?: IFileState;
}

export interface IFileIcon {
  data: any;
  opacity: number;
}

export interface IFileState {
  cut?: boolean;
}
