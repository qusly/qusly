import { observable } from 'mobx';

export enum InfoPanelPage {
  Downloaded,
  Uploaded,
  Details,
}

export class InfoPanelStore {
  @observable
  public width = 256;

  @observable
  public selectedPage = InfoPanelPage.Details;
}
