import { ITransferItem } from 'qusly-core';

export interface ITransferSection {
  _id?: string;
  title?: string;
  items?: ITransferItem[];
}
