import * as React from 'react';

import { PathView } from '../PathView';
import { Tabbar } from '../Tabbar';
import { StyledAppBar } from './styles';

export const AppBar = () => (
  <StyledAppBar>
    <PathView />
    <Tabbar />
  </StyledAppBar>
);
