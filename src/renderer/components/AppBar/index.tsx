import * as React from 'react';

import Tabbar from '../Tabbar';
import Toolbar from '../Toolbar';
import store from '~/renderer/store';
import { StyledAppbar } from './styles';

export default () => {
  return (
    <StyledAppbar>
      <Tabbar />
      {store.sessions.current && <Toolbar />}
    </StyledAppbar>
  );
};
