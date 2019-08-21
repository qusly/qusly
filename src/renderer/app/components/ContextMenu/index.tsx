import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ContextMenuContent } from '~/renderer/app/store/context-menu';
import { ContextMenuItem } from '~/renderer/components/ContextMenuItem';
import { StyledContextMenu } from './style';

const Container = observer(({ content, children }: { content: ContextMenuContent, children: any }) => {
  const selected = store.contextMenu.content === content;
  return selected && children;
});

const FileMenu = () => {
  return (
    <Container content='file'>
      <ContextMenuItem >First item</ContextMenuItem>
      <ContextMenuItem>Second item</ContextMenuItem>
      <ContextMenuItem >Third item</ContextMenuItem>
    </Container>
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
      <FileMenu />
    </StyledContextMenu>
  );
});
