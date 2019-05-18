import * as React from 'react';

import Tabbar from '../Tabbar';
import Toolbar from '../Toolbar';
import { StyledAppbar } from './styles';

export default () => {
  return (
    <StyledAppbar>
      <Tabbar />
      <Toolbar />
    </StyledAppbar>
  );
};
