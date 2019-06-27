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
      <ContextMenuItem>Item 1</ContextMenuItem>
      <ContextMenuItem>Item 2</ContextMenuItem>
      <ContextMenuItem>Item 3</ContextMenuItem>
      <ContextMenuItem>Item 4</ContextMenuItem>
      <ContextMenuItem>Item 5</ContextMenuItem>
      <ContextMenuItem>Item 6</ContextMenuItem>
      <ContextMenuItem>Item 7</ContextMenuItem>
      <ContextMenuItem>Item 8</ContextMenuItem>
      <ContextMenuItem>Item 9</ContextMenuItem>
    </ContextMenu>
  );
});
