import * as React from 'react';
import { observer } from 'mobx-react';
import { Preloader } from 'wexond-ui';

import store from '~/renderer/store';
import FileView from '../FileView';
import { StyledPage, PreloaderContainer, SelectionRegion } from './styles';

const onContextMenu = (e: React.MouseEvent) => {
  store.pages.current.unselectFiles();
  store.contextMenu.show('page', e);
};

const onMouseDown = (e: React.MouseEvent) => {
  store.selection.show(e);
};

const onClick = (e: React.MouseEvent) => {
  if (e.shiftKey || e.ctrlKey) return;
  store.pages.current.unselectFiles();
};

export default observer(() => {
  const session = store.sessions.current;
  const page = store.pages.current;

  return (
    <StyledPage
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      {session && session.connected && <FileView />}
      <PreloaderContainer visible={page && page.loading}>
        <Preloader />
      </PreloaderContainer>
      <SelectionRegion
        ref={store.selection.ref}
        visible={store.selection.visible}
      />
    </StyledPage>
  );
});
