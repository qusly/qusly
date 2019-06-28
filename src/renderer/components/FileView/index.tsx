import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import File from '../File';
import { StyledFilesView } from './styles';

export default observer(() => {
  const page = store.pages.current;

  return (
    <StyledFilesView visible={!page.loading}>
      {page.files.map((file, index) => (
        <File data={file} key={index} />
      ))}
    </StyledFilesView>
  );
});
