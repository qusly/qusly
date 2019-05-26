import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import FileItem from '../FileItem';
import { StyledFilesView, FilesContainer } from './styles';

export default observer(() => {
  return (
    <StyledFilesView visible={store.session.status === 'ok'}>
      <FilesContainer>
        {store.session.files.map((file, index) => (
          <FileItem data={file} key={index} />
        ))}
      </FilesContainer>
    </StyledFilesView>
  );
});
