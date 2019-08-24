import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { ContextMenuContent } from '~/renderer/app/store/context-menu';
import { FileMenu } from './File';
import { StyledContextMenu } from './style';

export const MenuContainer = observer(({ content, children }: { content: ContextMenuContent, children: any }) => {
  const selected = store.contextMenu.content === content;
  return selected && children;
});

export const ContextMenu = observer(() => {
  const { top, left } = store.contextMenu.pos;

  return (
    <StyledContextMenu ref={store.contextMenu.ref} visible={store.contextMenu.visible} style={{ top, left }}>
      <FileMenu />
    </StyledContextMenu>
  );
});
