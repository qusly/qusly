import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import File from '../File';
import { StyledFilesView } from './styles';

export default observer(() => {
  return (
    <StyledFilesView visible={!store.pages.current.loading}>
      {store.pages.current.files.map((file, index) => (
        <File data={file} key={index} />
      ))}
    </StyledFilesView>
  );
});
