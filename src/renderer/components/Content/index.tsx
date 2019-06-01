import * as React from 'react';
import { observer } from 'mobx-react';

import FilesView from '../FilesView';
import store from '~/renderer/store';
import { StyledContent, PreloaderContainer } from './styles';
import { Preloader } from '../Preloader';

export default observer(() => {
  return (
    <StyledContent>
      <FilesView />
      <PreloaderContainer visible={store.pages.current.loading}>
        <Preloader />
      </PreloaderContainer>
    </StyledContent>
  );
});
