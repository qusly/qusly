import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ContextMenuContent } from '~/renderer/app/store/context-menu';
import { FileMenu } from './File';
import { PageMenu } from './Page';
import { TabMenu } from './Tab';
import { StyledContextMenu, StyledItem } from './style';

interface ItemProps {
  onClick?: (e: React.MouseEvent) => void;
  icon?: string;
  disabled?: boolean;
  iconSize?: number;
  hidden?: boolean;
  children: any;
}

export const MenuItem = ({ icon, onClick, children, disabled, iconSize, hidden }: ItemProps) => {
  const onItemClick = (e: React.MouseEvent) => {
    store.contextMenu.visible = false;
    if (onClick) onClick(e);
  }

  return (
    <StyledItem
      onMouseDown={e => e.stopPropagation()}
      onClick={onItemClick}
      icon={icon}
      disabled={disabled}
      iconSize={iconSize}
      hidden={hidden}>
      {children}
    </StyledItem>
  );
};


export const MenuContainer = observer(({ content, children }: { content: ContextMenuContent, children: any }) => {
  const selected = store.contextMenu.content === content;
  return selected && children;
});

export const ContextMenu = observer(() => {
  const { top, left } = store.contextMenu.pos;

  return (
    <StyledContextMenu ref={store.contextMenu.ref} visible={store.contextMenu.visible} style={{ top, left }}>
      <FileMenu />
      <PageMenu />
      <TabMenu />
    </StyledContextMenu>
  );
});
