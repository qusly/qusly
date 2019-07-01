import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { ContextMenuContent } from '~/renderer/store/context-menu';
import { StyledContextMenu, StyledContextMenuItem } from './styles';

export const ContextMenu = observer(
  ({ content, children }: { content: ContextMenuContent; children?: any }) => {
    return (
      <StyledContextMenu
        ref={store.contextMenu.refs[content]}
        visible={store.contextMenu.content === content}
        pos={store.contextMenu.pos}
      >
        {children}
      </StyledContextMenu>
    );
  },
);

const onItemMouseDown = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const onItemClick = (onClick: Function) => (e: React.MouseEvent) => {
  store.contextMenu.hide();
  if (onClick) onClick(e);
};

export const ContextMenuItem = ({
  onClick,
  disabled,
  children,
}: {
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  children?: any;
}) => {
  return (
    <StyledContextMenuItem
      onClick={onItemClick(onClick)}
      onMouseDown={onItemMouseDown}
      disabled={disabled}
    >
      {children}
    </StyledContextMenuItem>
  );
};
