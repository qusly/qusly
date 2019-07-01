import { observer } from 'mobx-react';
import * as React from 'react';

import store from '~/renderer/store';
import ToolbarButton from '../ToolbarButton';
import { icons } from '~/renderer/constants';
import { StyledContainer } from './style';

const onBack = () => {
  store.pages.current.location.back();
  store.pages.current.fetchFiles();
};

const onForward = () => {
  store.pages.current.location.forward();
  store.pages.current.fetchFiles();
};

const onRefresh = () => {
  store.pages.current.fetchFiles();
};

export default observer(() => {
  const page = store.pages.current;
  const location = page.location;

  return (
    <StyledContainer>
      <ToolbarButton
        size={20}
        icon={icons.back}
        disabled={!location.canGoBack}
        onClick={onBack}
      />
      <ToolbarButton
        size={20}
        icon={icons.forward}
        disabled={!location.canGoForward}
        onClick={onForward}
      />
      <ToolbarButton
        size={20}
        icon={icons.refresh}
        onClick={onRefresh}
        disabled={page.loading || !page.session.connected}
      />
    </StyledContainer>
  );
});
