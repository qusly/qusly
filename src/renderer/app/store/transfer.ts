import { observable, computed, action } from 'mobx';
import { ITransferType } from 'qusly-core';

import { ITransferSection } from '~/interfaces';

let sectionId = 0;

export class TransferStore {
  @observable
  public content: ITransferType = 'download';

  @observable
  public downloadSections: ITransferSection[] = [
    {
      _id: 'wantoq',
      title: "Nersent data center",
      items: [
        {
          id: "1",
          status: 'transfering',
          localPath: "C:\\Users\\xnerh\\Desktop\\image.png",
          remotePath: "/home/documents/image.png"
        },
        {
          id: "2",
          status: 'waiting',
          localPath: "C:\\Users\\xnerh\\Desktop\\backup.rar",
          remotePath: "/home/documents/backup.rar"
        }
      ]
    }
  ];

  @observable
  public uploadSections: ITransferSection[] = [];

  @computed
  public get sections() {
    return this.content === 'download' ? this.downloadSections : this.uploadSections;
  }

  public set sections(value: ITransferSection[]) {
    if (this.content === 'download') {
      this.downloadSections = value;
    } else {
      this.uploadSections = value;
    }
  }
}
