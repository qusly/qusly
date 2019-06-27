import * as React from 'react';
import { observer } from 'mobx-react';

import { ContextMenu, ContextMenuItem } from '../ContextMenu';
import store from '~/renderer/store';

export default observer(() => {
  return (
    <ContextMenu
      ref={store.fileMenu.ref}
      visible={store.fileMenu.visible}
      pos={store.fileMenu.pos}
    >
      <ContextMenuItem disabled>Download</ContextMenuItem>
      <ContextMenuItem>Open</ContextMenuItem>
      <ContextMenuItem>Open in new tab</ContextMenuItem>
      <ContextMenuItem disabled>Edit</ContextMenuItem>
      <ContextMenuItem disabled>Add to bookmarks</ContextMenuItem>
      <ContextMenuItem disabled>Archive</ContextMenuItem>
      <ContextMenuItem>Cut</ContextMenuItem>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Delete</ContextMenuItem>
      <ContextMenuItem>Rename</ContextMenuItem>
      <ContextMenuItem disabled>Properties</ContextMenuItem>
    </ContextMenu>
  );
});
