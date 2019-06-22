import { observable } from 'mobx';

export type OverlayContent = 'add-site';

export class OverlayStore {
  @observable
  public content: OverlayContent;

  public show(content: OverlayContent) {
    this.content = content;
  }

  public hide() {
    this.content = null;
  }

  public get visible() {
    return this.content != null;
  }
}
