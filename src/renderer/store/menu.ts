import { observable } from 'mobx';

import { MENU_PAGE } from '../constants';

export class MenuStore {
  @observable
  public selected: MENU_PAGE = 'sites';
}
