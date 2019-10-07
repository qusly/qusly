import { observable, computed, action } from 'mobx';
import { ITransferType, ITransferClientNew, ITransferClientProgress } from 'qusly-core';

import { ITransferSection, ISite, ITransferItem } from '~/interfaces';

export class TransferStore {
  @observable
  public content: ITransferType = 'download';

  @observable
  public items: ITransferItem[] = [];

  @computed
  public get sections() {
    const sections: ITransferSection[] = [];

    this.items.forEach(item => {
      if (item.type === this.content) {
        const { _id, title } = (item.context as any)._config as ISite;
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
  public handleNewTransfer = (e: ITransferClientNew) => {
    const item: ITransferItem = { ...e, status: 'waiting' };
    this.items.push(item);
  }

  @action
  public handleTransferProgress = (e: ITransferClientProgress) => {
    const index = this.items.findIndex(r => r.id === e.id);
    this.items[index] = { ...e, status: 'transfering' };
  }
}
