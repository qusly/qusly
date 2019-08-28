import * as React from 'react';

import store from '~/renderer/app/store';
import { MenuContainer, MenuItem } from '..';

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
            <MenuItem onClick={onOpen}>Open</MenuItem>
          )}
          <MenuItem>
            Open in new tab
          </MenuItem>
        </>
      )}
      {!mutliple && (
        <>
          {containsFile && (
            <>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Archive</MenuItem>
            </>
          )}
          <MenuItem>Add to bookmarks</MenuItem>
        </>
      )}
      <MenuItem>Cut</MenuItem>
      {!containsFile && (
        <MenuItem>
          Paste
        </MenuItem>
      )}
      <MenuItem>Delete</MenuItem>
      {!mutliple && (
        <MenuItem>Rename</MenuItem>
      )}
      <MenuItem>Download</MenuItem>
      <MenuItem>Details</MenuItem>
    </MenuContainer>
  );
}
