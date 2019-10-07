import { ITransferClientProgress } from 'qusly-core';

import { ISite } from './site';

export interface ITransferSection extends ISite {
  items?: ITransferItem[];
}

export interface ITransferItem extends ITransferClientProgress {
  status?: 'waiting' | 'transfering';
}
