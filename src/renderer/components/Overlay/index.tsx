import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import SiteDialog from '../SiteDialog';
import { StyledOverlay, Dark } from './styles';

const onClick = () => store.overlay.hide();

export default observer(() => {
  return (
    <StyledOverlay visible={store.overlay.visible}>
      <Dark onClick={onClick} />
      <SiteDialog />
    </StyledOverlay>
  );
});
