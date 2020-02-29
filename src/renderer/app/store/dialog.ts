import { observable, action } from 'mobx';

import { IDialogData } from '~/renderer/interfaces';

export class DialogStore {
  @observable
  public visible = false;

  @observable
  public data: IDialogData;

  @action
  public show(data: IDialogData) {
    this.data = data;
    this.visible = true;
  }

  @action
  public hide() {
    this.visible = false;
  }
}
