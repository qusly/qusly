import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { StyledThumb, Icon, Title, Count } from './style';

export const DragThumb = observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  const file = page.focusedFile;
  const { icon, opacity } = store.icons.getIcon(file);
  const selected = page.selectedFiles;

  return (
    <StyledThumb ref={store.drag.ref} visible={store.drag.visible}>
      <Icon icon={icon} opacity={opacity} />
      <Title>{file && file.name}</Title>
      {selected.length > 1 && <Count>{selected.length}</Count>}
    </StyledThumb>
  );
});
