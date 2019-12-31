import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { icons } from '~/renderer/constants';
import { MenuContainer, MenuItem } from '..';
import { MenuDivider } from '../style';

const onRefresh = () => {
  store.pages.current.fetchFiles();
};

const onNewFolder = () => {
  store.pages.current.createBlank('folder');
};

const onNewFile = () => {
  store.pages.current.createBlank('file');
};

const onPaste = () => {
  store.pages.current.paste(true);
};

export const PageMenu = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  return (
    <MenuContainer content="page">
      <MenuItem icon={icons.refresh} onClick={onRefresh} accelerator={'Ctrl+R'}>
        Refresh
      </MenuItem>
      <MenuDivider />
      <MenuItem
        icon={icons.folderAdd}
        onClick={onNewFolder}
        accelerator={'Ctrl+Shift+N'}
      >
        New folder
      </MenuItem>
      <MenuItem icon={icons.fileAdd} onClick={onNewFile}>
        New file
      </MenuItem>
      {!!page.cutFiles.length && (
        <>
          <MenuDivider />
          <MenuItem icon={icons.paste} iconSize={18} onClick={onPaste}>
            Paste
          </MenuItem>
        </>
      )}
    </MenuContainer>
  );
});
