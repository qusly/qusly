import * as React from 'react';

import { Item } from '../Item';
import store from '~/renderer/app/store';
import { MenuContainer } from '..';

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
            <Item onClick={onOpen}>Open</Item>
          )}
          <Item>
            Open in new tab
          </Item>
        </>
      )}
      {!mutliple && (
        <>
          {containsFile && (
            <>
              <Item>Edit</Item>
              <Item>Archive</Item>
            </>
          )}
          <Item>Add to bookmarks</Item>
        </>
      )}
      <Item>Cut</Item>
      {!containsFile && (
        <Item>
          Paste
        </Item>
      )}
      <Item>Delete</Item>
      {!mutliple && (
        <Item>Rename</Item>
      )}
      <Item>Download</Item>
      <Item>Details</Item>
    </MenuContainer>
  );
}
