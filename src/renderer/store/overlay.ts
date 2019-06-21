import { observable, action } from 'mobx';

export type OverlayContent = 'add-site';

export class OverlayStore {
  @observable
  public content: OverlayContent;

  @observable
  public visible = false;

  @action
  public show(content: OverlayContent) {
    this.content = content;
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }
}
