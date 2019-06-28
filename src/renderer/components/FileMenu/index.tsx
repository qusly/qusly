import * as React from 'react';
import { observer } from 'mobx-react';

import { ContextMenu, ContextMenuItem } from '../ContextMenu';
import store from '~/renderer/store';

const onOpen = () => {
  const page = store.pages.current;
  page.location.push(page.focusedFile);
};

const openInNewTab = () => {
  const page = store.pages.current;

  for (const file of page.selectedFiles) {
    store.tabs.addTab(page.session.site, {
      path: `${page.location.path}/${file}`,
      active: true,
    });
  }
};

export default observer(() => {
  const page = store.pages.current;
  if (page == null) return null;

  const containsFile = page.selectedFiles.find(
    e => page.files.find(x => x.name === e).type !== 'directory',
  );
  const mutliple = page.selectedFiles.length > 1;

  return (
    <ContextMenu
      ref={store.fileMenu.ref}
      visible={store.fileMenu.visible}
      pos={store.fileMenu.pos}
    >
      <ContextMenuItem disabled>Download</ContextMenuItem>
      {!containsFile && (
        <>
          {!mutliple && (
            <ContextMenuItem onClick={onOpen}>Open</ContextMenuItem>
          )}
          <ContextMenuItem onClick={openInNewTab}>
            Open in new tab
          </ContextMenuItem>
        </>
      )}
      {!mutliple && (
        <>
          {containsFile && (
            <>
              <ContextMenuItem disabled>Edit</ContextMenuItem>
              <ContextMenuItem disabled>Archive</ContextMenuItem>
            </>
          )}
          <ContextMenuItem disabled>Add to bookmarks</ContextMenuItem>
        </>
      )}
      <ContextMenuItem>Cut</ContextMenuItem>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Delete</ContextMenuItem>
      {!mutliple && <ContextMenuItem>Rename</ContextMenuItem>}
      <ContextMenuItem disabled>Properties</ContextMenuItem>
    </ContextMenu>
  );
});
