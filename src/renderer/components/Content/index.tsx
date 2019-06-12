import * as React from 'react';
import { observer } from 'mobx-react';
import { Preloader } from 'wexond-ui';

import FileView from '../FileView';
import store from '~/renderer/store';
import { StyledContent, PreloaderContainer } from './styles';

export default observer(() => {
  const connected = store.sessions.current.connected;

  return (
    <StyledContent>
      {connected && (
        <React.Fragment>
          <FileView />
          <PreloaderContainer visible={store.pages.current.loading}>
            <Preloader />
          </PreloaderContainer>
        </React.Fragment>
      )}
    </StyledContent>
  );
});
