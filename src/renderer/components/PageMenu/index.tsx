import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { ContextMenu, ContextMenuItem } from '../ContextMenu';

const onRefresh = () => {
  store.pages.current.fetchFiles();
};

const onNewFolder = () => {
  store.pages.current.createBlank('folder');
};

const onNewFile = () => {
  store.pages.current.createBlank('file');
};

export default observer(() => {
  return (
    <ContextMenu content="page">
      <ContextMenuItem onClick={onRefresh}>Refresh</ContextMenuItem>
      <ContextMenuItem onClick={onNewFolder}>New folder</ContextMenuItem>
      <ContextMenuItem onClick={onNewFile}>New file</ContextMenuItem>
      <ContextMenuItem disabled>Details</ContextMenuItem>
    </ContextMenu>
  );
});
