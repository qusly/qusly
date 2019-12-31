import * as React from 'react';

import { getPassword } from '~/utils/credentials';
import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';
import { MenuContainer, MenuItem } from '..';
import { MenuDivider } from '../style';

const onConnect = () => {
  const site = store.contextMenu.focusedSite;

  store.sites.openInTab(site);
};

const onEdit = async () => {
  const site = store.contextMenu.focusedSite;

  site.password = await getPassword(site._id);
  store.dialog.show('edit-site');
};

const onDelete = () => {
  store.dialog.show('delete-site');
};

export const SiteMenu = () => {
  return (
    <MenuContainer content="site">
      <MenuItem icon={icons.connect} iconSize={18} onClick={onConnect}>
        Connect
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={icons.edit} onClick={onEdit}>
        Edit
      </MenuItem>
      <MenuItem icon={icons.delete} iconSize={20} onClick={onDelete}>
        Delete
      </MenuItem>
    </MenuContainer>
  );
};
