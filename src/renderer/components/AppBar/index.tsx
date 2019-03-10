import { observer } from 'mobx-react';
import * as React from 'react';

import { Tabbar } from '../Tabbar';
import ToolbarButton from '../ToolbarButton';
import { icons } from '~/renderer/constants';
import { StyledAppBar, StyledToolbar, StyledPathView } from './styles';

export const PathView = () => {
  return <StyledPathView />;
};

export const Toolbar = observer(() => {
  return (
    <StyledToolbar>
      <Tabbar />
      <ToolbarButton icon={icons.starOutline} />
      <ToolbarButton icon={icons.viewList} />
      <ToolbarButton icon={icons.info} />
    </StyledToolbar>
  );
});

export default () => {
  return (
    <StyledAppBar>
      <PathView />
      <Toolbar />
    </StyledAppBar>
  );
};
