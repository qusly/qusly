import { observable, computed, action } from 'mobx';
import { ITransferType, ITransferClientNew, ITransferClientProgress } from 'qusly-core';

import { ITransferSection, ISite, ITransferItem } from '~/interfaces';

export class TransferStore {
  @observable
  public content: ITransferType = 'download';

  @observable
  public downloadSections: ITransferSection[] = [];

  @observable
  public uploadSections: ITransferSection[] = [];

  public getSections(type?: ITransferType) {
    type = type || this.content;
    return type === 'download' ? this.downloadSections : this.uploadSections;
  }

  @action
  public handleNewTransfer = (e: ITransferClientNew) => {
    const sections = this.getSections(e.type);
    const { _id, title } = (e.context as any)._config as ISite; // TODO: Make public site in qusly-core

    const section = sections.find(r => r._id === _id);
    const item: ITransferItem = { ...e, status: 'waiting' };

    if (!section) {
      sections.push({
        _id,
        title,
        items: [item],
      });
    } else {
      section.items.push(item);
    }
  }

  @action
  public handleTransferProgress = (e: ITransferClientProgress) => {
    const sections = this.getSections(e.type);
    const { _id } = (e.context as any)._config as ISite; // TODO: Make public site in qusly-core
    const section = sections.find(r => r._id === _id);
    const index = section.items.findIndex(r => r.id === e.id);

    section.items[index] = { ...e, status: 'transfering' };
  }
}
