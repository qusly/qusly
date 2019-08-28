import * as React from 'react';

import store from '~/renderer/app/store';
import { MenuContainer, MenuItem } from '..';
import { icons } from '~/renderer/constants';
import { MenuDivider } from '../style';

const onOpen = () => {
  const page = store.pages.current;
  page.path.pushRelative(page.focusedFile.name);
}

const openInNewTab = () => {
  const page = store.pages.current;
  const { site } = page.session;

  for (const file of page.selectedFiles) {
    store.tabs.addTab({
      active: true,
      path: page.path.relative(file.name),
      site,
    });
  }
}

const onRename = () => {
  const page = store.pages.current;
  page.focusedFile.renamed = true;
}

const onDelete = () => {
  const page = store.pages.current;
  page.delete(page.selectedFiles);
}

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
            <MenuItem icon={icons.folderOutline} onClick={onOpen}>Open</MenuItem>
          )}
          <MenuItem icon={icons.openInNew} iconSize={18} onClick={openInNewTab}>
            Open in new tab
          </MenuItem>
        </>
      )}
      {!mutliple && (
        <>
          {containsFile && <MenuItem icon={icons.apps} iconSize={18} disabled>Open with</MenuItem>}
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
        <MenuItem icon={icons.edit} onClick={onRename}>Rename</MenuItem>
      )}
      <MenuItem icon={icons.delete} iconSize={20} onClick={onDelete}>Delete</MenuItem>
      <MenuDivider />
      {containsFile && <>
        <MenuItem icon={icons.download} disabled>Download</MenuItem>
        <MenuItem icon={icons.zip} iconSize={18} disabled>Archive</MenuItem>
        <MenuDivider />
      </>}
      <MenuItem icon={icons.details} iconSize={18} disabled>Details</MenuItem>
    </MenuContainer>
  );
}
