import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import SiteManager from '../SiteManager';
import { StyledOverlay, Content, DarkBackground } from './styles';

const onClick = () => {
  store.overlay.visible = false;
};

export default observer(() => {
  const { visible, currentContent } = store.overlay;

  return (
    <StyledOverlay visible={visible}>
      <Content>{currentContent === 'site-manager' && <SiteManager />}</Content>
      <DarkBackground onClick={onClick} />
    </StyledOverlay>
  );
});
