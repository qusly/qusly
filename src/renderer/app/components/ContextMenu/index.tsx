import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { IContextMenuContent } from '~/renderer/app/store/context-menu';
import { FileMenu } from './File';
import {
  StyledContextMenu,
  StyledItem,
  Accelerator,
  Text,
  Icon,
  Container,
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
  iconSize,
  onClick,
  children,
  disabled,
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
      <Icon icon={icon} iconSize={iconSize} disabled={disabled}></Icon>
      <Text>{children}</Text>
      <Accelerator>{accelerator}</Accelerator>
    </StyledItem>
  );
};

export const MenuContainer = observer(
  ({ content, children }: { content: IContextMenuContent; children: any }) => {
    const selected = store.contextMenu.content === content;
    return selected && children;
  },
);

export const ContextMenu = observer(() => {
  const [left, top] = store.contextMenu.pos;

  return (
    <StyledContextMenu
      ref={store.contextMenu.ref}
      visible={store.contextMenu.visible}
      style={{ top, left }}
    >
      <Container>
        <FileMenu />
      </Container>
    </StyledContextMenu>
  );
});
