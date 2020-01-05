import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { MenuContainer, MenuItem } from '..';
import { MenuDivider } from '../style';
import { icons } from '~/renderer/constants/icons';

const onCopyPath = () => {
  store.pages.current.path.copyToClipboard();
};

const onEdit = () => {
  store.pathView.show();
};

export const PathMenu = observer(() => {
  return (
    <MenuContainer content="path">
      <MenuItem icon={icons.copy} onClick={onCopyPath}>
        Copy path
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={icons.edit} onClick={onEdit}>
        Edit path
      </MenuItem>
    </MenuContainer>
  );
});
