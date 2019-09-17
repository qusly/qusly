import { observable, action } from 'mobx';

export type DialogContent = 'add-site';

export class DialogStore {
  @observable
  public visible = false;

  @observable
  public content: DialogContent = 'add-site';

  @action
  public show = (content: DialogContent) => {
    this.content = content;
  }
}
