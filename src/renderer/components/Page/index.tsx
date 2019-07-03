import * as React from 'react';
import { observer } from 'mobx-react';
import { Preloader } from 'wexond-ui';

import store from '~/renderer/store';
import FileView from '../FileView';
import { StyledPage, PreloaderContainer } from './styles';

const onContextMenu = () => {
  store.contextMenu.show('page');
};

const onMouseDown = (e: React.MouseEvent) => {
  if (!e.ctrlKey && !e.shiftKey) {
    store.pages.current.unselectFiles();
  }

  store.selection.show(e);
};

export default observer(() => {
  const session = store.sessions.current;
  const page = store.pages.current;

  return (
    <StyledPage onContextMenu={onContextMenu} onMouseDown={onMouseDown}>
      {session && session.connected && <FileView />}
      <PreloaderContainer visible={page && page.loading}>
        <Preloader />
      </PreloaderContainer>
    </StyledPage>
  );
});
