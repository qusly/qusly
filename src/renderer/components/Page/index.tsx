import * as React from 'react';
import { observer } from 'mobx-react';
import { Preloader } from 'wexond-ui';

import store from '~/renderer/store';
import FileView from '../FileView';
import { StyledPage, PreloaderContainer } from './styles';

export default observer(() => {
  const session = store.sessions.current;

  return (
    <StyledPage>
      {session && session.connected && <FileView />}
      <PreloaderContainer visible={session && store.pages.current.loading}>
        <Preloader />
      </PreloaderContainer>
    </StyledPage>
  );
});
