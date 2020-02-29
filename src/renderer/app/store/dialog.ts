import { observable, action } from 'mobx';

export type IDialogContent = 'rename-file';

export class DialogStore {
  @observable
  public visible = false;

  @observable
  public content: IDialogContent;

  @action
  public show(content: IDialogContent) {
    this.content = content;
    this.visible = true;
  }

  @action
  public hide() {
    this.visible = false;
  }
}
