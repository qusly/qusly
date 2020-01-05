import { observable, computed, action } from 'mobx';
import { ITransferType, ITransferItem } from 'qusly-core';

import { ITransferSection, ISite } from '~/interfaces';

export class TransferStore {
  @observable
  public content: ITransferType = 'download';

  @observable
  public items: ITransferItem[] = [];

  @computed
  public get sections() {
    const sections: ITransferSection[] = [];

    this.items.forEach(item => {
      const { _id, title } = item.data as ISite;

      if (item.type === this.content) {
        const section = sections.find(r => r._id === _id);

        if (section) {
          section.items.push(item);
        } else {
          sections.push({
            _id,
            title,
            items: [item],
            transfered: 0,
          });
        }
      }
    });

    return sections;
  }

  @action
  public onNew = (e: ITransferItem) => {
    this.items.push(e);
  }

  @action
  public onProgress = (e: ITransferItem) => {
    const item = this.items.find(r => r.id === e.id);

    if (item.status !== 'transfering') {
      item.status = 'transfering';
    }

    item.info = e.info;
  }

  @action
  public onFinish = (e: ITransferItem) => {
    const section = this.sections.find(r => r._id === e.data._id);
    const item = this.items.find(r => r.id === e.id);

    item.status = 'finished';
    section.transfered++;
  }

  @action
  public remove = (id: string) => {
    this.items = this.items.filter(r => r.id !== id);
  }
}
