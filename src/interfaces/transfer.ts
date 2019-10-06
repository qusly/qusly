import { ITransferClientNew } from 'qusly-core';

import { ISite } from './site';

export interface ITransferSection extends ISite {
  items?: ITransferItem[];
}

export interface ITransferItem extends ITransferClientNew {
  status?: 'waiting' | 'transfering';
  speed?: number;
}
