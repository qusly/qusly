import { IConfig } from 'qusly-core';

export interface ISite extends IConfig {
  _id?: string;
  title?: string;
  date?: Date;
}
