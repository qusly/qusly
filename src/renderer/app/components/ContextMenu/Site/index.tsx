import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';
import { MenuContainer, MenuItem } from '..';
import { MenuDivider } from '../style';

const onConnect = () => {
  const site = store.contextMenu.focusedSite;

  store.sites.openInTab(site);
}

export const SiteMenu = () => {
  return (
    <MenuContainer content='site'>
      <MenuItem icon={icons.connect} iconSize={18} onClick={onConnect}>
        Connect
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={icons.edit}>
        Edit
      </MenuItem>
      <MenuItem icon={icons.delete} iconSize={20}>
        Delete
      </MenuItem>
    </MenuContainer>
  );
};
