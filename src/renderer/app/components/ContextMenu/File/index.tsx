import * as React from 'react';

import { ContextMenuItem } from '~/renderer/components/ContextMenuItem';
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
            <ContextMenuItem onClick={onOpen}>Open</ContextMenuItem>
          )}
          <ContextMenuItem>
            Open in new tab
          </ContextMenuItem>
        </>
      )}
      {!mutliple && (
        <>
          {containsFile && (
            <>
              <ContextMenuItem>Edit</ContextMenuItem>
              <ContextMenuItem>Archive</ContextMenuItem>
            </>
          )}
          <ContextMenuItem>Add to bookmarks</ContextMenuItem>
        </>
      )}
      <ContextMenuItem>Cut</ContextMenuItem>
      {!containsFile && (
        <ContextMenuItem>
          Paste
        </ContextMenuItem>
      )}
      <ContextMenuItem>Delete</ContextMenuItem>
      {!mutliple && (
        <ContextMenuItem>Rename</ContextMenuItem>
      )}
      <ContextMenuItem>Download</ContextMenuItem>
      <ContextMenuItem>Details</ContextMenuItem>
    </MenuContainer>
  );
}
