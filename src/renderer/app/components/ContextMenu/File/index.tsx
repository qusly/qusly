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

const onCut = () => {
  const page = store.pages.current;
  page.cut(page.selectedFiles);
}

const onPaste = () => {
  store.pages.current.paste();
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

  const containsFile = !!page.selectedFiles.find(e => e.type !== 'directory');
  const multiple = page.selectedFiles.length > 1;

  return (
    <MenuContainer content='file'>
      <MenuItem onClick={onOpen} icon={icons.folderOutline} hidden={multiple || containsFile}>
        Open
      </MenuItem>
      <MenuItem onClick={openInNewTab} icon={icons.openInNew} iconSize={18} hidden={containsFile}>
        Open in new tab
      </MenuItem>
      <MenuItem icon={icons.apps} iconSize={18} hidden={multiple || !containsFile} disabled>Open with</MenuItem>
      <MenuDivider />
      <MenuItem icon={icons.cut} iconSize={16} onClick={onCut}>Cut</MenuItem>
      <MenuItem icon={icons.paste} iconSize={18} onClick={onPaste} hidden={!page.cutFiles.length || containsFile}>
        Paste
      </MenuItem>
      <MenuItem icon={icons.edit} onClick={onRename} hidden={multiple}>Rename</MenuItem>
      <MenuItem icon={icons.delete} iconSize={20} onClick={onDelete}>Delete</MenuItem>
      <MenuDivider />
      <MenuItem icon={icons.download} hidden={!containsFile} disabled>Download</MenuItem>
      <MenuItem icon={icons.zip} iconSize={18} hidden={!containsFile} disabled>Archive</MenuItem>
      {containsFile && <MenuDivider />}
      <MenuItem icon={icons.details} iconSize={18} disabled>Details</MenuItem>
    </MenuContainer>
  );
}
