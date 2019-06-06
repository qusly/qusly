import * as React from 'react';
import { observer } from 'mobx-react';

import FilesView from '../FilesView';
import store from '~/renderer/store';
import { Preloader } from '../Preloader';
import Button from '../Button';
import { StyledContent, PreloaderContainer } from './styles';

const onConnectClick = () => {
  store.overlay.show('site-manager');
};

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
      {!connected && <Button onClick={onConnectClick}>CONNECT</Button>}
    </StyledContent>
  );
});
