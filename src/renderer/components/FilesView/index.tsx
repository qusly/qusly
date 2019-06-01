import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import FileItem from '../FileItem';
import { StyledFilesView, FilesContainer } from './styles';

export default observer(() => {
  const page = store.pages.current;

  return (
    <StyledFilesView visible={!page.loading}>
      <FilesContainer>
        {page.files.map((file, index) => (
          <FileItem data={file} key={index} />
        ))}
      </FilesContainer>
    </StyledFilesView>
  );
});
