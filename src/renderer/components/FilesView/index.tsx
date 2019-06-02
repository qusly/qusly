import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import FileItem from '../FileItem';
import { StyledFilesView, FilesContainer } from './styles';

export default observer(() => {
  return (
    <StyledFilesView visible={!store.pages.current.loading}>
      <FilesContainer>
        {store.pages.current.files.map((file, index) => (
          <FileItem data={file} key={index} />
        ))}
      </FilesContainer>
    </StyledFilesView>
  );
});
