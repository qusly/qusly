import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { StyledContextMenu, StyledContextMenuItem } from './style';

interface ItemProps {
  onClick?: (e: React.MouseEvent) => void;
  children: any;
}

export const ContextMenuItem = ({ onClick, children }: ItemProps) => {
  const onItemClick = (e: React.MouseEvent) => {
    store.contextMenu.visible = false;
    if (onClick) onClick(e);
  }

  return (
    <StyledContextMenuItem
      onMouseDown={e => e.stopPropagation()}
      onClick={onItemClick}>
      {children}
    </StyledContextMenuItem>
  );
}

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
