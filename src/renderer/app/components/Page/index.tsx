import React from 'react';
import { observer } from 'mobx-react-lite';
import { Selectable } from 'rectangle-selection';
import { IFile } from 'qusly-core';

import store from '../../store';
import { File } from '../File';
import { StyledPage } from './style';

export const Page = observer(() => {
  const page = store.pages.current;

  const onSelection = React.useCallback((files: IFile[]) => {
    store.pages.current.selectedFiles = files;
  }, []);

  const onMouseDown = React.useCallback(() => {
    store.pages.current.selectedFiles = [];
  }, []);

  return (
    <StyledPage onSelection={onSelection} onMouseDown={onMouseDown}>
      {page?.files.map(r => (
        <Selectable key={r.name} data={r}>
          {innerRef => <File ref={innerRef} data={r} />}
        </Selectable>
      ))}
    </StyledPage>
  );
});
