import { ITransferClientProgress } from 'qusly-core';

export interface ITransferSection {
  _id?: string;
  title?: string;
  items?: ITransferItem[];
}

export interface ITransferItem extends ITransferClientProgress {
  status?: 'waiting' | 'transfering';
}
