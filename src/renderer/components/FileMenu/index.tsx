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

  store.tabs.addTab(page.session.site, {
    path: `${page.location.path}/${page.focusedFile}`,
    active: true,
  });
};

export default observer(() => {
  const page = store.pages.current;
  const file = page && page.files.find(e => e.name === page.focusedFile);

  const isDirectory = file && file.type === 'directory';

  return (
    <ContextMenu
      ref={store.fileMenu.ref}
      visible={store.fileMenu.visible}
      pos={store.fileMenu.pos}
    >
      <ContextMenuItem disabled>Download</ContextMenuItem>
      {isDirectory && (
        <React.Fragment>
          <ContextMenuItem onClick={onOpen}>Open</ContextMenuItem>
          <ContextMenuItem onClick={openInNewTab}>
            Open in new tab
          </ContextMenuItem>
        </React.Fragment>
      )}
      {!isDirectory && (
        <React.Fragment>
          <ContextMenuItem disabled>Edit</ContextMenuItem>
          <ContextMenuItem disabled>Archive</ContextMenuItem>
        </React.Fragment>
      )}
      <ContextMenuItem disabled>Add to bookmarks</ContextMenuItem>
      <ContextMenuItem>Cut</ContextMenuItem>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Delete</ContextMenuItem>
      <ContextMenuItem>Rename</ContextMenuItem>
      <ContextMenuItem disabled>Properties</ContextMenuItem>
    </ContextMenu>
  );
});
