import { observer } from 'mobx-react';
import * as React from 'react';

import store from '~/renderer/store';
import ToolbarButton from '../ToolbarButton';
import { icons } from '~/renderer/constants';
import { StyledContainer } from './style';

const onRefresh = () => {
  store.pages.current.fetchFiles();
};

export default observer(() => {
  return (
    <StyledContainer>
      <ToolbarButton size={20} icon={icons.back} disabled={true} />
      <ToolbarButton size={20} icon={icons.forward} disabled={true} />
      <ToolbarButton
        size={20}
        icon={icons.refresh}
        onClick={onRefresh}
        disabled={!store.sessions.current.connected}
      />
    </StyledContainer>
  );
});
