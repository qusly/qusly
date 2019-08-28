import * as React from 'react';

import store from '~/renderer/app/store';
import { MenuContainer, MenuItem } from '..';
import { icons } from '~/renderer/constants';
import { MenuDivider } from '../style';

const onOpen = () => {
  const page = store.pages.current;
  page.path.pushRelative(page.focusedFile.name);
};

// TODO: Open in new tab

export const FileMenu = () => {
  const page = store.pages.current;
  if (!page) return null;

  const containsFile = page.selectedFiles.find(e => e.type !== 'directory');
  const mutliple = page.selectedFiles.length > 1;

  return (
    <MenuContainer content='file'>
      {!containsFile && (
        <>
          {!mutliple && (
            <MenuItem onClick={onOpen} icon={icons.folderOutline}>Open</MenuItem>
          )}
          <MenuItem icon={icons.openInNew} iconSize={18}>
            Open in new tab
          </MenuItem>
        </>
      )}
      {!mutliple && (
        <>
          {containsFile && <MenuItem icon={icons.apps} iconSize={18}>Open with</MenuItem>}
        </>
      )}
      <MenuDivider />
      <MenuItem icon={icons.cut} iconSize={16}>Cut</MenuItem>
      {!containsFile && (
        <MenuItem icon={icons.paste} iconSize={18}>
          Paste
        </MenuItem>
      )}
      {!mutliple && (
        <MenuItem icon={icons.edit}>Rename</MenuItem>
      )}
      <MenuItem icon={icons.delete} iconSize={20}>Delete</MenuItem>
      <MenuDivider />
      {containsFile && <>
        <MenuItem icon={icons.download}>Download</MenuItem>
        <MenuItem icon={icons.zip} iconSize={18}>Archive</MenuItem>
        <MenuDivider />
      </>}
      <MenuItem icon={icons.details} iconSize={18}>Details</MenuItem>
    </MenuContainer>
  );
}
