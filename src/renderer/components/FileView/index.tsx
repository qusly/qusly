import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import File from '../File';
import { StyledFilesView, SelectionRegion } from './styles';

const onMouseDown = (e: React.MouseEvent) => {
  store.startPos = {
    top: e.pageY,
    left: e.pageX,
  };

  store.selection.show();
};

export default observer(() => {
  const page = store.pages.current;

  return (
    <StyledFilesView visible={!page.loading} onMouseDown={onMouseDown}>
      {page.files.map((file, index) => (
        <File data={file} key={index} />
      ))}
      <SelectionRegion
        ref={store.selection.ref}
        visible={store.selection.visible}
      />
    </StyledFilesView>
  );
});
