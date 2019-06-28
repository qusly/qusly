import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { ContextMenu, ContextMenuItem } from '../ContextMenu';

const onRefresh = () => {
  store.pages.current.fetchFiles();
};

const onNewFolder = () => {
  const page = store.pages.current;

  console.log(page.getUniqueName('new folder'));
};

export default observer(() => {
  return (
    <ContextMenu content="page">
      <ContextMenuItem onClick={onRefresh}>Refresh</ContextMenuItem>
      <ContextMenuItem onClick={onNewFolder}>New folder</ContextMenuItem>
      <ContextMenuItem>New file</ContextMenuItem>
      <ContextMenuItem disabled>Details</ContextMenuItem>
    </ContextMenu>
  );
});
