import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { Preloader } from '~/renderer/components/Preloader';
import { File } from '../File';
import { StyledPage, PreloaderContainer, FilesContainer } from './style';

export const Page = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  return (
    <StyledPage>
      <FilesContainer visible={!page.loading}>
        {page.files.map(file => (
          <File key={file.name} data={file} />
        ))}
      </FilesContainer>
      <PreloaderContainer visible={page.loading}>
        <Preloader />
      </PreloaderContainer>
    </StyledPage>
  );
});
