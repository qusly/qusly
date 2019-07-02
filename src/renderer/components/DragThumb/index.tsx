import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { StyledThumb, Icon, Title, Counter } from './styles';

export default observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  const file = page.focusedFile;
  const { icon, opacity } = store.favicons.get(file);
  const selectedFiles = store.dragging.visible ? page.selectedFiles : [];

  return (
    <StyledThumb ref={store.dragging.ref} visible={store.dragging.visible}>
      <Icon icon={icon} opacity={opacity} />
      <Title>{file && file.name}</Title>
      {selectedFiles.length > 1 && <Counter>{selectedFiles.length}</Counter>}
    </StyledThumb>
  );
});
