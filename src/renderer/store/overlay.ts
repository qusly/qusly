import { observable } from "mobx";

type ContentType = 'site-manager';

export class OverlayStore {
  @observable
  public visible = false;

  @observable
  public currentContent: ContentType = 'site-manager';

  public show(content: ContentType) {
    this.currentContent = content;
    this.visible = true;
  }
}
