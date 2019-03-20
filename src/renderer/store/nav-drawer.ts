import { observable } from 'mobx';

import { DEFAULT_NAV_DRAWER_WIDTH } from '../constants';

export class NavDrawerStore {
  @observable
  public selectedItem = 0;

  @observable
  public width = DEFAULT_NAV_DRAWER_WIDTH;
}
