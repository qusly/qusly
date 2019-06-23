import * as React from 'react';
import { observer } from 'mobx-react';

import Tabbar from '../Tabbar';
import Toolbar from '../Toolbar';
import store from '~/renderer/store';
import { StyledAppbar } from './styles';

export default observer(() => {
  return (
    <StyledAppbar>
      <Tabbar />
      {store.sessions.current && <Toolbar />}
    </StyledAppbar>
  );
});
