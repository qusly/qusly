import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ContextMenuContent } from '~/renderer/app/store/context-menu';
import { FileMenu } from './File';
import { PageMenu } from './Page';
import { TabMenu } from './Tab';
import { PathMenu } from './Path';
import { ExplorerMenu } from './Explorer';
import { SiteMenu } from './Site';
import {
  StyledContextMenu,
  StyledItem,
  Accelerator,
  Text,
  Icon,
  Items,
} from './style';

interface ItemProps {
  onClick?: (e: React.MouseEvent) => void;
  icon?: string;
  disabled?: boolean;
  iconSize?: number;
  hidden?: boolean;
  children: any;
  accelerator?: string;
}

export const MenuItem = ({
  icon,
  onClick,
  children,
  disabled,
  iconSize,
  hidden,
  accelerator,
}: ItemProps) => {
  const onItemClick = (e: React.MouseEvent) => {
    store.contextMenu.visible = false;
    if (onClick) onClick(e);
  };

  return (
    <StyledItem
      onMouseDown={e => e.stopPropagation()}
      onClick={onItemClick}
      disabled={disabled}
      hidden={hidden}
    >
      <td style={{ paddingLeft: 10 }}></td>
      <Icon disabled={disabled} iconSize={iconSize} icon={icon}></Icon>
      <Text>{children}</Text>
      <Accelerator>{accelerator}</Accelerator>
    </StyledItem>
  );
};

export const MenuContainer = observer(
  ({ content, children }: { content: ContextMenuContent; children: any }) => {
    const selected = store.contextMenu.content === content;
    return selected && children;
  },
);

export const ContextMenu = observer(() => {
  const { top, left } = store.contextMenu.pos;

  return (
    <StyledContextMenu
      ref={store.contextMenu.ref}
      visible={store.contextMenu.visible}
      style={{ top, left }}
    >
      <Items>
        <FileMenu />
        <PageMenu />
        <TabMenu />
        <PathMenu />
        <ExplorerMenu />
        <SiteMenu />
      </Items>
    </StyledContextMenu>
  );
});
