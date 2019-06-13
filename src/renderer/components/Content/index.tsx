import * as React from 'react';
import { observer } from 'mobx-react';
import { Preloader } from 'wexond-ui';

import store from '~/renderer/store';
import FileView from '../FileView';
import { StyledContent, PreloaderContainer } from './styles';

export default observer(() => {
  return (
    <StyledContent>
      {store.sessions.current.connected && <FileView />}
      <PreloaderContainer visible={store.pages.current.loading}>
        <Preloader />
      </PreloaderContainer>
    </StyledContent>
  );
});
