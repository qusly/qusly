import * as React from 'react';
import { observer } from 'mobx-react';

import FilesView from '../FilesView';
import store from '~/renderer/store';
import { Preloader } from '../Preloader';
import ConnectForm from '../ConnectForm';
import { StyledContent, PreloaderContainer } from './styles';

export default observer(() => {
  const connected = store.sessions.current.connected;

  return (
    <StyledContent>
      {connected && (
        <React.Fragment>
          <FilesView />
          <PreloaderContainer visible={store.pages.current.loading}>
            <Preloader />
          </PreloaderContainer>
        </React.Fragment>
      )}
      {!connected && <ConnectForm />}
    </StyledContent>
  );
});
