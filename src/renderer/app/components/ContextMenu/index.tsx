import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { StyledContextMenu, ContextMenuItem } from './style';

export const ContextMenu = observer(() => {
  const { visible, pos } = store.contextMenu;

  const style = {
    top: pos.top,
    left: pos.left
  }

  return (
    <StyledContextMenu ref={store.contextMenu.menuRef} visible={visible} style={style}>
      <ContextMenuItem>First item</ContextMenuItem>
      <ContextMenuItem>Second item</ContextMenuItem>
      <ContextMenuItem>Third item</ContextMenuItem>
    </StyledContextMenu>
  );
});
