import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { Preloader } from '~/renderer/components/Preloader';
import { StyledPage, PreloaderContainer } from './style';

export const Page = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  return (
    <StyledPage>
      <PreloaderContainer visible={page.loading}>
        <Preloader />
      </PreloaderContainer>
    </StyledPage>
  );
});
