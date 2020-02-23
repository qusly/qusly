import React from 'react';

import { Tabbar } from '../Tabbar';
import { Navigation } from '../Navigation';
import { PathView } from '../PathView';
import { StyledAppbar, StyledToolbar } from './style';

const Toolbar = () => {
  return (
    <StyledToolbar>
      <Navigation />
      <PathView />
    </StyledToolbar>
  );
};

export const Appbar = () => {
  return (
    <StyledAppbar>
      <Tabbar />
      <Toolbar />
    </StyledAppbar>
  );
};
