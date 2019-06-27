import * as React from 'react';
import { observer } from 'mobx-react';

import { ContextMenu, ContextMenuItem } from '../ContextMenu';
import store from '~/renderer/store';

export default observer(() => {
  return (
    <ContextMenu visible={store.fileMenu.visible} pos={store.fileMenu.pos}>
      <ContextMenuItem>Item 1</ContextMenuItem>
    </ContextMenu>
  );
});
