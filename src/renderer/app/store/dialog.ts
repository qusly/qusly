import { observable, action } from 'mobx';

export type DialogContent = 'add-site' | 'edit-site';

export class DialogStore {
  @observable
  public visible = false;

  @observable
  public content: DialogContent = null;

  @action
  public show = (content: DialogContent) => {
    this.content = content;
  }

  @action
  public hide() {
    this.content = null;
  }
}
