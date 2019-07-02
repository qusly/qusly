import * as React from 'react';
import { observer } from 'mobx-react';

import { ContextMenu, ContextMenuItem } from '../ContextMenu';
import store from '~/renderer/store';

const onDuplicateClick = () => {
  const { tab } = store.contextMenu;
  store.tabs.addTab(store.sessions.list.find(x => x.id === tab.id).site);
};

const onReloadClick = () => {
  const { tab } = store.contextMenu;
  store.pages.list.find(x => x.id === tab.id).fetchFiles();
};

const onCloseClick = () => {
  const { tab } = store.contextMenu;
  tab.close();
};

const onCloseOtherTabsClick = () => {
  const { tab } = store.contextMenu;
  for (const t of store.tabs.list) {
    if (t !== tab) {
      t.close();
    }
  }
};

const onCloseTabsFromLeftClick = () => {
  const { tab } = store.contextMenu;
  for (let i = store.tabs.list.indexOf(tab) - 1; i >= 0; i--) {
    store.tabs.list[i].close();
  }
};

const onCloseTabsFromRightClick = () => {
  const { tab } = store.contextMenu;
  for (
    let i = store.tabs.list.length - 1;
    i > store.tabs.list.indexOf(tab);
    i--
  ) {
    store.tabs.list[i].close();
  }
};

export default observer(() => {
  return (
    <ContextMenu content="tab">
      <ContextMenuItem onClick={onDuplicateClick}>Duplicate</ContextMenuItem>
      <ContextMenuItem onClick={onReloadClick}>Reload</ContextMenuItem>
      <ContextMenuItem onClick={onCloseClick}>Close tab</ContextMenuItem>
      <ContextMenuItem onClick={onCloseOtherTabsClick}>
        Close other tabs
      </ContextMenuItem>
      <ContextMenuItem onClick={onCloseTabsFromLeftClick}>
        Close tabs from left
      </ContextMenuItem>
      <ContextMenuItem onClick={onCloseTabsFromRightClick}>
        Close tabs from right
      </ContextMenuItem>
    </ContextMenu>
  );
});
