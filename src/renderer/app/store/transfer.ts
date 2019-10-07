import { observable, computed, action } from 'mobx';
import { ITransferType, ITransferClientItem } from 'qusly-core';

import { ITransferSection, ISite } from '~/interfaces';

export class TransferStore {
  @observable
  public content: ITransferType = 'download';

  @observable
  public items: ITransferClientItem[] = [];

  @computed
  public get sections() {
    console.log("XD");

    const sections: ITransferSection[] = [];

    this.items.forEach(item => {
      const { type, context } = item;

      if (type === this.content) {
        const { _id, title } = context.config as ISite;
        const section = sections.find(r => r._id === _id);

        if (section) {
          section.items.push(item);
        } else {
          sections.push({
            _id,
            title,
            items: [item]
          });
        }
      }
    });

    return sections;
  }

  @action
  public onNew = (e: ITransferClientItem) => {
    this.items.push(e);
  }

  @action
  public onProgress = (e: ITransferClientItem) => {
    const item = this.items.find(r => r.id === e.id);

    console.log(item.remotePath, item.id);

    item.status = 'transfering';
    item.buffered = e.buffered;
    item.size = e.size;
    item.eta = e.eta;
    item.speed = e.speed;
  }

  @action
  public onFinish = (e: ITransferClientItem) => {
    const item = this.items.find(r => r.id === e.id);

    item.status = 'finished';
  }
}
