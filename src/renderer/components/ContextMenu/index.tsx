import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { ContextMenuContent } from '~/renderer/store/context-menu';
import { StyledContextMenu, StyledContextMenuItem } from './styles';

export const ContextMenu = observer(
  ({ content, children }: { content: ContextMenuContent; children?: any }) => {
    const visible = store.contextMenu.content === content;

    return (
      <StyledContextMenu
        ref={store.contextMenu.refs[content]}
        visible={visible}
      >
        {children}
      </StyledContextMenu>
    );
  },
);

const onItemMouseDown = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const onItemMouseUp = (onClick: Function) => (e: React.MouseEvent) => {
  if (onClick) onClick(e);
  store.contextMenu.hide();
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
      onMouseUp={onItemMouseUp(onClick)}
      onMouseDown={onItemMouseDown}
      disabled={disabled}
    >
      {children}
    </StyledContextMenuItem>
  );
};
