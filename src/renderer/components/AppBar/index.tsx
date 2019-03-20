import * as React from 'react';
import { observer } from 'mobx-react';

import { PathView } from '../PathView';
import { Tabbar } from '../Tabbar';
import store from '~/renderer/store';
import { StyledAppBar } from './styles';

export const AppBar = observer(() => {
  const { width } = store.navDrawerStore;

  const style = {
    width: `calc(100vw - ${width}px)`,
    marginLeft: width,
  };

  return (
    <StyledAppBar style={style}>
      <PathView />
      <Tabbar />
    </StyledAppBar>
  );
});
