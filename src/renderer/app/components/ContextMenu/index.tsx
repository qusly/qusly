import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ContextMenuItem } from '~/renderer/components/ContextMenuItem';
import store from '~/renderer/app/store';
import { StyledContextMenu } from './style';
import { icons } from '~/renderer/constants';

export const ContextMenu = observer(() => {
  const { visible, pos } = store.contextMenu;

  const style = {
    top: pos.top,
    left: pos.left
  }

  return (
    <StyledContextMenu ref={store.contextMenu.menuRef} visible={visible} style={style}>
      <ContextMenuItem icon={icons.add}>Third item</ContextMenuItem>
      <ContextMenuItem icon={icons.folder}>First item</ContextMenuItem>
      <ContextMenuItem icon={icons.file}>Second item</ContextMenuItem>
    </StyledContextMenu>
  );
});
