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

const onPaste = () => {
  store.pages.current.pasteFiles(true);
};

export default observer(() => {
  return (
    <ContextMenu content="page">
      <ContextMenuItem onClick={onRefresh}>Refresh</ContextMenuItem>
      <ContextMenuItem>Upload</ContextMenuItem>
      <ContextMenuItem onClick={onNewFolder}>New folder</ContextMenuItem>
      <ContextMenuItem onClick={onNewFile}>New file</ContextMenuItem>
      <ContextMenuItem onClick={onPaste}>Paste</ContextMenuItem>
    </ContextMenu>
  );
});
