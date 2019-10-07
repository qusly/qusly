import { ITransferClientItem } from 'qusly-core';

export interface ITransferSection {
  _id?: string;
  title?: string;
  items?: ITransferClientItem[];
}
