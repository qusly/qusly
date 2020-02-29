import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { MenuContainer, MenuItem } from '..';
import { MenuDivider } from '../style';
import { icons } from '~/renderer/constants/icons';

const onRefresh = () => {
  store.pages.current.files.fetch();
};

const onNewFolder = () => {
  // store.pages.current.createBlank('folder');
};

const onNewFile = () => {
  // store.pages.current.createBlank('file');
};

export const PageMenu = observer(() => {
  const page = store.pages.current;

  return (
    <MenuContainer content="page">
      <MenuItem icon={icons.refresh} onClick={onRefresh} accelerator="Ctrl+R">
        Refresh
      </MenuItem>
      <MenuDivider />
      <MenuItem
        icon={icons.folderAdd}
        onClick={onNewFolder}
        accelerator="Ctrl+Shift+N"
      >
        New folder
      </MenuItem>
      <MenuItem icon={icons.fileAdd} onClick={onNewFile}>
        New file
      </MenuItem>
      {!!page?.files.cutData.files.length && (
        <>
          <MenuDivider />
          <MenuItem
            icon={icons.paste}
            iconSize={18}
            onClick={page?.files.onPaste}
          >
            Paste
          </MenuItem>
        </>
      )}
    </MenuContainer>
  );
});
