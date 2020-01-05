import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';
import { MenuContainer, MenuItem } from '..';
import { MenuDivider } from '../style';

const onOpen = () => {
  const { path } = store.contextMenu.focusedExplorerItem;

  store.pages.current.path.push(path);
};

const onOpenInNewTab = () => {
  const page = store.pages.current;
  const { path } = store.contextMenu.focusedExplorerItem;

  store.tabs.addTab({
    active: true,
    site: page.session.site,
    path,
  });
};

export const ExplorerMenu = observer(() => {
  return (
    <MenuContainer content="explorer">
      <MenuItem icon={icons.folderOutline} onClick={onOpen}>
        Open
      </MenuItem>
      <MenuItem icon={icons.openInNew} onClick={onOpenInNewTab}>
        Open in new tab
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={icons.downloadOutline} disabled>
        Download
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={icons.details} iconSize={18} disabled>
        Details
      </MenuItem>
    </MenuContainer>
  );
});
