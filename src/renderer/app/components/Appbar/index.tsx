import React from 'react';

import { Tabbar } from '../Tabbar';
import { Toolbar } from '../Toolbar';
import { StyledAppbar } from './style';

export const Appbar = () => {
  return (
    <StyledAppbar>
      <Tabbar />
      <Toolbar />
    </StyledAppbar>
  );
};
